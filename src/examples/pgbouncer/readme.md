# pgbouncer

install pgbouncer

```bash
brew install pgbouncer
```

start pgbouncer daemon

```bash
pgbouncer -d /Users/ldu020/workspace/github.com/mrdulin/node-sequelize-examples/src/examples/pgbouncer/pgbouncer-test.ini
```

populate database with some data

```bash
pgbench -i -s 10 node-sequelize-examples -U testuser
```

## References

- https://devcenter.heroku.com/articles/best-practices-pgbouncer-configuration
