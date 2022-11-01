import { store } from "store";
import { authSlice, UserType } from "store/reducers/auth";

// Actions
export const setAuthLoginUser = ({
  user,
  jwt,
}: {
  user: UserType;
  jwt: string;
}) => {
  store.dispatch(authSlice.actions.login({ user, jwt }));
};

export const setAuthRefreshUser = ({ user }: { user: UserType }) => {
  store.dispatch(authSlice.actions.refreshUser({ user }));
};

export const setAuthLogOutUser = () =>
  store.dispatch(authSlice.actions.logOut());
