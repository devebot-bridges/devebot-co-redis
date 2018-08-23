'use strict';

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('pinbug')('devebot:co:redis:example');

var Service = function(params) {
  debugx.enabled && debugx(' + constructor begin ...');

  params = params || {};
  var self = this;
  var logger = params.loggingFactory.getLogger();

  var Redis1 = params['application/redis#redis1'];
  var redis1 = Redis1.open();

  debugx.enabled && debugx(' - constructor end!');
};

Service.referenceList = [ 'application/redis#redis1' ];

module.exports = Service;
