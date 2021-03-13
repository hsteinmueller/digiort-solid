# Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
and uses some components/utilities from [Generator Solid React](https://github.com/inrupt/generator-solid-react).


## Libraries used:

- [solid-ui-react](https://github.com/inrupt/solid-ui-react):
  - React components: LoginButton, LogoutButton
  - useSession-Hook for login state and webId
- [query-ldflex](https://github.com/solid/query-ldflex):
  - access data in Solid pods through LDflex expressions
- [solid-auth-cli](https://github.com/jeff-zucker/solid-auth-cli),
[solid-file-client](https://github.com/jeff-zucker/solid-file-client),
[solid-node-client](https://github.com/solid/solid-node-client): see `deployment`
- [bulma](https://github.com/jgthms/bulma): styling and css framework

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`

This runs `publish.js`.

This script uses [solid-file-client](https://github.com/jeff-zucker/solid-file-client) to copy
the `build` folder to a specified folder in a pod to deploy the webapp.
It uses [solid-auth-cli](https://github.com/jeff-zucker/solid-auth-cli) for authentication.
For this the environment variables `pod_username` and `pod_password` need to be set.
This also automatically runs `build` before deployment.

`publish2.js` uses [solid-node-client](https://github.com/solid/solid-node-client), but doesn't work for now. See comment in file.

## Component-Architecture

- `App`:
  - entry component
  - uses `useSession` to check if the user is logged in
  - depending on that renders `WelcomeComponent` or `LoginComponent`
- `LoginComponent`:
  - shows registration link, provider selection and LoginButton
  - after login redirects to app entry, which then shows `WelcomeComponent`
- `WelcomeComponent`:
  - 'main' component with `NavBar`
  - show data form and uploads file to pod on submit
  - `Overwrite` checkbox:
    - if checked creates new file with the data from template
    - if not checked: appends data to existing file (or creates new file)
- `NavBar`:
  -  Header with {username}
  -  Logout button: removes session from storage and refreshes page
-  `UserdataFrom`:
   -  render form for data input
   -  takes `onSubmit` function
-  `FileViewer`:
   -  shows files in app-folder
-  `FileUploader`:
   -  **not used**: allows selection of file from local filesystem

## Hooks
- `useFiles`:
  - needs a session and uses solid-file-client to query and return files in app-folder

## other info

`GENERATE_SOURCEMAP=false` in `.env`  prevents the creation of sourcemaps and reduces `build` size for upload/hosting in pod.