import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { fetchUsers } from "../store/results/actions";
import { getAllUsers } from "../store/results/selectors";

const Content = () => {
  const users = useSelector(getAllUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return <div>Content</div>;
};

export default Content;
