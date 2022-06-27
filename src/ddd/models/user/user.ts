import {observable, computed} from 'mobx';

import {UserDTO} from './user-types';

export class User {
    @observable uid: number;

    @observable login: string;

    @observable firstName: string;

    @observable lastName: string;

    constructor(user: UserDTO) {
        this.uid = user.uid;
        this.login = user.login;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    @computed get name() {
        return `${this.firstName} ${this.lastName}`;
    }
}

export const buildUser = (user: UserDTO) => new User(user);
