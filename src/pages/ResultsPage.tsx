import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../store/hooks";
import { fetchUsers, fetchRepositories } from "../store/results/actions";
import {
  getAllUsers,
  getUsersError,
  getUsersLoadingStatus,
  getUsersTotalCount,
  getAllRepositories,
  getRepositoriesError,
  getRepositoriesLoadingStatus,
  getRepositoriesTotalCount,
  getSearchValue,
} from "../store/results/selectors";
import { IUser, IRepo, UserOrRepo } from "../helpers/interfaces";
import User from "../components/User";
import Repo from "../components/Repo";

const ResultsPage = () => {
  const dispatch = useAppDispatch();

  const users = useSelector(getAllUsers);
  const usersError = useSelector(getUsersError);
  const loadingUsers = useSelector(getUsersLoadingStatus);
  const usersTotalCount = useSelector(getUsersTotalCount);

  const repositories = useSelector(getAllRepositories);
  const repositoriesError = useSelector(getRepositoriesError);
  const loadingRepositories = useSelector(getRepositoriesLoadingStatus);
  const repositoriesTotalCount = useSelector(getRepositoriesTotalCount);
  const searchValue = useSelector(getSearchValue);

  useEffect(() => {
    dispatch(fetchUsers(searchValue));
    dispatch(fetchRepositories(searchValue));
  }, [searchValue]);

  const itemsToDisplay: UserOrRepo[] = [...users, ...repositories].sort((a, b) => a.id - b.id).slice(0, 9);

  const componentsToDisplay = itemsToDisplay.map(
    //Object.hasOwn(item, "repos_url") - hasOwn not supported for most browsers yet
    (item: UserOrRepo, index: number) =>
      item.hasOwnProperty("repos_url") ? (
        <User key={index} user={item as IUser} />
      ) : (
        <Repo key={index} repo={item as IRepo} />
      )
  );
  console.log(componentsToDisplay);

  const resultsTotalCount = repositoriesTotalCount + usersTotalCount;

  return (
    <>
      <div className="wrapper-page">
        {(loadingUsers || loadingRepositories) && <p className="loading-status">Trwa ładowanie danych...</p>}
        {usersError || repositoriesError ? (
          <p className="error-message">
            Wystąpił błąd:{" "}
            {usersError === repositoriesError
              ? usersError
              : Boolean(usersError)
              ? usersError
              : Boolean(repositoriesError) && repositoriesError}
          </p>
        ) : (
          <div className="results-container">
            <header>
              <h1> {resultsTotalCount.toLocaleString("en-US")} results</h1>
            </header>
            <section className="results">{componentsToDisplay}</section>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultsPage;
