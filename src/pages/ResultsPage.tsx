import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { arrowLeftIcon, arrowRightIcon } from "../helpers/icons";
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
  // console.log("users", users);
  const usersError = useSelector(getUsersError);
  const usersLoading = useSelector(getUsersLoadingStatus);
  // console.log(usersLoading);
  const usersTotalCount = useSelector(getUsersTotalCount);

  const repositories = useSelector(getAllRepositories);
  const repositoriesError = useSelector(getRepositoriesError);
  const repositoriesLoading = useSelector(getRepositoriesLoadingStatus);
  // console.log(repositoriesLoading);
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

  const resultsTotalCount = repositoriesTotalCount + usersTotalCount;

  return (
    <>
      {/* {(usersLoading || repositoriesLoading) && <p className="loading-status">Trwa ładowanie danych...</p>} */}

      {!usersLoading && !repositoriesLoading && users.length && repositories.length ? (
        usersError || repositoriesError ? (
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
            <div className="pagination">
              <Link to="#">
                <span>{arrowLeftIcon}</span> Previous
              </Link>
              <div className="page-number"></div>
              <Link to="#">Next {arrowRightIcon}</Link>
            </div>
          </div>
        )
      ) : (
        <p className="loading-status">Trwa ładowanie danych...</p>
      )}
    </>
  );
};

export default ResultsPage;
