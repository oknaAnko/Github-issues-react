import React from "react";
import { IRepo } from "../helpers/interfaces";
import { githubColors } from "../files/github-colors";
import { fileIcon, starIcon } from "../helpers/icons";
import moment from "moment";

interface Props {
  repo: IRepo;
}

const Repo: React.FC<Props> = ({ repo }) => {
  const todayMoment = moment(Date.now());
  const updateMoment = moment(repo.updated_at);
  const days = Math.round(moment.duration(todayMoment.diff(updateMoment)).asDays());

  const udpateDate = moment(repo.updated_at).format("D MMM YYYY");
  const updateFromNow = moment(repo.updated_at).fromNow();

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
              <p>{days > 21 ? `Updated on ${udpateDate}` : `Updated ${updateFromNow}`}</p>
            </div>
            <div className="issues">
              <p>
                {repo.open_issues_count} {repo.open_issues_count === 1 ? `issue` : `issues`} need help
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repo;
