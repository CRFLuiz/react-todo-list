# react-todo-list

This is a simple todo list app built with React, Redux and Webpack. I built this app during my [tutorial series on YouTube](https://www.youtube.com/playlist?list=PLQDnxXqV213JJFtDaG0aE9vqvp6Wm7nBg).

## Run

1. `npm install` — install dependencies.
2. `npm start` — boots the Express dev server on port 3000. Visit <http://localhost:3000>. The server serves `client/index.html` and the static `dist/` directory that Webpack produces.
3. `npm test` — runs the Jest suite (`client/__tests__/`).
4. `npm run lint` — runs ESLint over the source tree.

Note: `npm run serve` invokes `nodemon`, which is not declared in the manifest. If you need hot restarts of the Express server, install `nodemon` separately (`npm install --save-dev nodemon`) or use `npm start` and restart manually.