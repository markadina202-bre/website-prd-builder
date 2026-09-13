// Tabel aplikasi PRD Builder (docs/02 § Data model). FK user → tabel auth `user`.
import { integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth-schema.js';

export const project = pgTable('project', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	stage: text('stage').notNull().default('grill'),
	currentVersion: integer('current_version').notNull().default(1),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const contextDoc = pgTable('context_doc', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	version: integer('version').notNull().default(1),
	markdown: text('markdown').notNull().default(''),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const adr = pgTable('adr', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	no: integer('no').notNull(),
	title: text('title').notNull(),
	decision: text('decision').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const abcd = pgTable('abcd', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	version: integer('version').notNull().default(1),
	a: jsonb('a').$type<Record<string, string>>().notNull().default({}),
	b: jsonb('b').$type<Record<string, string>>().notNull().default({}),
	c: jsonb('c').$type<Record<string, string>>().notNull().default({}),
	d: jsonb('d').$type<Record<string, string>>().notNull().default({}),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const ticket = pgTable('ticket', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // research | prototype | grilling | task
	title: text('title').notNull(),
	status: text('status').notNull().default('fog'), // fog | frontier | doing | done
	blockedBy: jsonb('blocked_by').$type<string[]>().notNull().default([]),
	result: text('result'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const canvasGraph = pgTable('canvas_graph', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	version: integer('version').notNull().default(1),
	nodes: jsonb('nodes').$type<unknown[]>().notNull().default([]),
	edges: jsonb('edges').$type<unknown[]>().notNull().default([]),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const prd = pgTable('prd', {
	id: text('id').primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	version: integer('version').notNull().default(1),
	markdown: text('markdown').notNull().default(''),
	score: integer('score').notNull().default(0),
	issues: jsonb('issues').$type<string[]>().notNull().default([]),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const subscription = pgTable('subscription', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	gateway: text('gateway').notNull().default('none'), // midtrans | polar | none
	status: text('status').notNull().default('none'), // active | past_due | canceled | none
	plan: text('plan').notNull().default('free'), // free | pro | team
	currentPeriodEnd: timestamp('current_period_end'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const payment = pgTable('payment', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	gateway: text('gateway').notNull(),
	ref: text('ref').notNull().unique(), // idempotency key (M-014)
	amount: integer('amount').notNull(),
	method: text('method').notNull(),
	status: text('status').notNull().default('pending'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Pengaturan situs key-value (harga dsb) — diubah via /admin.
export const siteSettings = pgTable('site_settings', {
	key: text('key').primaryKey(),
	value: text('value').notNull(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
