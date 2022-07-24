## Table of contents

- [General info](#general-info)
- [API](#api)
- [How to use the app](#how-to-use-the-app)
- [Technologies](#technologies)

## General info

Application for searching Github for users and repositories.
It contains two screens. Main screen shows the list of search results. By default results contain both users and repositories, sorted ascending by result's object id.
The second screen presents user details.

## API

The app is integrated with Github API. It is essential to create a personal access token before using the app to prevent rate limits. See the docs:
https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

The personal access token should be stored in .env.local file.

## How to use the app

1. Install the dependencies: `npm install`
2. Create a personal access token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
3. Store the token in .env.local file in REACT_APP_API_TOKEN variable
4. Start the live-server and launch the application: `npm start`

## Technologies

- React.js, React Hooks
- Typescript
- Redux Toolkit
- React-router-dom
- Axios
- SASS
