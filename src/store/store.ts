import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { usersReducer, repositoriesReducer, searchValueReducer } from "./results/reducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    repositories: repositoriesReducer,
    searchValue: searchValueReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
