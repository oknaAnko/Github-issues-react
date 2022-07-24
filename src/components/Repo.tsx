import React from "react";
import moment from "moment";
import { IRepo } from "../helpers/interfaces";
import { githubColors } from "../files/github-colors";
import { fileIcon, starIcon } from "../helpers/icons";

interface Props {
  repo: IRepo;
}

const Repo: React.FC<Props> = ({ repo }) => {
  const todayMoment = moment(Date.now());
  const updateMoment = moment(repo.updated_at);
  const days = Math.round(moment.duration(todayMoment.diff(updateMoment)).asDays());

  const updateDate = moment(repo.updated_at).format("D MMM YYYY");
  const updateFromNow = moment(repo.updated_at).fromNow();

  return (
    <>
      <div className="repo-container">
        <div className="separation">
          <div className="separator"></div>
        </div>
        <div className="repo">
          <div className="repo-titles">
            <div className="repo-titles-name">
              <span>{fileIcon}</span>
              <p>{repo.full_name}</p>
            </div>
            <div className="repo-titles-description">
              <p>{repo.description}</p>
            </div>
          </div>
          <div className="repo-details">
            <div className="repo-detail">
              <span> {starIcon}</span>
              <p className="stars-text">{repo.stargazers_count}</p>
            </div>
            <div className="repo-detail">
              <span className="language-color" style={{ backgroundColor: githubColors[repo.language] }}></span>
              <p> {repo.language}</p>
            </div>
            {repo.license && (
              <div className="repo-detail">
                <p>{repo.license.name}</p>
              </div>
            )}
            <div className="repo-detail">
              <p>{days > 21 ? `Updated on ${updateDate}` : `Updated ${updateFromNow}`}</p>
            </div>
            <div className="repo-detail">
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
