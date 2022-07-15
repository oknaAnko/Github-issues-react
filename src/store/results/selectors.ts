import { createSelector } from "reselect";
import { RootState } from "../store";
import { IUsersState } from "./reducer";

const usersState = (state: RootState): IUsersState => state.users;

export const getAllUsers = createSelector(usersState, (state) => state.users);
export const getUsersError = createSelector(usersState, (state) => state.error);
export const getUsersLoadingStatus = createSelector(usersState, (state) => state.isLoading);
