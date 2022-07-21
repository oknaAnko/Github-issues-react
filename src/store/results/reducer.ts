import { AnyAction } from "@reduxjs/toolkit";
import { IUser, IRepo } from "../../helpers/interfaces";

export interface IUsersState {
  users: IUser[];
  isLoading: boolean;
  error: null;
}

export interface IRepositoriesState {
  repositories: IRepo[];
  isLoading: boolean;
  error: null;
}

export const initialUserstState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const initialRepositoriestState: IRepositoriesState = {
  repositories: [],
  isLoading: false,
  error: null,
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
      console.log(action.payload);
      return {
        ...state,
        users: action.payload || [],
      };
    case "FETCH_USERS/rejected":
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_FILTERED_USERS/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_FILTERED_USERS/fulfilled":
      return {
        ...state,
        users: action.payload || [],
      };
    case "FETCH_FILTERED_USERS/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_USER/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USER/fulfilled":
      console.log(action.payload);
      return {
        ...state,
        users: [action.payload],
      };
    case "FETCH_USER/rejected":
      return {
        ...state,
        error: action.payload,
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
      console.log(action.payload);
      return {
        ...state,
        repositories: action.payload || [],
      };
    case "FETCH_REPOSITORIES/rejected":
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };

    case "FETCH_FILTERED_REPOSITORIES/pending":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_FILTERED_REPOSITORIES/fulfilled":
      return {
        ...state,
        repositories: action.payload || [],
      };
    case "FETCH_FILTERED_REPOSITORIES/rejected":
      return {
        ...state,
        error: action.payload,
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
