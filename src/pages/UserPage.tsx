import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { getAllUsers } from "../store/results/selectors";
import { fetchUser } from "../store/results/actions";

const UserPage = () => {
  const { login } = useParams();
  const dispatch = useAppDispatch();

  const user = useSelector(getAllUsers).find((user) => user.login === login);

  useEffect(() => {
    if (!user) {
      if (login) dispatch(fetchUser(login));
    }
  }, []);

  return (
    <>
      <div>{user?.name}</div>
    </>
  );
};

export default UserPage;
