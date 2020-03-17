SELECT 
  "tbl_a"."a_uuid", 
  "b"."id" AS "b.id", 
  "b"."b_uuid" AS "b.b_uuid", 
  "c"."id" AS "c.id", 
  "c"."c_uuid" AS "c.c_uuid" 
FROM "tbl_a" AS "tbl_a" 
LEFT OUTER JOIN "tbl_b" AS "b" ON "tbl_a"."a_uuid" = "b"."b_uuid" 
LEFT OUTER JOIN "tbl_c" AS "c" ON "tbl_a"."a_uuid" = "c"."c_uuid";