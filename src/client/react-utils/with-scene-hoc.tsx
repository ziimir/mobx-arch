import React from 'react';

import {LoadGuard, LoadGuardErrorRenderer, LoadGuardLoaderRenderer} from '../components/load-guard';

type OwnComponentProps<T> = Omit<T, 'scene'>;

export type OnSceneMount = (ownProps: any) => Promise<any>;

export type SceneViewProps<T extends React.ElementType> = OwnComponentProps<React.ComponentPropsWithRef<T>>;

interface LoadGuardProps {
    onMount: OnSceneMount;
    renderLoader?: LoadGuardLoaderRenderer;
    renderError?: LoadGuardErrorRenderer;
}

export function withScene<T>(
    {onMount, renderLoader, renderError}: LoadGuardProps,
    scene: T
) {
    return <P extends Record<string, any>>(Wrapped: React.ComponentType<P>) => {
        class WithSceneComponent extends React.PureComponent<OwnComponentProps<P>> {
            static displayName = `${Wrapped.displayName}_WITH_SCENE_${scene.constructor.name}`;

            // в теории onMount штука расширяемая
            // можно добавить все что угодно что нужно для загрузки
            // например history или pathParams или query
            handleLoadGuardMount = () => onMount(this.props);

            render() {
                const {forwardedRef, ...ownProps} = this.props;
                const newProps = {...ownProps, scene} as unknown as P;

                return (
                    <LoadGuard
                        onMount={this.handleLoadGuardMount}
                        renderError={renderError}
                        renderLoader={renderLoader}
                    >
                        <Wrapped {...newProps} ref={forwardedRef} />
                    </LoadGuard>
                );
            }
        }

        return React.forwardRef<any, OwnComponentProps<P>>(
            (props, ref) => <WithSceneComponent {...props} forwardedRef={ref} />
        );
    };
}
