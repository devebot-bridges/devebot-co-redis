## devebot-co-redis example

Configure to show all of debug messages:

```shell
export DEBUG=application*
export LOGOLITE_DEBUGLOG_ENABLED=true
```

Run the example in no-password mode:

```shell
node test/app/example
```

Run the example with the encrypted password:

```shell
export DEVEBOT_SANDBOX=encrypted-passwd
node test/app/example
```

Run the example with the encrypted password, in which the key content is embedded in configuration:

```shell
export DEVEBOT_SANDBOX=embedded-key-pem
node test/app/example
```
