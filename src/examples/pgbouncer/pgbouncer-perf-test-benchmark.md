# pgbouncer benchmark perf test

- Performance at 10 client connections:

```bash
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 18394
latency average = 32.689 ms
tps = 305.908784 (including connections establishing)
tps = 310.840405 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 19073
latency average = 31.467 ms
tps = 317.788611 (including connections establishing)
tps = 322.511998 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 19897
latency average = 30.168 ms
tps = 331.480666 (including connections establishing)
tps = 336.234261 (excluding connections establishing)
```

- Performance at 80 client connections:

```bash
☁  node-sequelize-examples [master] ⚡  pgbench -c 80 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 18649
latency average = 258.435 ms
tps = 309.555599 (including connections establishing)
tps = 310.080447 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 80 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 16114
latency average = 298.824 ms
tps = 267.715928 (including connections establishing)
tps = 268.162869 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 80 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 13661
latency average = 352.582 ms
tps = 226.897753 (including connections establishing)
tps = 227.411092 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 80 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 17289
latency average = 278.559 ms
tps = 287.191995 (including connections establishing)
tps = 287.633161 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 80 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 80
number of threads: 1
duration: 60 s
number of transactions actually processed: 16825
latency average = 286.481 ms
tps = 279.250257 (including connections establishing)
tps = 279.756867 (excluding connections establishing)
```
