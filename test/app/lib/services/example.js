'use strict';

var Service = function(params) {
  params = params || {};
  var Redis1 = params['application/redis#redis1'];
  var redis1 = Redis1.open();
};

Service.referenceList = [ 'application/redis#redis1' ];

module.exports = Service;
