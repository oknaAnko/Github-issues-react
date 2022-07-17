import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { fetchUsers, fetchRepositories } from "../store/results/actions";
import { getAllUsers, getAllRepositories } from "../store/results/selectors";

const Content = () => {
  const users = useSelector(getAllUsers);
  const repositories = useSelector(getAllRepositories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRepositories());
  }, []);

  return <div>Content</div>;
};

export default Content;
