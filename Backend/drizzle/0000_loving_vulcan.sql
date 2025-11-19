CREATE TABLE "availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentor_id" integer NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"is_booked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentee_id" integer NOT NULL,
	"mentor_id" integer NOT NULL,
	"availability_id" integer,
	"status" varchar(15) NOT NULL,
	"session_price" numeric(10, 2) NOT NULL,
	"expires_at" timestamp with time zone,
	"google_calendar_event_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_availability_id_unique" UNIQUE("availability_id"),
	CONSTRAINT "status" CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
	CONSTRAINT "session_price" CHECK (session_price >= 0)
);
--> statement-breakpoint
CREATE TABLE "mentor_expertise" (
	"mentor_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mentor_expertise_mentor_id_tag_id_pk" PRIMARY KEY("mentor_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "mentor_profiles" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"bio" text,
	"job_title" varchar(255),
	"hourly_rate" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"average_rating" numeric(3, 2) DEFAULT '0.00' NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hourly_rate" CHECK (hourly_rate >= 0),
	CONSTRAINT "average_rating" CHECK (average_rating >= 0 AND average_rating <= 5)
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"mentee_id" integer NOT NULL,
	"mentor_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_booking_id_unique" UNIQUE("booking_id"),
	CONSTRAINT "rating" CHECK (rating >= 1 AND rating <= 5)
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"momo_request_id" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"status" varchar(15) NOT NULL,
	"webhook_response" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_momo_request_id_unique" UNIQUE("momo_request_id"),
	CONSTRAINT "status" CHECK (status IN ('pending', 'successful', 'failed')),
	CONSTRAINT "amount" CHECK (amount >= 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text,
	"avatar_url" text,
	"role" varchar(10) NOT NULL,
	"auth_provider" varchar(10) NOT NULL,
	"provider_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_provider_id_unique" UNIQUE("provider_id"),
	CONSTRAINT "role" CHECK (role IN ('mentee', 'mentor')),
	CONSTRAINT "auth_provider" CHECK (auth_provider IN ('email', 'google', 'linkedin'))
);
--> statement-breakpoint
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_mentor_id_mentor_profiles_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentor_profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_mentee_id_users_id_fk" FOREIGN KEY ("mentee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_mentor_id_users_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_availability_id_availabilities_id_fk" FOREIGN KEY ("availability_id") REFERENCES "public"."availabilities"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_expertise" ADD CONSTRAINT "mentor_expertise_mentor_id_mentor_profiles_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentor_profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_expertise" ADD CONSTRAINT "mentor_expertise_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_profiles" ADD CONSTRAINT "mentor_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mentee_id_users_id_fk" FOREIGN KEY ("mentee_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mentor_id_users_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;