import {createModelRepo} from '../../utils/model-repo';

import {buildUser} from './user';
import {fetchMe} from './user-provider';

export * from './user-types';
export * from './user';
export * from './user-provider';

export const userRepo = createModelRepo(
    fetchMe,
    (x) => buildUser(x.me)
);

export type UserRepo = typeof userRepo;
