The app is deployed to `https://fb-albums.herokuapp.com`.

## Local development

- Install npm and node https://nodejs.org/en/.
- Intall yarn https://legacy.yarnpkg.com/en/docs/install#windows-stable
- Download project or run `git clone https://github.com/dayrim/imagely.git` to clone project.
- Go to project root.
- Run `yarn install` to download all flagged dependencies and build the project. All build files will be stored in the `dist/` directory.
- Run `yarn start` to start development server.
- Navigate to `http://localhost:3000/`.
- If you see `https` error, put in chrome://flags/#allow-insecure-localhost in the address bar.
- Enable the option "Allow invalid certificates for resources loaded from localhost"

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
