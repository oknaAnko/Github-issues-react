import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { getAllUsers, getUsersLoadingStatus } from "../store/results/selectors";
import { fetchUser } from "../store/results/actions";
import { IUserDetailed } from "../helpers/interfaces";
import { starIcon, usersIcon } from "../helpers/icons";

const UserPage = () => {
  const { login } = useParams();
  const dispatch = useAppDispatch();

  const user = useSelector(getAllUsers).find((user) => user.login === login) as IUserDetailed | undefined;
  const loadingUser = useSelector(getUsersLoadingStatus);

  useEffect(() => {
    if (!user) {
      if (login) dispatch(fetchUser(login));
    }
  }, []);

  return (
    <>
      {loadingUser && <p className="loading-status">Trwa ładowanie danych...</p>}
      {!loadingUser && user === undefined && <p className="loading-status">Nie znaleziono usera</p>}
      {user && (
        <div className="user-page">
          <img src={user.avatar_url} className="user-page-avatar" alt="avatar" />
          <p className="user-page-name">{user.name}</p>
          <p className="user-page-login">{user.login}</p>
          <div className="user-page-follow-container">
            <div className="user-page-follow">
              <span>{usersIcon}</span>
              <p className="follow-number">{user.followers}</p>
              <p className="follow-text">Followers</p>
            </div>
            <div className="user-page-follow">
              <p className="follow-number">{user.followers}</p>
              <p className="follow-text">Following</p>
            </div>
            <div className="user-page-follow">
              <span>{starIcon}</span>
              <p className="follow-number">0</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
