# Creating a React app from scratch with babel and webpack
<br/>

## I used this tutorial https://dev.to/shivampawar/setup-webpack-and-babel-for-a-react-js-application-24f5  and some of it is quoted here

<br/>

### Prats of the libraries on this tutorial are Deprecated or -about to be so i tried to do the base   installations with Up-to-date versions 

<br/>

## Creating a folder structure


Now we will see how to maintain files in folders. This structure may be get vary according to you choice.  I’ll show you structure which I personally prefer. Choice is yours!  

1. Create a folder and name it as per your application name.  
2. Open folder in command prompt (cmd).  
3. Run the following command in cmd:  

``` console
npm init

```
1. This will ask you some basic information like package name, author name. description, and license. With   this info it will create a file called package.json  
2. Create a src folder inside your project folder and add empty files named as index.js and index.html and      create two config files at your project level called .babelrc and webpack.config.js   

<br/>

Install our main dependency package, React and React DOM.
npm i -S react react-dom
Install Babel as a dev dependency for your application.

``` console
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader core-js
```

originally was  
npm i -D babel-core babel-loader babel-preset-env babel-preset-react
<br/>

## Install Webpack as a dev dependency for your application.
``` console
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```
<br/>

## Configuring Babel  


In ._babelrc _file we will define the presets which we will be using in your application.


``` js
// was {"presets":["env", "react"]}
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```
<br/>

## Configuring Webpack

In webpack.config.js you need to add following configs

``` js
//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
   },
   devServer: {
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
      ]
   },
   plugins:[
       new HtmlWebpackPlugin({
            template: path.join(__dirname,'./public/index.html')
       }) 
   ]
}
```


* entry: Here we will define entry point of our application. From this point webpack will start bundling.
* output: We will define the location where the bundled file will reside. i.e., at /dist/bundle.js
* devServer: Here development server related configurations present like we provided port number 8080 for development server.
* test: We define some regular expression that define which files will pass through which loader.
* exclude: Define files that should be excluded by loader.
* loader: Define the loaders here which we are going to use.  
<br/>


## Setting Scripts in package.json
We require some script command to run and build application, for that we need to define some script in package.json.

<pre>
"start": "webpack serve --mode development --open --hot",
"build": "webpack --mode production"
</pre>