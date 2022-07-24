import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { request, headers } from "../../helpers/request";
import { IRepo, IUser, IUserDetailed, IReposApiResponse, IUsersApiResponse } from "../../helpers/interfaces";

export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";
export const FETCH_USERS = "FETCH_USERS";

export const STORE_SEARCH_VALUE = "STORE_SEARCH_VALUE";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS_REPOS = "FETCH_USERS_REPOS";

export const fetchUsers = createAsyncThunk<IUsersApiResponse, string>(
  FETCH_USERS,
  async (searchValue, { rejectWithValue }) => {
    try {
      let res: AxiosResponse<any, any>;
      let users: IUser[];
      let totalCount: number;

      if (searchValue) {
        res = await request.get(`/search/users?q=${searchValue}`);

        users = res.data.items;
        totalCount = res.data.total_count;
      } else {
        res = await request.get("/users");

        users = res.data;
        totalCount = res.data.length;
      }

      const usersURLs = users.map((item: IUser) => item.url);

      const userPromiseArray = usersURLs.map((url: string) => axios.get(url, { headers }));

      const usersDetails: IUser[] = (await Promise.all(userPromiseArray)).map((res) => res.data);
      return { usersDetails, totalCount };
    } catch (err) {
      const errorResponse = (err as { response: { [key: string]: string } }).response;
      return rejectWithValue(errorResponse);
    }
  }
);

export const fetchRepositories = createAsyncThunk<IReposApiResponse, string>(
  FETCH_REPOSITORIES,
  async (searchValue, { rejectWithValue }) => {
    try {
      let res: AxiosResponse<any, any>;
      let repositories: IRepo[];
      let totalCount: number;

      if (searchValue) {
        res = await request.get(`/search/repositories?q=${searchValue}`);

        repositories = res.data.items;
        totalCount = res.data.total_count;
      } else {
        res = await request.get("/repositories");

        repositories = res.data;
        totalCount = res.data.length;
      }

      const repositoriesURLs = repositories.map((item: IRepo) => item.url);

      const repositoryPromiseArray = repositoriesURLs.map((url: string) => axios.get(url, { headers }));

      const repositoriesDetails = (await Promise.all(repositoryPromiseArray)).map((res) => res.data);
      // console.log("repositoriesDetails", repositoriesDetails);
      return { repositoriesDetails, totalCount };
    } catch (err) {
      const errorResponse = (err as { response: { [key: string]: string } }).response;
      return rejectWithValue(errorResponse);
    }
  }
);

export const storeSearchValue = createAction<string>(STORE_SEARCH_VALUE);

export const fetchUser = createAsyncThunk<IUserDetailed, string>(FETCH_USER, async (login, { rejectWithValue }) => {
  try {
    const res = await request.get(`/users/${login}`);
    const user: IUserDetailed = res.data;
    return user;
  } catch (err) {
    const errorResponse = (err as { response: { [key: string]: string } }).response;
    return rejectWithValue(errorResponse);
  }
});

export const fetchUserRepos = createAsyncThunk<IRepo[], string>(
  FETCH_USERS_REPOS,
  async (login, { rejectWithValue }) => {
    try {
      const res = await request.get(`/users/${login}/repos?per_page=100`);
      const userRepos = res.data;
      return userRepos;
    } catch (err) {
      const errorResponse = (err as { response: { [key: string]: string } }).response;
      return rejectWithValue(errorResponse);
    }
  }
);
