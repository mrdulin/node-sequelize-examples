# pgbouncer benchmark sandbox test

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
number of transactions actually processed: 11658
latency average = 51.508 ms
tps = 194.143853 (including connections establishing)
tps = 195.271494 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 10726
latency average = 55.975 ms
tps = 178.650547 (including connections establishing)
tps = 181.016758 (excluding connections establishing)
☁  node-sequelize-examples [master] ⚡
☁  node-sequelize-examples [master] ⚡  pgbench -c 10 -C -T 60 -p 6432 node-sequelize-examples -U marko
starting vacuum...end.
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 10
query mode: simple
number of clients: 10
number of threads: 1
duration: 60 s
number of transactions actually processed: 11940
latency average = 50.284 ms
tps = 198.871877 (including connections establishing)
tps = 200.354585 (excluding connections establishing)
```
