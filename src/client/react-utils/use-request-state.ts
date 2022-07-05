import {useState, useCallback} from 'react';

import {PageState} from '../../types/page-state';
import {Awaited, AnyPromiseFn} from '../../types/common';

export const useRequestState = <Fn extends AnyPromiseFn>(request: Fn) => {
    const [pageState, setPageState] = useState(PageState.INITIAL);
    const [error, setError] = useState<any>(undefined);

    type ReqParams = Parameters<typeof request>;
    type ReqResult = Awaited<ReturnType<typeof request>>;
    const newRequest = useCallback(
        (...args: ReqParams): Promise<ReqResult> => {
            setPageState(PageState.LOADING);
            setError(undefined);

            return request(...args)
                .then((data: ReqResult) => {
                    setPageState(PageState.READY);
                    return data;
                })
                .catch((error) => {
                    setError(error);
                    setPageState(PageState.ERROR);
                    throw error;
                });
        },
        [request]
    )

    return [newRequest, error, pageState] as const;
}
