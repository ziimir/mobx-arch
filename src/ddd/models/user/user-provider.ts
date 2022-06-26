import {UserDTO} from './user-types';

interface GetMeResponse {
    me: UserDTO;
}

export const fetchMe = () => new Promise<GetMeResponse>((resolve) => {
    setTimeout(
        () => resolve({
            me: {
                uid: 1000,
                login: 'ziimir',
                firstName: 'Vasiliy',
                lastName: 'Pupkin'
            }
        }),
        1500
    );
});
