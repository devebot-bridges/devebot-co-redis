module.exports = {
  config: {
    validation: {
      schema: {
        "type": "object",
        "properties": {
          "secureOptions": {
            "type": "object",
            "properties": {
              "encryption": {
                "type": "boolean",
                "default": false,
                "description": "Password must be encrypted"
              },
              "key": {
                "type": "string",
                "description": "The key content in PEM format"
              },
              "key_file": {
                "type": "string",
                "default": "public.pem",
                "description": "File name where key saved"
              },
              "encoding": {
                "type": "string",
                "default": "utf8",
                "description": "Encoding for result string"
              }
            },
            "additionalProperties": false
          },
          "clientOptions": {
            "type": "object",
            "properties": {
              "host": {
                "type": "string",
                "default": "127.0.0.1",
                "description": "IP address of the Redis server"
              },
              "port": {
                "type": "number",
                "default": 6379,
                "description": "Port of the Redis server"
              },
              "path": {
                "type": "string",
                "default": null,
                "description": "The UNIX socket string of the Redis server"
              },
              "url": {
                "type": "string",
                "default": null,
                "description": "The URL of the Redis server. Format: [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]"
              },
              "string_numbers": {
                "type": "boolean",
                "default": null,
                "description": "Set to true, node_redis will return Redis number values as Strings instead of javascript Numbers. Useful if you need to handle big numbers (above Number.MAX_SAFE_INTEGER === 2^53). Hiredis is incapable of this behavior, so setting this option to true will result in the built-in javascript parser being used no matter the value of the parser option."
              },
              "return_buffers": {
                "type": "boolean",
                "default": false,
                "description": "If set to true, then all replies will be sent to callbacks as Buffers instead of Strings."
              },
              "detect_buffers": {
                "type": "boolean",
                "default": false,
                "description": "If set to true, then replies will be sent to callbacks as Buffers. This option lets you switch between Buffers and Strings on a per-command basis, whereas return_buffers applies to every command on a client. Note: This doesn't work properly with the pubsub mode. A subscriber has to either always return Strings or Buffers."
              },
              "socket_keepalive": {
                "type": "boolean",
                "default": true,
                "description": "If set to true, the keep-alive functionality is enabled on the underlying socket."
              },
              "no_ready_check": {
                "type": "boolean",
                "default": false,
                "description": 'When a connection is established to the Redis server, the server might still be loading the database from disk. While loading, the server will not respond to any commands. To work around this, node_redis has a "ready check" which sends the INFO command to the server. The response from the INFO command indicates whether the server is ready for more commands. When ready, node_redis emits a ready event. Setting no_ready_check to true will inhibit this check.'
              },
              "enable_offline_queue": {
                "type": "boolean",
                "default": true,
                "description": "By default, if there is no active connection to the Redis server, commands are added to a queue and are executed once the connection has been established. Setting enable_offline_queue to false will disable this feature and the callback will be executed immediately with an error, or an error will be emitted if no callback is specified."
              },
              "retry_max_delay": {
                "type": "number",
                "default": null,
                "description": "Deprecated Please use retry_strategy instead. By default, every time the client tries to connect and fails, the reconnection delay almost doubles. This delay normally grows infinitely, but setting retry_max_delay limits it to the maximum value provided in milliseconds."
              },
              "connect_timeout": {
                "type": "number",
                "default": 3600000,
                "description": "Deprecated Please use retry_strategy instead. Setting connect_timeout limits the total time for the client to connect and reconnect. The value is provided in milliseconds and is counted from the moment a new client is created or from the time the connection is lost. The last retry is going to happen exactly at the timeout time. Default is to try connecting until the default system socket timeout has been exceeded and to try reconnecting until 1h has elapsed."
              },
              "max_attempts": {
                "type": "number",
                "default": 0,
                "description": "Deprecated Please use retry_strategy instead. By default, a client will try reconnecting until connected. Setting max_attempts limits total amount of connection attempts. Setting this to 1 will prevent any reconnect attempt."
              },
              "retry_unfulfilled_commands": {
                "type": "boolean",
                "default": false,
                "description": "If set to true, all commands that were unfulfilled while the connection is lost will be retried after the connection has been reestablished. Use this with caution if you use state altering commands (e.g. incr). This is especially useful if you use blocking commands."
              },
              "password": {
                "type": "string",
                "default": null,
                "description": "If set, client will run Redis auth command on connect. Alias auth_pass Note node_redis < 2.5 must use auth_pass"
              },
              "db": {
                "type": "string",
                "default": null,
                "description": "If set, client will run Redis select command on connect."
              },
              "family": {
                "type": "string",
                "default": "IPv4",
                "description": "You can force using IPv6 if you set the family to 'IPv6'. See Node.js net or dns modules on how to use the family type."
              },
              "disable_resubscribing": {
                "type": "boolean",
                "default": false,
                "description": "If set to true, a client won't resubscribe after disconnecting."
              },
              "rename_commands": {
                "type": "object",
                "description": 'Passing an object with renamed commands to use instead of the original functions. For example, if you renamed the command KEYS to "DO-NOT-USE" then the rename_commands object would be: { KEYS : "DO-NOT-USE" } . See the Redis security topics for more info.'
              },
              "tls": {
                "type": "object",
                "description": "An object containing options to pass to tls.connect to set up a TLS connection to Redis (if, for example, it is set up to be accessible via a tunnel)."
              },
              "prefix": {
                "type": "string",
                "default": null,
                "description": "A string used to prefix all used keys (e.g. namespace:test). Please be aware that the keys command will not be prefixed. The keys command has a [pattern] as argument and no key and it would be impossible to determine the existing keys in Redis if this would be prefixed."
              },
              "retry_strategy": {
                "description": "A function that receives an options object as parameter including the retry attempt, the total_retry_time indicating how much time passed since the last time connected, the error why the connection was lost and the number of times_connected in total. If you return a number from this function, the retry will happen exactly after that time in milliseconds. If you return a non-number, no further retry will happen and all offline commands are flushed with errors. Return an error to return that specific error to all offline commands."
              }
            },
            "additionalProperties": false
          },
          "extensions": {
            "type": "object",
            "properties": {
              "retry_strategy_options": {
                "type": "object",
                "properties": {
                  "trapped_codes": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "retry_max_delay": {
                    "type": "number",
                    "default": 3000,
                    "description": "By default, every time the client tries to connect and fails, the reconnection delay almost doubles. This delay normally grows infinitely, but setting retry_max_delay limits it to the maximum value provided in milliseconds."
                  },
                  "connect_timeout": {
                    "type": "number",
                    "default": 3600000,
                    "description": "Setting connect_timeout limits the total time for the client to connect and reconnect. The value is provided in milliseconds and is counted from the moment a new client is created or from the time the connection is lost. The last retry is going to happen exactly at the timeout time. Default is to try connecting until the default system socket timeout has been exceeded and to try reconnecting until 1h has elapsed."
                  },
                  "max_attempts": {
                    "type": "number",
                    "default": 0,
                    "description": "By default, a client will try reconnecting until connected. Setting max_attempts limits total amount of connection attempts. Setting this to 1 will prevent any reconnect attempt."
                  },
                }
              }
            }
          }
        },
        "additionalProperties": false
      }
    }
  }
}
