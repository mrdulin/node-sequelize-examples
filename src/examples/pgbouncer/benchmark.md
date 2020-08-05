# benchmark

- Performance at 10 client connections:

pgbench => pgbouncer => pg

```bash
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 14614
latency average = 41.084 ms
tps = 243.405840 (including connections establishing)
tps = 248.316242 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 14982
latency average = 40.063 ms
tps = 249.606942 (including connections establishing)
tps = 254.950809 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 16136
latency average = 37.205 ms
tps = 268.780509 (including connections establishing)
tps = 273.503709 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 15029
latency average = 39.940 ms
tps = 250.377666 (including connections establishing)
tps = 254.568357 (excluding connections establishing)
```

pgbench => pg

```bash
connection to database "node-sequelize-examples" failed:
FATAL:  role "root" does not exist
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 17140
latency average = 35.016 ms
tps = 285.580678 (including connections establishing)
tps = 311.323256 (excluding connections establishing)
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 12391
latency average = 48.444 ms
tps = 206.425918 (including connections establishing)
tps = 224.404702 (excluding connections establishing)
root@3c9c0fd1bf53:/#
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 13320
latency average = 45.061 ms
tps = 221.922627 (including connections establishing)
tps = 241.197323 (excluding connections establishing)
root@3c9c0fd1bf53:/# pgbench -c 10 -C -T 60 node-sequelize-examples -U testuser
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 15666
latency average = 38.309 ms
tps = 261.038125 (including connections establishing)
tps = 284.508770 (excluding connections establishing)
```
