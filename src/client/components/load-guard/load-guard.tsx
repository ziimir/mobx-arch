import React, {
    FC,
    memo,
    useEffect,
    useState,
    ReactElement
} from 'react';
import {createCn} from 'bem-react-classname';

import {PageState} from '../../../types/page-state';

export type LoadGuardLoaderRenderer = () => ReactElement;

export type LoadGuardErrorRenderer = <T = any>(error: T) => ReactElement;

interface Props {
    renderLoader?: LoadGuardLoaderRenderer;
    renderError?: LoadGuardErrorRenderer;
    onMount: () => Promise<any>;
}

export const LoadGuard: FC<Props> = memo((props) => {
    const cn = createCn('load-guard');

    const {
        onMount,
        renderError,
        renderLoader,
        children
    } = props;

    const [status, setStatus] = useState(PageState.INITIAL);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setError(null);
        setStatus(PageState.LOADING);

        onMount()
            .then(() => {
                setStatus(PageState.READY);
            })
            .catch((error) => {
                setError(error);
                setStatus(PageState.ERROR);
            });
    }, [onMount]);

    if (status === PageState.READY) {
        return <div className={cn()}>{children}</div>;
    }

    if (status === PageState.ERROR) {
        return renderError?.(error) || <div>something went wrong</div>;
    }

    return renderLoader?.() || <div>loading...</div>;
});

LoadGuard.displayName = 'LoadGuard';
