import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table linked to Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  walletAddress: text('wallet_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Agricultural Lots tokenized on-chain
export const agriculturalLots = pgTable('agricultural_lots', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  crop: text('crop').notNull(),
  location: text('location').notNull(),
  areaHectares: integer('area_hectares').notNull(),
  targetFunding: integer('target_funding').notNull(),
  fundedAmount: integer('funded_amount').notNull(),
  tokenSymbol: text('token_symbol').notNull(),
  tokenPriceUsd: integer('token_price_usd').notNull(),
  estimatedApy: text('estimated_apy').notNull(),
  status: text('status').notNull().default('funding'),
  contractAddress: text('contract_address'),
  escrowBalance: text('escrow_balance'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Real-time IoT sensor telemetry
export const iotTelemetry = pgTable('iot_telemetry', {
  id: serial('id').primaryKey(),
  lotId: integer('lot_id').references(() => agriculturalLots.id),
  sensorId: text('sensor_id').notNull(),
  soilMoisturePercent: integer('soil_moisture_percent').notNull(),
  soilTemperatureCelsius: integer('soil_temperature_celsius').notNull(),
  ambientTemperatureCelsius: integer('ambient_temperature_celsius').notNull(),
  humidityPercent: integer('humidity_percent').notNull(),
  phLevel: text('ph_level').notNull(),
  nitrogenLevel: integer('nitrogen_level'),
  recordedAt: timestamp('recorded_at').defaultNow(),
});

// Official laboratory certifications with Keccak-256 and IPFS
export const officialDocuments = pgTable('official_documents', {
  id: serial('id').primaryKey(),
  lotId: integer('lot_id').references(() => agriculturalLots.id),
  documentCode: text('document_code').notNull().unique(),
  title: text('title').notNull(),
  laboratory: text('laboratory').notNull(),
  documentType: text('document_type').notNull(),
  date: text('date').notNull(),
  ipfsCid: text('ipfs_cid').notNull(),
  keccakHash: text('keccak_hash').notNull(),
  blockchainTx: text('blockchain_tx').notNull(),
  blockNumber: text('block_number').notNull(),
  metricsJson: text('metrics_json'),
  status: text('status').notNull().default('verified'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Governance proposals and milestone fund releases
export const governanceProposals = pgTable('governance_proposals', {
  id: serial('id').primaryKey(),
  lotId: integer('lot_id').references(() => agriculturalLots.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  milestoneIndex: integer('milestone_index').notNull(),
  requestedAmount: integer('requested_amount').notNull(),
  votesFor: integer('votes_for').notNull().default(0),
  votesAgainst: integer('votes_against').notNull().default(0),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// User token purchases / investments
export const investments = pgTable('investments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  lotId: integer('lot_id')
    .references(() => agriculturalLots.id)
    .notNull(),
  tokensPurchased: integer('tokens_purchased').notNull(),
  amountUsd: integer('amount_usd').notNull(),
  txHash: text('tx_hash'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  investments: many(investments),
}));

export const agriculturalLotsRelations = relations(agriculturalLots, ({ many }) => ({
  telemetry: many(iotTelemetry),
  documents: many(officialDocuments),
  proposals: many(governanceProposals),
  investments: many(investments),
}));

export const investmentsRelations = relations(investments, ({ one }) => ({
  user: one(users, {
    fields: [investments.userId],
    references: [users.id],
  }),
  lot: one(agriculturalLots, {
    fields: [investments.lotId],
    references: [agriculturalLots.id],
  }),
}));
