import { AnyAction } from "@reduxjs/toolkit";
import { IUsersFromAPI } from "../../helpers/interfaces";
import { FETCH_USERS } from "./actions";

export interface IUsersState {
  users: IUsersFromAPI[];
  isLoading: boolean;
  error: null;
}

export const initialtState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersReducer = (state: IUsersState = initialtState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_USERS:
      // console.log(action.payload);
      return {
        ...state,
        users: action.payload || [],
      };
    default:
      return state;
  }
};
