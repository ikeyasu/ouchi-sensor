#!/usr/bin/env node

var request = require('request');

var DOMAIN = 'localhost:9000';
if (process.env.DOMAIN) {
  DOMAIN = process.env.DOMAIN;
}

request('http://' + DOMAIN + '/api/things/retrieveSensors', function(error, response, body) {
  console.log(body);
});
