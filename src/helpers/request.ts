import axios from "axios";

const token = process.env.REACT_APP_API_TOKEN;

export const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `token ${token}`,
};

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers,
});
