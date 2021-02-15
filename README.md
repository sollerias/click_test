Click catcher.
##

# Postman collection path
```sh
docs/click_test.postman_collection.json
```

# nodejs-package

## Setup

```sh
$ make install
```

## Run in Dev mode

```sh
$ make dev
```

## Run tests

```sh
$ make test
```

# Clickhouse
## Run server

```sh
$ docker run -p 8123:8123 -d --name some-clickhouse-server --ulimit  nofile=262144:262144 yandex/clickhouse-server
```

## Test connection to server

```sh
$ curl 'http://localhost:8123/ping'
```

## Run client

```sh
$ docker run -it --rm --link some-clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server
```

## Create database

```sh
$ CREATE DATABASE IF NOT EXISTS clicker;
```

## Drop database

```sh
$ DROP DATABASE clicker;
```