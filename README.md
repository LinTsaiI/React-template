# A Basic React Project Template - Set up a React project with webpack and Babel from scratch

### How to create a React project without using React toolchains like Create React App? This tutorial leads you to create your own React application by setting up the environment with common webpack and Babel configurations.

## This template includes:

- React Router
- React Redux & reduxjs/toolkit
- Babel config
- Webpack config

## Tutorial

- Initialize your project.

```bash
npm init -y
```

- Install React dependencies. We will include React backbone and common-used development tools:
    - [React](https://reactjs.org/docs/getting-started.html)
    - React-dom
    - [React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
    - [React Redux](https://react-redux.js.org/tutorials/quick-start)

```bash
npm install react react-dom react-router-dom@6 @reduxjs/toolkit react-redux
```

- Install [Babel](https://babeljs.io/docs/en/) to handle React JSX syntax and ES6+ JavaScript syntax to adapt to different browser environments. We install the following related packages to development dependencies (***—save -dev*** or ***-D***):
    - [@babel/core](https://babeljs.io/docs/en/babel-core): The Babel compiler core.
    - [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env): A collection of babel plugins to transform modern JavaScript code, depending on the target browser we specify in the configuration, automatically enables the necessary plugins needed by your target environment(s).
    - [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react): Babel preset for all React plugins to compile JSX into regular JavaScript.

```bash
npm install @babel/core @babel/preset-env @babel/preset-react --save-dev
```

- Install webpack backbone and dev dependencies includes:
    - [webpack](https://webpack.js.org/concepts/): The webpack core.
    - webpack-cli: The webpack CLI interface.
    - [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserverstatic): A webpack development server provides live reloading.
    - [babel-loader](https://webpack.js.org/loaders/babel-loader/): A webpack loader allows transpiling JavaScript files using Babel in webpack.
    - [css-loader](https://webpack.js.org/loaders/css-loader/): Resolves CSS files, interprets @import and url() like import/require().
    - [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin): Extracts CSS into separate files with <link> instead of Inject CSS into the DOM by <style>.
    - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options): Create a HTML file to let webpack bundles inject into it.
    - [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin): Remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
    - [asset](https://webpack.js.org/guides/asset-modules/): Automatically pick between outputing images to a file, or inlining them in the bundle as base64 with a default max inline size of 8kb. ***After webpack v5, it replaces url-loader.***

```bash
npm install webpack webpack-cli webpack-dev-server babel-loader css-loader html-webpack-plugin mini-css-extract-plugin clean-webpack-plugin --save-dev
```

- Create a ***.babelrc*** file to handle Babel configurations. Put it on the same site as node_modules (the root directory).

```js
// .babelrc

{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

- Create a ***webpack.config.js*** file to handle webpack configurations. Put it on the same site as node_modules (the root directory). Detailed explanation is in the webpack.config.js file.

```js
// webpack.config.js

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      assetModuleFilename: 'img/[name][ext]',
      publicPath: '/'
    },
    devServer: {
      port: 3000,
      static: {
        directory: path.join(__dirname, 'dist'),
        watch: false,
      },
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin(),
      new Dotenv()
    ],
  }
};
```

- (Optional) Install [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack), a easy to use tool help you hide API key or other secret key.

```bash
npm install dotenv-webpack --save-dev
```

Then add the following config into the webpack.config.js.

```js
const Dotenv = require('dotenv-webpack');

module.exports = {
  ...
  plugins: [
    new Dotenv()
  ]
  ...
};
```

After setting these, you can easily access your secret key in the .env file.
```
APP_KEY=someValue
```
```js
console.log(process.env.APP_KEY);
// someValue
```

- Create the src directory for assets files. We typically need ***index.html, index.js, App.js***, and any other files that match the needs of your project. The file structure will look like the following state:

```
project-name
		--node_modules
		--src
				-index.js
				-index.html
				--container
						-App.js
						-App.css
				--comonents
						-DemoComponent.js
		-.babelrc
		-package-lock.json
		-package.json
		-webpack.confic.js
```

- A sample code of index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Project</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

- A sample code of index.js

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './container/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
```

- A sample code of App.js

```jsx
import React from 'react';
import './App.css';

const App = () => {
  return(
    <div>
      <h1>Enjoy your journey in React</h1>
    </div>
  )
}

export default App;
```

- Basic usage about React Router and React Redux (includes reduxjs/toolkit) shows in ***index.js, App.js*** and ***store*** directory.

## References

- [https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9](https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9)
- [https://www.youtube.com/watch?v=WDpxqopXd9U&ab_channel=JuniorDeveloperCentral](https://www.youtube.com/watch?v=WDpxqopXd9U&ab_channel=JuniorDeveloperCentral)
- [https://github.com/Jimmydalecleveland/webpack-starters/blob/react-full-project/webpack.config.js](https://github.com/Jimmydalecleveland/webpack-starters/blob/react-full-project/webpack.config.js)