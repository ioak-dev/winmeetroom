/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';

export const signinUser = (payload: any) => {
    return httpPost(`/roommate/auth/signin`, payload, {
        headers: {
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        })
        .catch((error) => {
            return Promise.resolve({});
        });
};

export const sendPassword = (email: string) => {
    return httpPost(`/roommate/auth/send-password`, [email], {
        headers: {
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        })
        .catch((error) => {
            return Promise.resolve({});
        });
};
