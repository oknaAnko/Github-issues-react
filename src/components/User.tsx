import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../helpers/interfaces";

interface Props {
  user: IUser;
}

const User: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div className="container-u">
        <div className="separation">
          <div className="separator"></div>
        </div>
        <div className="user">
          <div className="name-container-u">
            <div className="name-u">
              <img src={user.avatar_url} alt="avatar" />
              <Link to={`/users/${user.login}`}>{user.name}</Link>
            </div>
            <div className="login-u">
              <p>{user.login}</p>
            </div>
          </div>
          <div className="details-container-u">
            <p className="bio">{user.bio}</p>
            <p className="location">{user.location}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
