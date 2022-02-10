import { GET_USER } from '../actions/userAction';
export default (state = [], action: any) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case GET_USER:
      return (state = action.payload);
    default:
      return state;
  }
};
