/* eslint-disable import/prefer-default-export */
import { httpGet, httpPut } from '../../Lib/RestTemplate';

export const saveParticipant = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/participant/${space}`, payload, {
    headers: {
      Authorization: authorization.access_token,
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
