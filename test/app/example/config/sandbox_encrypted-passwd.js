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
            key_file: path.join(__dirname, '../keystore/public.pem')
          }
        }
      }
    }
  }
}
