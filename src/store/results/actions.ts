import axios from "axios";
import { IUsersFromAPI } from "../../helpers/interfaces";

export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";
export const FETCH_USERS = "FETCH_USERS";

export const fetchResults = async () => {
  try {
    const repositories = await axios.get("https://api.github.com/repositories");
    console.log("repositories", repositories);
    console.log("repositories.data", repositories.data);

    const users = await axios.get("https://api.github.com/users");
    console.log("users", users);
    console.log("users.data", users.data);

    const usersURLs = users.data.map((item: IUsersFromAPI) => item.url);
    console.log(usersURLs);

    const userPromiseArray = usersURLs.map((url: string) => axios.get(url));

    const usersDetails = Promise.all(userPromiseArray);
    console.log("usersDetails", usersDetails);
  } catch (error) {
    console.log(error);
  }
};
