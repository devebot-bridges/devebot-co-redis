'use strict';

module.exports = {
  bridges: {
    "redis": {
      "application": {
        "redis1": {
          clientOptions: {
            host: "192.168.2.92",
            port: 6379
          }
        }
      }
    }
  }
}
