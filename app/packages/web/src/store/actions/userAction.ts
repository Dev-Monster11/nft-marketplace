import axios from 'axios';
export const GET_USER = 'GET_USER';
import { API } from '../api';
export const GetUser = () => async (dispatch: any) => {
  await axios
    .get(`${API}/api/users`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      }),
    )
    .catch(err => {
      console.log(err);
    });
};
