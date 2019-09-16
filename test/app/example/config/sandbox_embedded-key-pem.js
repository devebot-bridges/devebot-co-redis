'use strict';

var path = require('path');

module.exports = {
  bridges: {
    "redis": {
      "application": {
        "redis1": {
          clientOptions: {
            host: "localhost",
            port: 6379,
            password: 'CB47RetQYlI9hjn+jdWVr2FT5hJyolPIfFBAeu+/WUHfiI/ubTQ7GRCvhYQn79L2ZG2z/v+EZR65qLI6jnjK7w=='
          },
          secureOptions: {
            encryption: true,
            key: [
              "-----BEGIN PUBLIC KEY-----",
              "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKo8LaejjtjWMtE/3DFitrYq4j2V9f5/",
              "4/CnqiedS+/9lTjuyxDu0s5m5jr15vlSGr2BkwT706dNMSgqg5N3/wECAwEAAQ==",
              "-----END PUBLIC KEY-----"
            ].join("\n")
          }
        }
      }
    }
  }
}
