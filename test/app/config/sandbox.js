'use strict';

module.exports = {
  bridges: {
    "redis": {
      "application": {
        "redis1": {
          clientOptions: {
            host: "localhost",
            port: 6379
          },
          extensions: {
            retry_strategy_options: {
              connect_timeout: 1000 * 3,
              max_attempts: 1,
              retry_max_delay: 1000,
            }
          }
        }
      }
    }
  }
}
