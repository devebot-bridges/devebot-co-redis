'use strict';

var Dialect = require('../../lib/dialect');
var Promise = require('devebot').require('bluebird');
var lodash = require('devebot').require('lodash');
var assert = require('liberica').assert;
var mockit = require('liberica').mockit;
var path = require('path');

describe('tdd:devebot-co-redis:secureOptions', function() {
  this.timeout(180000);

  var Dialect, decryptRsaPassword;

  beforeEach(function() {
    Dialect = mockit.acquire('dialect', {
      moduleHome: path.join(__dirname, '../../lib')
    });
    decryptRsaPassword = mockit.get(Dialect, 'decryptRsaPassword');
    assert.isFunction(decryptRsaPassword);
  });

  var encryptedPasswd = 'CB47RetQYlI9hjn+jdWVr2FT5hJyolPIfFBAeu+/WUHfiI/ubTQ7GRCvhYQn79L2ZG2z/v+EZR65qLI6jnjK7w==';

  it('function decryptRsaPassword() properly decrypts the password with the [key] text field', function() {
    var passwd = decryptRsaPassword(encryptedPasswd, {
      key: [
        "-----BEGIN PUBLIC KEY-----",
        "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKo8LaejjtjWMtE/3DFitrYq4j2V9f5/",
        "4/CnqiedS+/9lTjuyxDu0s5m5jr15vlSGr2BkwT706dNMSgqg5N3/wECAwEAAQ==",
        "-----END PUBLIC KEY-----"
      ].join("\n")
    });
    assert.equal(passwd, 'changeme');
  });

  it('function decryptRsaPassword() properly decrypts the password with the key from [key_file] path', function() {
    var passwd = decryptRsaPassword(encryptedPasswd, {
      key_file: path.join(__dirname, '../app/example/keystore/public.pem')
    });
    assert.equal(passwd, 'changeme');
  });

  it('function decryptRsaPassword() throw an exception if both of [key] and [key_file] are not found', function() {
    assert.throws(function() {
      decryptRsaPassword(encryptedPasswd, {});
    }, Error);
  });
});
