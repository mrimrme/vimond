# Node test case

Simple Rest API that works as a middle-layer between a client and another Rest API.

## Description

This Node server fetches images/users from the Typicode API and returns data based on the requested endpoint.
Additionally you can store and list todo's.
Get requests are stored in memory and have a typical cache of 10 seconds.

## Getting Started

Make sure you have [Node.js](http://nodejs.org/) installed

### Installing

```sh
git clone git@github.com:mrimrme/vimond.git
cd vimond
npm install
npm start
```

Your app should now be running on [localhost:8040](http://localhost:8040/) and display the test results.

### Serve

A single instance of the node server can be run using
```sh
npm serve
```
Which will start the server at app/server.js

Routes defined in server.js are handled in the routes/*.js files
Common http requests found in actions/*.js are promise functions 

### Testing

Mocha/chai tests are located in /test/main.js which can be run using

```sh
npm test
```
