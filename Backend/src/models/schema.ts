import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  unique,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm"; // Imported `sql`

// === AUDIT TIMESTAMPS ===
// Re-usable timestamp columns for all tables, as you requested.
export const auditTimestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

// === TABLE 1: users ===
// Stores core identity for ALL users.
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash"), // Nullable for OAuth users
    avatarUrl: text("avatar_url"),
    role: varchar("role", { length: 10 }).notNull(), // 'mentee' or 'mentor'
    authProvider: varchar("auth_provider", { length: 10 }).notNull(), // 'email', 'google', 'linkedin'
    providerId: text("provider_id").unique(), // User's ID from the OAuth provider
    ...auditTimestamps,
  },
  (table) => ({
    // FIXED: Wrapped check strings in sql``
    ckRole: check("role", sql`role IN ('mentee', 'mentor')`),
    ckAuthProvider: check(
      "auth_provider",
      sql`auth_provider IN ('email', 'google', 'linkedin')`
    ),
  })
);

// === TABLE 2: mentor_profiles ===
// One-to-one extension of the users table for mentor-specific data.
export const mentorProfiles = pgTable(
  "mentor_profiles",
  {
    userId: integer("user_id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }), // If user is deleted, delete their profile
    bio: text("bio"),
    jobTitle: varchar("job_title", { length: 255 }),
    hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 })
      .notNull()
      .default("0.00"),
    // Denormalized for performance. Updated by a trigger/service when a new review is added.
    averageRating: decimal("average_rating", { precision: 3, scale: 2 })
      .notNull()
      .default("0.00"),
    totalReviews: integer("total_reviews").notNull().default(0),
    ...auditTimestamps,
  },
  (table) => ({
    // FIXED: Wrapped check strings in sql``
    ckHourlyRate: check("hourly_rate", sql`hourly_rate >= 0`),
    ckAverageRating: check(
      "average_rating",
      sql`average_rating >= 0 AND average_rating <= 5`
    ),
  })
);

// === TABLE 3: tags ===
// NEW: Your suggested scalable table for expertise tags (e.g., "Data Science", "AI").
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  ...auditTimestamps,
});

// === TABLE 4: mentor_expertise ===
// NEW: Your suggested Many-to-Many join table.
export const mentorExpertise = pgTable(
  "mentor_expertise",
  {
    mentorId: integer("mentor_id")
      .notNull()
      .references(() => mentorProfiles.userId, { onDelete: "cascade" }), // If profile deleted, link is deleted
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }), // If tag is deleted, link is deleted
    ...auditTimestamps,
  },
  (table) => ({
    // Composite Primary Key ensures a mentor can't have the same tag twice
    pk: primaryKey({ columns: [table.mentorId, table.tagId] }),
  })
);

// === TABLE 5: availabilities ===
// Stores mentor's open time slots.
export const availabilities = pgTable("availabilities", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id")
    .notNull()
    .references(() => mentorProfiles.userId, { onDelete: "cascade" }), // If profile deleted, availabilities are deleted
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  isBooked: boolean("is_booked").notNull().default(false),
  ...auditTimestamps,
});

// === TABLE 6: bookings ===
// The central table connecting mentees, mentors, and time slots.
export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    menteeId: integer("mentee_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }), // Deliberate: Keep booking record if mentee deleted
    mentorId: integer("mentor_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }), // Deliberate: Keep booking record if mentor deleted
    availabilityId: integer("availability_id")
      .unique() // A slot can only be booked once
      .references(() => availabilities.id, { onDelete: "set null" }), // Deliberate: Keep booking record if slot deleted
    status: varchar("status", { length: 15 }).notNull(), // 'pending', 'confirmed', 'completed', 'cancelled'
    sessionPrice: decimal("session_price", {
      precision: 10,
      scale: 2,
    }).notNull(), // Price at time of booking
    expiresAt: timestamp("expires_at", { withTimezone: true }), // Payment hold expiration
    googleCalendarEventId: text("google_calendar_event_id"),
    ...auditTimestamps,
  },
  (table) => ({
    // FIXED: Wrapped check strings in sql``
    ckStatus: check(
      "status",
      sql`status IN ('pending', 'confirmed', 'completed', 'cancelled')`
    ),
    ckSessionPrice: check("session_price", sql`session_price >= 0`),
  })
);

