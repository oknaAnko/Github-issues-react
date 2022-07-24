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
  url: string;
}

export interface IUserDetailed extends IUser {
  followers: number;
  following: number;
}

export interface IReposApiResponse {
  repositoriesDetails: IRepo[];
  totalCount: number;
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
