import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { IRepo, IUser, IUserDetailed, IReposApiResponse, IUsersApiResponse } from "../../helpers/interfaces";

export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";
export const FETCH_USERS = "FETCH_USERS";

export const STORE_SEARCH_VALUE = "STORE_SEARCH_VALUE";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS_REPOS = "FETCH_USERS_REPOS";

const token = process.env.REACT_APP_API_TOKEN;

const headers: AxiosRequestHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `token ${token}`,
};

export const fetchUsers = createAsyncThunk<IUsersApiResponse, string>(
  FETCH_USERS,
  async (searchValue, { rejectWithValue }) => {
    try {
      let res: AxiosResponse<any, any>;
      let users: IUser[];
      let totalCount: number;

      if (searchValue) {
        res = await axios.get(`https://api.github.com/search/users?q=${searchValue}`, {
          headers,
        });

        users = res.data.items;
        totalCount = res.data.total_count;
      } else {
        res = await axios.get("https://api.github.com/users", { headers });

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
        res = await axios.get(`https://api.github.com/search/repositories?q=${searchValue}`, {
          headers,
        });

        repositories = res.data.items;
        totalCount = res.data.total_count;
      } else {
        res = await axios.get("https://api.github.com/repositories", { headers });

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
    const res = await axios.get(`https://api.github.com/users/${login}`, { headers });
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
      const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=100`, { headers });
      const userRepos = res.data;
      return userRepos;
    } catch (err) {
      const errorResponse = (err as { response: { [key: string]: string } }).response;
      return rejectWithValue(errorResponse);
    }
  }
);
