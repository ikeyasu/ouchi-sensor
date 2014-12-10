'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: {type: String, index: true},
  value: Number,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Thing', ThingSchema);
