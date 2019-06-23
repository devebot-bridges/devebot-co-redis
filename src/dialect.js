'use strict';

const Devebot = require('devebot');
const Promise = Devebot.require('bluebird');
const lodash = Devebot.require('lodash');
const redis = require('redis');

function Dialect(params = {}) {
  let clientOpts = params.clientOptions || params || {};

  this.open = function(kwargs) {
    let openOpts = lodash.merge(clientOpts, kwargs);
    let client = new Proxy(redis.createClient(openOpts), {});
    return client;
  }
};

Dialect.manifest = require('./manifest');

module.exports = Dialect;
