export interface IUsersFromAPI {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface IUsersApiResponse {
  usersDetails: IUser[];
  totalCount: number;
}

export interface IUser {
  id: number;
  name: string;
  login: string;
  bio: string;
  location: string;
  avatar_url: string;
}

export interface IUserDetailed extends IUser {
  followers: number;
  following: number;
}

export interface IReposApiResponse {
  repositoriesDetails: IRepo[];
  totalCount: number;
}

export interface IRepositoriesFromAPI {
  id: number;
  full_name: string;
  url: string;
  description: string;
}

interface ILicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface IRepo {
  id: number;
  full_name: string;
  description: string;
  url: string;
  stargazers_count: number;
  language: string;
  license: Partial<ILicense>;
  updated_at: string;
  open_issues_count: number;
}

export type UserOrRepo = IUser | IRepo;
