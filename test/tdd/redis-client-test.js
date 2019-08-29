'use strict';

var Dialect = require('../../lib/dialect');
var Promise = require('devebot').require('bluebird');
var lodash = require('devebot').require('lodash');
var mockit = require('liberica').mockit;

describe('tdd:devebot-co-redis:client', function() {
  this.timeout(180000);

  it('should create redis client properly', function(done) {
    createClient()
    .then(function(client) {
      return new Promise(function(resolved) {
        var reqId = 'gKfxflpyQImCaoHypjcfyw';
        var reqKey = 'req:' + reqId + '/result';
        client.set(reqKey, JSON.stringify({ reqId: reqId, message: 'Hello world'}));
        setTimeout(function() {
          client.get(reqKey, function(err, reply) {
            console.log(reply.toString());
            client.quit();
            resolved();
          })
        }, 10);
      })
    })
    .asCallback(done);
  });

  it('rename a key', function(done) {
    createClient()
    .then(function(client) {
      return new Promise(function(resolved) {
        var reqId = 'gKfxflpyQImCaoHypjcfyw';
        var reqKey = 'req:' + reqId + '/req';
        var resKey = 'req:' + reqId + '/res';
        client.set(reqKey, JSON.stringify({ reqId: reqId, message: 'Hello world'}));
        setTimeout(function() {
          client.rename(reqKey, resKey, function(err, reply) {
            console.log(reply.toString());
            client.quit();
            resolved();
          })
        }, 10);
      })
    })
    .asCallback(done);
  });

  it('Multiple GET to check an action', function(done) {
    var reqId = 'gKfxflpyQImCaoHypjcfyw';
    var reqKey = 'req:' + reqId + ':req';
    var resKey = 'req:' + reqId + ':res';
    createClient()
    .then(function(client) {
      return Promise.resolve()
      .then(function() {
        var _mget = Promise.promisify(client.mget, {context: client});
        return _mget(reqKey, resKey);
      })
      .then(function(replies) {
        console.log(JSON.stringify(replies));
        return replies;
      })
      .then(function(replies) {
        var _set = Promise.promisify(client.set, {context: client});
        return _set(reqKey, 1);
      })
      .then(function(reply) {
        console.log(JSON.stringify(reply));
        return reply;
      })
      .delay(500)
      .then(function() {
        var _mget = Promise.promisify(client.mget, {context: client});
        return _mget(reqKey, resKey);
      })
      .then(function(replies) {
        console.log('Type of the first item: ', typeof(replies[0]));
        console.log(JSON.stringify(replies));
        return replies;
      })
      .delay(500)
      .then(function(replies) {
        var _set = Promise.promisify(client.set, {context: client});
        return _set(reqKey, JSON.stringify({ reqId: reqId, message: 'Hello world'}));
      })
      .then(function(reply) {
        console.log(JSON.stringify(reply));
        return reply;
      })
      .delay(500)
      .then(function() {
        var _rename = Promise.promisify(client.rename, {context: client});
        return _rename(reqKey, resKey);
      })
      .delay(500)
      .then(function() {
        var _mget = Promise.promisify(client.mget, {context: client});
        return _mget(reqKey, resKey);
      })
      .then(function(replies) {
        console.log(JSON.stringify(replies));
        return replies;
      })
      .delay(500)
      .then(function() {
        var _del = Promise.promisify(client.del, {context: client});
        return _del(reqKey, resKey);
      })
      .then(function(reply) {
        console.log(JSON.stringify(reply));
        return reply;
      })
      .delay(500)
      .then(function() {
        var _mget = Promise.promisify(client.mget, {context: client});
        return _mget(reqKey, resKey);
      })
      .then(function(replies) {
        console.log(JSON.stringify(replies));
        return replies;
      })
    })
    .asCallback(done);
  });
});

function createContext () {
  var loggingFactory = mockit.createLoggingFactoryMock({ captureMethodCall: false });
  var ctx = {
    logger: loggingFactory.getLogger(),
    tracer: loggingFactory.getTracer(),
  }
  return ctx;
}

function assignAttributes(obj, attrs) {
  for (const name in attrs) {
    obj[name] = attrs[name];
  }
  return obj;
}

function createClient(opts = {}) {
  opts = lodash.assign({
    // port: 6378,
    retry_max_delay: 1000,
    max_attempts: 1
  }, opts);
  return new Promise(function(resolved, rejected) {
    var dialect = assignAttributes(new Dialect(opts), createContext());
    var client = dialect.open();
    client.on('ready', function() {
      resolved(client);
    });
    client.on('error', function(err) {
      rejected(err);
    });
  });
}
