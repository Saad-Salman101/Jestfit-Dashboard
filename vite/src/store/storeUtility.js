import { logoutUser } from './reducers/userReducer';
import store from './store';

export const getUserState = () => {
  const state = store.getState();
  return state.user; // Access the auth slice and retrieve user
};

export const removeUserDetails = () => {
  store.dispatch(logoutUser());
}


