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
git clone git@github.com:heroku/node-js-sample.git
cd vimond
npm install
npm start
```

Your app should now be running on [localhost:8040](http://localhost:8040/).

### Testing

Mocha/chai tests are located in /test/main.js which can be run using

```sh
npm test
```