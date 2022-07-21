import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders } from "axios";
import {
  IRepo,
  IRepositoriesFromAPI,
  IUser,
  IUsersFromAPI,
  IUserDetailed,
  IReposApiResponse,
  IUsersApiResponse,
} from "../../helpers/interfaces";

export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";
export const FETCH_USERS = "FETCH_USERS";

export const FETCH_FILTERED_REPOSITORIES = "FETCH_FILTERED_REPOSITORIES";
export const FETCH_FILTERED_USERS = "FETCH_FILTERED_USERS";

export const STORE_SEARCH_VALUE = "STORE_SEARCH_VALUE";

export const FETCH_USER = "FETCH_USER";

const token = process.env.REACT_APP_API_TOKEN;

const headers: AxiosRequestHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `token ${token}`,
};

export const fetchUsers = createAsyncThunk<IUsersApiResponse, string>(
  FETCH_USERS,
  async (searchValue, { rejectWithValue }) => {
  try {
    let res;
      let users;
      let totalCount;

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

      // console.log(users);
    const usersURLs = users.map((item: IUsersFromAPI) => item.url);

    const userPromiseArray = usersURLs.map((url: string) => axios.get(url, { headers }));

    const usersDetails = await (await Promise.all(userPromiseArray)).map((res) => res.data);
      // console.log("usersDetails", usersDetails);
      return { usersDetails, totalCount };
  } catch (err) {
    console.log(err);
    // console.log(err.response.data.message);
    return rejectWithValue(err);
  }
  }
);

export const fetchRepositories = createAsyncThunk<IReposApiResponse, string>(
  FETCH_REPOSITORIES,
  async (searchValue, { rejectWithValue }) => {
    try {
      let res;
      let repositories;
      let totalCount;

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

      const repositoriesURLs = repositories.map((item: IRepositoriesFromAPI) => item.url);

      const repositoryPromiseArray = repositoriesURLs.map((url: string) => axios.get(url, { headers }));

      const repositoriesDetails = await (await Promise.all(repositoryPromiseArray)).map((res) => res.data);
      // console.log("repositoriesDetails", repositoriesDetails);
      return { repositoriesDetails, totalCount };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const storeSearchValue = createAction<string>(STORE_SEARCH_VALUE);

export const fetchUser = createAsyncThunk<IUserDetailed, string>(FETCH_USER, async (login, { rejectWithValue }) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${login}`);
    const user = res.data;
    return user;
  } catch (err) {
    console.log(err);
    rejectWithValue(err);
  }
});
