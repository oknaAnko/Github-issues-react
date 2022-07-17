import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders } from "axios";
import { IUsersFromAPI } from "../../helpers/interfaces";

export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";
export const FETCH_USERS = "FETCH_USERS";

const token = process.env.REACT_APP_API_TOKEN;

const headers: AxiosRequestHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `token ${token}`,
};

export const fetchUsers = createAsyncThunk(FETCH_USERS, async (_, { rejectWithValue }) => {
  try {
    const users = await axios.get("https://api.github.com/users", { headers });
    console.log("users", users);
    console.log("users.data", users.data);

    const usersURLs = users.data.map((item: IUsersFromAPI) => item.url);
    console.log(usersURLs);

    const userPromiseArray = usersURLs.map((url: string) => axios.get(url, { headers }));

    const usersDetails = await Promise.all(userPromiseArray);
    console.log("usersDetails", usersDetails);
  } catch (err) {
    console.log(err);
    // console.log(err.response.data.message);
    return rejectWithValue(err);
  }
});

export const fetchRepositories = createAsyncThunk(FETCH_REPOSITORIES, async (_, { rejectWithValue }) => {
  try {
    const repositories = await axios.get("https://api.github.com/repositories", { headers });
    console.log("repositories", repositories);
    console.log("repositories.data", repositories.data);

    const repositoriesURLs = repositories.data.map((item: IUsersFromAPI) => item.url);
    console.log(repositoriesURLs);

    const repositoryPromiseArray = repositoriesURLs.map((url: string) => axios.get(url, { headers }));

    const repositoriesDetails = await Promise.all(repositoryPromiseArray);
    console.log("repositoriesDetails", repositoriesDetails);
  } catch (err) {
    console.log(err);
    return rejectWithValue(err);
  }
});
