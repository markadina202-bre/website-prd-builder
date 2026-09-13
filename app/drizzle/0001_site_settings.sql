CREATE TABLE "site_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "site_settings" ("key", "value") VALUES ('price_pro', '49000'), ('price_team', '199000') ON CONFLICT ("key") DO NOTHING;
