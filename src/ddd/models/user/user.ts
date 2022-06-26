import {observable} from 'mobx';

import {UserDTO} from './user-types';

export class User {
    @observable uid: number;

    @observable login: string;

    @observable name: string;

    constructor(user: UserDTO) {
        this.uid = user.uid;
        this.login = user.login;
        this.name = `${user.firstName} ${user.lastName}`;
    }
}

export const buildUser = (user: UserDTO) => new User(user);
