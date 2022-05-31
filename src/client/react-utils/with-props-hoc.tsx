import React, {forwardRef, ComponentType, FC, ForwardRefRenderFunction} from 'react';

export type ReactComponentProps = Record<string, any>;

export function withProps<T extends ReactComponentProps>(hocProps: T) {
    return function<P extends ReactComponentProps>(Wrapped: ComponentType<P>) {
        type OwnComponentProps = Omit<P, keyof T>;

        const WithPropsComponent = forwardRef(
            (props: OwnComponentProps, ref) => {
                const newProps = {...hocProps, ...props} as unknown as P;
                return (<Wrapped {...newProps} ref={ref} />);
            }
        );

        WithPropsComponent.displayName = `${Wrapped.displayName}_with_${Object.keys(hocProps).join(',')}`

        return WithPropsComponent;
    };
}
