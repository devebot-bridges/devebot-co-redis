'use strict';

module.exports = {
  bridges: {
    "redis": {
      "application": {
        "redis1": {
          clientOptions: {
            host: "localhost",
            port: 6379
          }
        }
      }
    }
  }
}
