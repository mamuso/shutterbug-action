# Migration `20200409225613-scaffold`

This migration has been generated by Manuel Muñoz Solera at 4/9/2020, 10:56:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Report" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "current" boolean  NOT NULL DEFAULT false,
    "id" text  NOT NULL ,
    "page" text   ,
    "slug" text  NOT NULL DEFAULT '',
    "url" text   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Page" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" text  NOT NULL ,
    "slug" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Capture" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "device" text  NOT NULL DEFAULT '',
    "diff" boolean  NOT NULL DEFAULT false,
    "id" text  NOT NULL ,
    "page" text   ,
    "report" text   ,
    "slug" text  NOT NULL DEFAULT '',
    "url" text   ,
    "urldiff" text   ,
    "urlmin" text   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Device" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" text  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    "slug" text  NOT NULL DEFAULT '',
    "specs" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "Report.slug" ON "public"."Report"("slug")

CREATE UNIQUE INDEX "Page.slug" ON "public"."Page"("slug")

CREATE UNIQUE INDEX "Device.slug" ON "public"."Device"("slug")

ALTER TABLE "public"."Report" ADD FOREIGN KEY ("page") REFERENCES "public"."Page"("id") ON DELETE SET NULL

ALTER TABLE "public"."Capture" ADD FOREIGN KEY ("report") REFERENCES "public"."Report"("id") ON DELETE SET NULL

ALTER TABLE "public"."Capture" ADD FOREIGN KEY ("page") REFERENCES "public"."Page"("id") ON DELETE SET NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200409225613-scaffold
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,44 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("POSTGRES_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Report {
+  id        String    @default(cuid()) @id
+  slug      String    @unique
+  createdAt DateTime  @default(now())
+  captures  Capture[]
+  url       String?
+  current   Boolean  @default(false)
+}
+
+model Page {
+  id        String    @default(cuid()) @id
+  slug      String    @unique
+  captures  Capture[]
+  reports   Report[]
+  createdAt DateTime  @default(now())
+}
+
+model Capture {
+  id          String    @default(cuid()) @id
+  slug        String
+  url         String?
+  urlmin      String?
+  urldiff     String?
+  diff        Boolean   @default(false)
+  device      String
+  createdAt   DateTime  @default(now())
+}
+
+model Device {
+  id        String    @default(cuid()) @id
+  slug      String    @unique
+  name      String
+  specs     String
+  createdAt DateTime  @default(now())
+}
```

