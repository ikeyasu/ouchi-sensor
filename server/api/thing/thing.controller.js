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
  Thing.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, thing) {
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

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}