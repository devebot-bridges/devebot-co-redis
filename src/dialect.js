'use strict';

const Devebot = require('devebot');
const lodash = Devebot.require('lodash');
const redis = require('redis');

function Dialect(params = {}) {
  const clientOpts = params.clientOptions || params || {};

  this.open = function(kwargs = {}) {
    let openOpts = lodash.merge(clientOpts, kwargs);
    let client = new Proxy(redis.createClient(openOpts), {});
    return client;
  }
};

Dialect.manifest = require('./manifest');

module.exports = Dialect;
