import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../store/hooks";
import { fetchUsers, fetchRepositories } from "../store/results/actions";
import { getAllUsers, getAllRepositories, getSearchValue } from "../store/results/selectors";
import { IUser, IRepo, UserOrRepo } from "../helpers/interfaces";
import User from "../components/User";
import Repo from "../components/Repo";

const ResultsPage = () => {
  const dispatch = useAppDispatch();

  const users = useSelector(getAllUsers);
  const repositories = useSelector(getAllRepositories);
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

  return (
    <>
      <div className="wrapper-page">
        <div className="results-container">
          <header>
            <h1>results</h1>
          </header>
          <section className="results">{componentsToDisplay}</section>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
