import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../helpers/interfaces";

interface Props {
  user: IUser;
}

const User: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Link to={`/users/${user.login}`}>{user.name}</Link>
    </>
  );
};

export default User;
