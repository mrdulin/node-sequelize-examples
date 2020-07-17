# like

```bash

```

全表查询

```bash
node-sequelize-examples=# explain analyze select * from tests where name like '%Feil%';
                                                 QUERY PLAN
-------------------------------------------------------------------------------------------------------------
 Seq Scan on tests  (cost=0.00..75144.71 rows=40136 width=19) (actual time=0.059..623.226 rows=8454 loops=1)
   Filter: ((name)::text ~~ '%Feil%'::text)
   Rows Removed by Filter: 3991546
 Planning time: 0.166 ms
 Execution time: 679.735 ms
(5 rows)
```

```bash

```
