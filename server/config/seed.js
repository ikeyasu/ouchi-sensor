/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'test1-temp',
    value : 1
  }, {
    name : 'test1-temp',
    value : 1.1
  });
});
