import React from "react";
import { IRepo } from "../helpers/interfaces";
import { githubColors } from "../files/github-colors";

interface Props {
  repo: IRepo;
}

const Repo: React.FC<Props> = ({ repo }) => {
  return (
    <>
      <p>
        <span className="language-color" style={{ backgroundColor: githubColors[repo.language] }}></span>
        {repo.language}
      </p>
      <p>{repo.full_name}</p>
    </>
  );
};

export default Repo;
