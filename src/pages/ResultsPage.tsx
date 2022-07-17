import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../store/hooks";
import { fetchUsers, fetchRepositories } from "../store/results/actions";
import { getAllUsers, getAllRepositories } from "../store/results/selectors";
import { IUser, IRepo, UserOrRepo } from "../helpers/interfaces";
import User from "../components/User";
import Repo from "../components/Repo";

const ResultsPage = () => {
  const users = useSelector(getAllUsers);
  const repositories = useSelector(getAllRepositories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRepositories());
  }, []);

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
      <div>ResultPage</div>
      {componentsToDisplay}
    </>
  );
};

export default ResultsPage;
