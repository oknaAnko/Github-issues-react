import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../helpers/interfaces";

interface Props {
  user: IUser;
}

const User: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div className="user-container">
        {/* <div className="separation">
          <div className="separator"></div>
        </div> */}
        <div className="user">
          <div className="user-titles">
            <div className="user-titles-name">
              <img src={user.avatar_url} alt="avatar" />
              <Link to={`/users/${user.login}`}>{user.name}</Link>
            </div>
            <div className="user-titles-login">
              <p>{user.login}</p>
            </div>
          </div>
          <div className="user-details">
            <p className="user-details-bio">{user.bio}</p>
            <p className="user-details-location">{user.location}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
