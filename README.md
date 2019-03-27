## Intro 
This project was bootstrapped with ReactJS

It uses Sass (with .scss).

## Directories
```
App-React#v2.0.0
├── public/             (static files)
│   ├── assets/         (assets)
│   ├── favicon.ico  
│   └── index.html      (html temlpate)
│
├── src/                (project root)
|   ├── assets/         (assets files)
|   ├── components/     (components source)
│   ├── layouts/        (layouts source)
│   ├── scss/           (scss/css source)
│   ├── views/          (views source)
│   ├── App.js
│   ├── App.test.js
│   ├── AppNav.js       (sidebar config)
│   ├── index.js
│   └── routes.js       (routes config)
│
└── package.json
```

## Usage
`npm i` - to install dependencies

## Sctipts 
`npm start` for developing (it runs webpack-dev-server)  
`npm run build` to run a dev build 


1. Open a terminal window (command prompt) on the node_modules folder outside of your project folder

2. Uninstall webpack and webpack-dev-server:

    npm uninstall webpack
    npm uninstall webpack-dev-server
3. Delete the node_modules folder and the package-lock.json file from your project's folder.

4. Open node_modules again

    npm install webpack@4.28.3
    npm install webpack-dev-server@3.1.14

5. Use this command in your project folder:

    npm install