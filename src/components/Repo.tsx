import React from "react";
import { IRepo } from "../helpers/interfaces";

interface Props {
  repo: IRepo;
}

const Repo: React.FC<Props> = (props) => {
  console.log(props);
  console.log(props.repo.full_name);

  return <>{props.repo.full_name}</>;
};

export default Repo;
