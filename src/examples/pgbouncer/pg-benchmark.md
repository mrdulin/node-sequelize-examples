# pg benchmark

- Performance at 10 client connections:

pgbench => pg

```bash
☁  node-sequelize-examples [master] ⚡  docker exec -it 3c9 bash
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 10942
latency average = 54.793 ms
tps = 182.504235 (including connections establishing)
tps = 198.113048 (excluding connections establishing)
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 10874
latency average = 55.128 ms
tps = 181.397253 (including connections establishing)
tps = 197.133239 (excluding connections establishing)
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 11694
latency average = 51.268 ms
tps = 195.054171 (including connections establishing)
tps = 211.819177 (excluding connections establishing)
root@3c9c0fd1bf53:/#
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 12126
latency average = 49.438 ms
tps = 202.274526 (including connections establishing)
tps = 219.811106 (excluding connections establishing)
```

- Performance at 80 client connections:

```bash
node-sequelize-examples=# \q
root@3c9c0fd1bf53:/# pgbench -c 80 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 13523
latency average = 355.525 ms
tps = 225.019144 (including connections establishing)
tps = 227.634662 (excluding connections establishing)
root@3c9c0fd1bf53:/#
root@3c9c0fd1bf53:/# pgbench -c 80 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 17050
latency average = 281.807 ms
tps = 283.881867 (including connections establishing)
tps = 287.245307 (excluding connections establishing)
root@3c9c0fd1bf53:/# pgbench -c 80 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 17007
latency average = 283.373 ms
tps = 282.313556 (including connections establishing)
tps = 285.629520 (excluding connections establishing)
```
