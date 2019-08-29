'use strict';

const Devebot = require('devebot');
const lodash = Devebot.require('lodash');
const redis = require('redis');

function Dialect(params = {}) {
  const self = this;
  const globalOptions = params.clientOptions || params || {};

  this.open = function(kwargs = {}) {
    const extensions = lodash.get(params, 'extensions', null);

    let clientOptions = kwargs.clientOptions || kwargs || {};
    clientOptions = lodash.merge({}, globalOptions, clientOptions);
    clientOptions = initExtensions(self, clientOptions, extensions);

    const clientShadow = {
      enabled: true,
      instance: null,
    };

    const proxiedClient = new Proxy(clientShadow, {
      get: function (obj, prop) {
        if (obj.instance == null) {
          const { logger: L, tracer: T } = self;
          obj.instance = redis.createClient(clientOptions);
          obj.instance.on("ready", function () {
            obj.enabled = true;
            L.has('info') && L.log('info', T.toMessage({
              text: 'Redis connection is ready'
            }));
          });
          obj.instance.on("error", function (err) {
            obj.enabled = false;
            L.has('warn') && L.log('warn', T.add({
              error: { name: err.name, message: err.message }
            }).toMessage({
              text: 'Redis connection is breaking down'
            }));
          });
        }
        return prop in obj.instance ? obj.instance[prop] : undefined;
      }
    });
    return proxiedClient;
  }
};

Dialect.manifest = require('./manifest');

module.exports = Dialect;

function initExtensions (refs = {}, clientOptions, extensions) {
  const { logger: L, tracer: T } = refs;
  if (extensions && !lodash.isFunction(clientOptions.retry_strategy)) {
    const rsOpts = extensions.retry_strategy_options;
    const retry_max_delay = rsOpts.retry_max_delay || 3000;
    const connect_timeout = rsOpts.connect_timeout || 3600000;
    const max_attempts = rsOpts.max_attempts || 0;
    const trapped_codes = rsOpts.trapped_codes || [ 'ECONNREFUSED' ];
    clientOptions.retry_strategy = function (options) {
      if (options.error) {
        if (trapped_codes.indexOf(options.error.code) >= 0) {
          L.has('debug') && L.log('debug', T.add({
            error_code: options.error.code
          }).toMessage({
            tmpl: 'End reconnecting on the error ${error_code}'
          }));
          return new Error('The server refused the connection');
        }
      }
      if (options.total_retry_time > connect_timeout) {
        L.has('debug') && L.log('debug', T.add({
          total_retry_time: options.total_retry_time,
          connect_timeout
        }).toMessage({
          tmpl: 'End reconnecting after ${connect_timeout} milliseconds'
        }));
        return new Error('Retry time exhausted');
      }
      if (options.attempt > max_attempts && max_attempts > 0) {
        L.has('debug') && L.log('debug', T.add({
          attempt: options.attempt,
          max_attempts
        }).toMessage({
          tmpl: 'End reconnecting after ${attempt} attempts'
        }));
        return undefined;
      }
      // reconnect after
      const retry_period = Math.min(options.attempt * 100, retry_max_delay);
      L.has('debug') && L.log('debug', T.add({
        retry_period
      }).toMessage({
        tmpl: 'reconnect after ${retry_period} milliseconds'
      }));
      return retry_period;
    }
  }
  return clientOptions;
}
