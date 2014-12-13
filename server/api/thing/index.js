'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/retrieveSensors', controller.retrieveSensors);
router.get('/showSensor', controller.showSensor);

module.exports = router;