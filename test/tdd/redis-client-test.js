'use strict';

var Dialect = require('../../lib/dialect');
var Promise = require('devebot').require('bluebird');

describe('tdd:devebot-co-redis:client', function() {
  this.timeout(180000);

  it('should create redis client properly', function(done) {
    var dialect = new Dialect({});
    var client = dialect.open();
    var reqId = 'gKfxflpyQImCaoHypjcfyw';
    var reqKey = 'req:' + reqId + '/result';
    client.set(reqKey, JSON.stringify({ reqId: reqId, message: 'Hello world'}));
    setTimeout(function() {
      client.get(reqKey, function(err, reply) {
        console.log(reply.toString());
        client.quit();
        done();
      })
    }, 10);
  });

  it('rename a key', function(done) {
    var dialect = new Dialect({});
    var client = dialect.open();
    var reqId = 'gKfxflpyQImCaoHypjcfyw';
    var reqKey = 'req:' + reqId + '/req';
    var resKey = 'req:' + reqId + '/res';
    client.set(reqKey, JSON.stringify({ reqId: reqId, message: 'Hello world'}));
    setTimeout(function() {
      client.rename(reqKey, resKey, function(err, reply) {
        console.log(reply.toString());
        client.quit();
        done();
      })
    }, 10);
  });

  it('Multiple GET to check an action', function(done) {
    var dialect = new Dialect({});
    var client = dialect.open();
    var reqId = 'gKfxflpyQImCaoHypjcfyw';
    var reqKey = 'req:' + reqId + ':req';
    var resKey = 'req:' + reqId + ':res';
    Promise.resolve()
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
    .asCallback(done);
    // client.set(reqKey, JSON.stringify({ reqId: reqId, message: 'Hello world'}));
    // setTimeout(function() {
    //   client.rename(reqKey, resKey, function(err, reply) {
    //     console.log(reply.toString());
    //     client.quit();
    //     done();
    //   })
    // }, 10);
  });
});
