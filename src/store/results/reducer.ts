import { AnyAction } from "@reduxjs/toolkit";
import { IUser, IRepo, IUserDetailed } from "../../helpers/interfaces";

export interface IUsersState {
  users: IUser[] | IUserDetailed[];
  isLoading: boolean;
  error: null | string;
  totalCount: number;
}

export interface IRepositoriesState {
  repositories: IRepo[];
  isLoading: boolean;
  error: null | string;
  totalCount: number;
}

export const initialUserstState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
  totalCount: 0,
};

export const initialRepositoriestState: IRepositoriesState = {
  repositories: [],
  isLoading: false,
  error: null,
  totalCount: 0,
};

export interface ISearchValueState {
  value: string;
}

export const initialSearchValueState: ISearchValueState = {
  value: "",
};

export const usersReducer = (state: IUsersState = initialUserstState, action: AnyAction) => {
  switch (action.type) {
    case "FETCH_USERS/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USERS/fulfilled":
      return {
        ...state,
        users: action.payload.usersDetails || [],
        totalCount: action.payload.totalCount,
        isLoading: false,
      };
    case "FETCH_USERS/rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload.data.message,
      };

    case "FETCH_USER/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USER/fulfilled":
      return {
        ...state,
        users: [action.payload],
        isLoading: false,
      };
    case "FETCH_USER/rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload.data.message,
      };

    default:
      return state;
  }
};

export const repositoriesReducer = (state: IRepositoriesState = initialRepositoriestState, action: AnyAction) => {
  switch (action.type) {
    case "FETCH_REPOSITORIES/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_REPOSITORIES/fulfilled":
      return {
        ...state,
        repositories: action.payload.repositoriesDetails || [],
        totalCount: action.payload.totalCount,
        isLoading: false,
      };
    case "FETCH_REPOSITORIES/rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload.data.message,
      };

    case "FETCH_USERS_REPOS/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USERS_REPOS/fulfilled":
      return {
        ...state,
        repositories: action.payload,
        isLoading: false,
      };
    case "FETCH_USERS_REPOS/rejected":
      return {
        ...state,
        error: action.payload.data.message,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const searchValueReducer = (state: ISearchValueState = initialSearchValueState, action: AnyAction) => {
  switch (action.type) {
    case "STORE_SEARCH_VALUE":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
