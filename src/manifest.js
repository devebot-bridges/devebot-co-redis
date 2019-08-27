module.exports = {
  config: {
    validation: {
      schema: {
        "type": "object",
        "properties": {
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
            }
          }
        },
        "additionalProperties": false
      }
    }
  }
}
