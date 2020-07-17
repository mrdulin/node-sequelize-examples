# index

```bash
node-sequelize-examples=# explain analyze select * from items where tenant_id = 'b1fc72ac-4fad-4e3b-8650-e04308439155';
                                              QUERY PLAN
------------------------------------------------------------------------------------------------------
 Seq Scan on items  (cost=0.00..75478.00 rows=1 width=20) (actual time=0.026..601.473 rows=1 loops=1)
   Filter: (tenant_id = 'b1fc72ac-4fad-4e3b-8650-e04308439155'::uuid)
   Rows Removed by Filter: 3999999
 Planning time: 0.083 ms
 Execution time: 601.537 ms
(5 rows)
```

After creating index

```bash
node-sequelize-examples=# \d+ items;
                                              Table "public.items"
  Column   |  Type   |                     Modifiers                      | Storage | Stats target | Description
-----------+---------+----------------------------------------------------+---------+--------------+-------------
 id        | integer | not null default nextval('items_id_seq'::regclass) | plain   |              |
 tenant_id | uuid    | not null                                           | plain   |              |
Indexes:
    "items_pkey" PRIMARY KEY, btree (id)
    "tenant_id_index" btree (tenant_id)
```

```bash
node-sequelize-examples=# explain analyze select * from items where tenant_id = '340b6a66-aa49-4270-a8d8-d16eeaba05e5';
                                                       QUERY PLAN
------------------------------------------------------------------------------------------------------------------------
 Index Scan using tenant_id_index on items  (cost=0.43..8.45 rows=1 width=20) (actual time=0.031..0.050 rows=1 loops=1)
   Index Cond: (tenant_id = '340b6a66-aa49-4270-a8d8-d16eeaba05e5'::uuid)
 Planning time: 0.084 ms
 Execution time: 0.120 ms
(4 rows)
```
