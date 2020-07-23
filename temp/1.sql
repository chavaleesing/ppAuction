CREATE TYPE contact_type as enum ('MOBILE', 'LINE', 'ADDRESS', 'FACEBOOK', 'INSTRTAGRAM');
CREATE TYPE user_role as enum ('SUPERVISOR', 'ADMIN', 'USER');
CREATE TYPE token_status as enum ('ACTIVE', 'EXPIRED');

CREATE TABLE "users" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "username" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "user_contacts" (
  "user_id" uuid NOT NULL,
  "type" contact_type NOT NULL,
  "value" varchar NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "products" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar,
  "price" float NOT NULL,
  "rate" float,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "user_id" uuid NOT NULL
);

CREATE TABLE "categories" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "procducts_categories" (
  "product_id" uuid NOT NULL,
  "catagory_id" uuid NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  UNIQUE ("product_id", "catagory_id")
);

CREATE TABLE "shops" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "rate" float,
  "bio" varchar,
  "description" varchar,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "shop_contacts" (
  "shop_id" uuid NOT NULL,
  "type" contact_type NOT NULL,
  "value" varchar NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "procducts_shops" (
  "product_id" uuid NOT NULL,
  "shop_id" uuid NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  UNIQUE ("product_id", "shop_id")
);

CREATE TABLE "users_shops" (
  "user_id" uuid NOT NULL,
  "shop_id" uuid NOT NULL,
  "role" user_role NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  UNIQUE ("user_id","shop_id")
);

CREATE TABLE "shop_reviews" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "shop_id" uuid NOT NULL,
  "review" varchar,
  "rate" float NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "product_reviews" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "product_id" uuid NOT NULL,
  "review" varchar,
  "rate" float NOT NULL,
  "user_id" uuid NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "access_token" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "token" varchar UNIQUE NOT NULL,
  "refresh_token" varchar UNIQUE NOT NULL,
  "expires" timestamp NOT NULL,
  "status" token_status NOT NULL,
  "user_id" uuid NOT NULL,
  "created_at" timestamp WITH TIME ZONE DEFAULT NOW(),
  "updated_at" timestamp WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE "user_contacts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "procducts_categories" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "procducts_categories" ADD FOREIGN KEY ("catagory_id") REFERENCES "categories" ("id");
ALTER TABLE "shop_contacts" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");
ALTER TABLE "procducts_shops" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "procducts_shops" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");
ALTER TABLE "users_shops" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_shops" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");
ALTER TABLE "shop_reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "shop_reviews" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");
ALTER TABLE "product_reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "product_reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "access_token" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");



/*
  DROP TABLE IF EXISTS users CASCADE ;
  DROP TABLE IF EXISTS user_contacts CASCADE ;
  DROP TABLE IF EXISTS products CASCADE ;
  DROP TABLE IF EXISTS procducts_categories CASCADE ;
  DROP TABLE IF EXISTS categories CASCADE ;
  DROP TABLE IF EXISTS shops CASCADE ;
  DROP TABLE IF EXISTS shop_contacts CASCADE ;
  DROP TABLE IF EXISTS procducts_shops CASCADE ;
  DROP TABLE IF EXISTS users_shops CASCADE ;
  DROP TABLE IF EXISTS shop_reviews CASCADE ;
  DROP TABLE IF EXISTS product_reviews CASCADE ;
  DROP TABLE IF EXISTS access_token CASCADE ;
*/