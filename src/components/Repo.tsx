import React from "react";
import { IRepo } from "../helpers/interfaces";
import { githubColors } from "../files/github-colors";
import { fileIcon, starIcon } from "../helpers/icons";

interface Props {
  repo: IRepo;
}

const Repo: React.FC<Props> = ({ repo }) => {
  return (
    <>
      <div className="container">
        <div className="separation">
          <div className="separator"></div>
        </div>
        <div className="repo">
          <div className="name-container">
            <div className="name">
              <span>{fileIcon}</span>
              <p>{repo.full_name}</p>
            </div>
            <div className="description">
              <p>{repo.description}</p>
            </div>
          </div>
          <div className="details-container">
            <div className="stars">
              <span> {starIcon}</span>
              <p>{repo.stargazers_count}</p>
            </div>
            <div className="language">
              <span className="language-color" style={{ backgroundColor: githubColors[repo.language] }}></span>
              <p> {repo.language}</p>
            </div>
            <div className="license">
              <p>{repo.license ? repo.license.name : ""}</p>
            </div>
            <div className="date">
              <p>{repo.updated_at}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repo;
