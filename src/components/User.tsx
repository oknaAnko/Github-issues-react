import React from "react";
import { IUser } from "../helpers/interfaces";

interface Props {
  user: IUser;
}

const User: React.FC<Props> = ({ user }) => {
  return <div>{user.name}</div>;
};

export default User;
