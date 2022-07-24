import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import {
  getAllUsers,
  getUsersError,
  getUsersLoadingStatus,
  getAllRepositories,
  getRepositoriesError,
  getRepositoriesLoadingStatus,
} from "../store/results/selectors";
import { fetchUser, fetchUserRepos } from "../store/results/actions";
import { IUserDetailed } from "../helpers/interfaces";
import { starIcon, usersIcon } from "../helpers/icons";

const UserPage = () => {
  const { login } = useParams();
  const dispatch = useAppDispatch();

  const user = useSelector(getAllUsers).find((user) => user.login === login) as IUserDetailed | undefined;
  const userError = useSelector(getUsersError);
  const userLoading = useSelector(getUsersLoadingStatus);

  const starsCount = useSelector(getAllRepositories)
    .map((user) => user.stargazers_count)
    .reduce((a, b) => a + b, 0);
  const usersReposError = useSelector(getRepositoriesError);
  const usersReposLoading = useSelector(getRepositoriesLoadingStatus);

  useEffect(() => {
    if (!user) {
      if (login) {
        dispatch(fetchUser(login));
        dispatch(fetchUserRepos(login));
      }
    } else {
      if (login) dispatch(fetchUserRepos(login));
    }
  }, []);

  return (
    <>
      {userLoading && <p className="loading-status">Trwa ładowanie danych...</p>}
      {!userLoading && user === undefined && <p className="loading-status">Nie znaleziono usera</p>}
      {userError && <p className="error-message"> Wystąpił błąd: {userError}</p>}
      {user && (
        <div className="user-page-container">
          <img src={user.avatar_url} className="user-page-avatar" alt="avatar" />
          <p className="user-page-name">{user.name}</p>
          <p className="user-page-login">{user.login}</p>
          <div className="user-page-details">
            <div className="user-page-detail">
              <span>{usersIcon}</span>
              <p className="follow-number">{user.followers}</p>
              <p className="follow-text">Followers</p>
            </div>
            <div className="user-page-detail">
              <p className="follow-number">{user.followers}</p>
              <p className="follow-text">Following</p>
            </div>
            <div className="user-page-detail">
              {usersReposLoading && <p className="loading-status-small">Ładowanie...</p>}
              {starsCount && !usersReposLoading && (
                <>
                  <span>{starIcon}</span>
                  <p className="follow-number">{starsCount}</p>
                </>
              )}
              {usersReposError && <p className="error-message-small "> Wystąpił błąd</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
