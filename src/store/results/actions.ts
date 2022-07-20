import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders } from "axios";
import { IRepo, IRepositoriesFromAPI, IUser, IUsersFromAPI } from "../../helpers/interfaces";

export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";
export const FETCH_USERS = "FETCH_USERS";

export const FETCH_FILTERED_REPOSITORIES = "FETCH_FILTERED_REPOSITORIES";
export const FETCH_FILTERED_USERS = "FETCH_FILTERED_USERS";

export const STORE_SEARCH_VALUE = "STORE_SEARCH_VALUE";

const token = process.env.REACT_APP_API_TOKEN;

const headers: AxiosRequestHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `token ${token}`,
};

export const fetchUsers = createAsyncThunk<IUser[], string>(FETCH_USERS, async (searchValue, { rejectWithValue }) => {
  try {
    let res;
    let users: IUsersFromAPI[];

    if (searchValue) {
      res = await axios.get(`https://api.github.com/search/users?q=${searchValue}`, {
        headers,
      });

      users = res.data.items;
      //todo: get total_count and use it
    } else {
      res = await axios.get("https://api.github.com/users", { headers });
      users = res.data;
    }

    console.log(users);

    const usersURLs = users.map((item: IUsersFromAPI) => item.url);

    const userPromiseArray = usersURLs.map((url: string) => axios.get(url, { headers }));

    const usersDetails = await (await Promise.all(userPromiseArray)).map((res) => res.data);
    console.log("usersDetails", usersDetails);
    return usersDetails;
  } catch (err) {
    console.log(err);
    // console.log(err.response.data.message);
    return rejectWithValue(err);
  }
});

export const fetchRepositories = createAsyncThunk<IRepo[], string>(
  FETCH_REPOSITORIES,
  async (searchValue, { rejectWithValue }) => {
    try {
      let res;
      let repositories: IRepositoriesFromAPI[];

      if (searchValue) {
        res = await axios.get(`https://api.github.com/search/repositories?q=${searchValue}`, {
          headers,
        });

        repositories = res.data.items;
        //todo: get total_count and use it
      } else {
        res = await axios.get("https://api.github.com/repositories", { headers });
        repositories = res.data;
      }

      const repositoriesURLs = repositories.map((item: IRepositoriesFromAPI) => item.url);

      const repositoryPromiseArray = repositoriesURLs.map((url: string) => axios.get(url, { headers }));

      const repositoriesDetails = await (await Promise.all(repositoryPromiseArray)).map((res) => res.data);
      console.log("repositoriesDetails", repositoriesDetails);
      return repositoriesDetails;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const storeSearchValue = createAction<string>(STORE_SEARCH_VALUE);

export const fetchFilteredUsers = createAsyncThunk<IUser[], string>(
  FETCH_FILTERED_USERS,
  async (searchValue, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${searchValue}`, {
        headers,
      });
      console.log(res);
      console.log(res.data.items);
      return res.data.items;
    } catch (err) {
      console.log(err);
      rejectWithValue(err);
    }
  }
);

export const fetchFilteredRepositories = createAsyncThunk<IRepo[], string>(
  FETCH_FILTERED_REPOSITORIES,
  async (searchValue, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://api.github.com/search/repositories?q=${searchValue}`, {
        headers,
      });
      console.log(res);
      console.log(res.data.items);
      return res.data.items;
    } catch (err) {
      console.log(err);
      rejectWithValue(err);
    }
  }
);
