/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');
var Thing = require('./thing.model');

var TEMP_SENSOR_URL = 'https://api.spark.io/v1/devices/' + process.env.DEVICE_ID +'/temp?access_token=' + process.env.ACCESS_TOKEN;
var HUMID_SENSOR_URL = 'https://api.spark.io/v1/devices/' + process.env.DEVICE_ID +'/humid?access_token=' + process.env.ACCESS_TOKEN;

function retriveSensor(url, name, callback) {
  request(url, function(error, response, body) {
    var value = JSON.parse(body).result;
    Thing.create({name: name, value: value}, callback);
  });
}

// Retrieve sensor data
exports.retrieveSensors = function(req, res) {
  retriveSensor(TEMP_SENSOR_URL, 'sensor1-temp', function (err, things_temp) {
    if(err) { return handleError(res, err); }
    return res.json(200, things_temp);
  });
};

exports.showSensor = function(req, res) {
  var query = Thing.where({'value': {'$ne': null }}).sort({'date': -1});
  query.findOne(function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(200, thing);
  });
}

// Get list of things
exports.index = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}