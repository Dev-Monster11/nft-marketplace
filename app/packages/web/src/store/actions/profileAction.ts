import axios from 'axios';
export const Add_Profile = 'Add_Profile';
import { API } from '../api';
export const AddProfile = (profile: any) => async (dispatch: any) => {
  console.log(profile);
  await axios
    .post(`${API}/api/profile`, profile)
    .then(res =>
      dispatch({
        type: Add_Profile,
        payload: res.data,
      }),
    )
    .catch(err => {
      console.log(err);
    });
};