// === TABLE 7: transactions ===
// Logs all payment attempts with Momo.
export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    bookingId: integer("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }), // If booking is deleted, delete transaction
    momoRequestId: text("momo_request_id").notNull().unique(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    status: varchar("status", { length: 15 }).notNull(), // 'pending', 'successful', 'failed'
    webhookResponse: text("webhook_response"), // Storing as raw text (or JSONB if you prefer)
    ...auditTimestamps,
  },
  (table) => ({
    // FIXED: Wrapped check strings in sql``
    ckStatus: check(
      "status",
      sql`status IN ('pending', 'successful', 'failed')`
    ),
    ckAmount: check("amount", sql`amount >= 0`),
  })
);

// === TABLE 8: reviews ===
// Stores feedback from mentees for completed bookings.
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    bookingId: integer("booking_id")
      .notNull()
      .unique() // A booking gets only one review
      .references(() => bookings.id, { onDelete: "cascade" }), // If booking is deleted, delete review
    menteeId: integer("mentee_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // If mentee is deleted, delete their review
    mentorId: integer("mentor_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }), // Keep review even if mentor is deleted
    rating: integer("rating").notNull(),
    comment: text("comment"),
    ...auditTimestamps,
  },
  (table) => ({
    // FIXED: Wrapped check strings in sql``
    ckRating: check("rating", sql`rating >= 1 AND rating <= 5`),
  })
);

// === RELATIONS (for Drizzle ORM) ===
// FIXED: Added the complete relations block back in.
// This defines how Drizzle connects the tables for easy querying.

export const usersRelations = relations(users, ({ one, many }) => ({
  mentorProfile: one(mentorProfiles, {
    fields: [users.id],
    references: [mentorProfiles.userId],
  }),
  menteeBookings: many(bookings, { relationName: "menteeBookings" }),
  mentorBookings: many(bookings, { relationName: "mentorBookings" }),
  menteeReviews: many(reviews, { relationName: "menteeReviews" }),
  mentorReviews: many(reviews, { relationName: "mentorReviews" }),
}));

export const mentorProfilesRelations = relations(
  mentorProfiles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [mentorProfiles.userId],
      references: [users.id],
    }),
    availabilities: many(availabilities),
    expertise: many(mentorExpertise),
  })
);

export const tagsRelations = relations(tags, ({ many }) => ({
  mentors: many(mentorExpertise),
}));

export const mentorExpertiseRelations = relations(
  mentorExpertise,
  ({ one }) => ({
    profile: one(mentorProfiles, {
      fields: [mentorExpertise.mentorId],
      references: [mentorProfiles.userId],
    }),
    tag: one(tags, {
      fields: [mentorExpertise.tagId],
      references: [tags.id],
    }),
  })
);

export const availabilitiesRelations = relations(availabilities, ({ one }) => ({
  mentor: one(mentorProfiles, {
    fields: [availabilities.mentorId],
    references: [mentorProfiles.userId],
  }),
  booking: one(bookings, {
    fields: [availabilities.id],
    references: [bookings.availabilityId],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  mentee: one(users, {
    fields: [bookings.menteeId],
    references: [users.id],
    relationName: "menteeBookings",
  }),
  mentor: one(users, {
    fields: [bookings.mentorId],
    references: [users.id],
    relationName: "mentorBookings",
  }),
  availability: one(availabilities, {
    fields: [bookings.availabilityId],
    references: [availabilities.id],
  }),
  transaction: one(transactions, {
    fields: [bookings.id],
    references: [transactions.bookingId],
  }),
  review: one(reviews, {
    fields: [bookings.id],
    references: [reviews.bookingId],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  booking: one(bookings, {
    fields: [transactions.bookingId],
    references: [bookings.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),
  mentee: one(users, {
    fields: [reviews.menteeId],
    references: [users.id],
    relationName: "menteeReviews",
  }),
  mentor: one(users, {
    fields: [reviews.mentorId],
    references: [users.id],
    relationName: "mentorReviews",
  }),
}));
