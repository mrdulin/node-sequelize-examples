SELECT 
  "categories"."id" AS "parent.id", 
  "categories"."name" AS "parent.name" ,
  "parent"."id",
  "parent"."name"
FROM "categories" AS "categories" 
INNER JOIN "categories" AS "parent" ON "categories"."id" = "parent"."parentId" 
-- WHERE "categories"."parentId" IS NOT NULL;