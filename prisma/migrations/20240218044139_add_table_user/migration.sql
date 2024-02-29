-- Create extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "user_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "dob" VARCHAR(50) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

