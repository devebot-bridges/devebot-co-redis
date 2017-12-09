'use strict';

var Dialect = require('../../lib/dialect');

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

  
});
