import {UserDTO} from './user-types';

interface GetMeResponse {
    me: UserDTO;
}

export const fetchMe = () => new Promise<GetMeResponse>((resolve) => {
    setTimeout(
        () => resolve({
            me: ziimir
        }),
        1500
    );
});

const ziimir = {
    uid: 1000,
    login: 'ziimir',
    firstName: 'Daniil',
    lastName: 'Volkov'
}
