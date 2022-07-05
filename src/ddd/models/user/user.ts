import {observable, computed, makeObservable} from 'mobx';

import {UserDTO} from './user-types';

export class User {
    uid: number;

    login: string;

    firstName: string;

    lastName: string;

    constructor(user: UserDTO) {
        this.uid = user.uid;
        this.login = user.login;
        this.firstName = user.firstName;
        this.lastName = user.lastName;

        makeObservable(this, {
            uid: observable,
            login: observable,
            firstName: observable,
            lastName: observable,
            name: computed
        })
    }

    get name() {
        return `${this.firstName} ${this.lastName}`;
    }
}

export const buildUser = (user: UserDTO) => new User(user);
