import {withProps, ReactComponentProps} from './with-props-hoc';

export const withScene = <T extends ReactComponentProps>(scene: T) => withProps({scene});
