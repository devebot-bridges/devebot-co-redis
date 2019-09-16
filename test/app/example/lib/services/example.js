'use strict';

function Service (params) {
  params = params || {};

  var redis1 = null;
  function getClient() {
    redis1 = redis1 || params.redisDialect.open();
    return redis1;
  }
};

Service.referenceHash = {
  redisDialect: 'application/redis#redis1'
};

module.exports = Service;
