import { createSelector } from "reselect";
import { RootState } from "../store";
import { IUsersState, IRepositoriesState } from "./reducer";

const usersState = (state: RootState): IUsersState => state.users;

export const getAllUsers = createSelector(usersState, (state) => state.users);
export const getUsersError = createSelector(usersState, (state) => state.error);
export const getUsersLoadingStatus = createSelector(usersState, (state) => state.isLoading);

const repositoriesState = (state: RootState): IRepositoriesState => state.repositories;

export const getAllRepositories = createSelector(repositoriesState, (state) => state.repositories);
export const getRepositoriesError = createSelector(repositoriesState, (state) => state.error);
export const getRepositoriesLoadingStatus = createSelector(repositoriesState, (state) => state.isLoading);
