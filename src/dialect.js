'use strict';

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('pinbug')('devebot:co:redis:dialect');
var redis = require('redis');

var noop = function() {};

var Service = function(params) {
  debugx.enabled && debugx(' + constructor start ...');

  params = params || {};
  var clientOpts = params.clientOptions || {};

  this.open = function(kwargs) {
    var openOpts = lodash.merge(clientOpts, kwargs);
    var client = new Proxy(redis.createClient(openOpts), {});
    return client;
  }

  debugx.enabled && debugx(' - constructor end!');
};

Service.metadata = require('./metadata');

module.exports = Service;
