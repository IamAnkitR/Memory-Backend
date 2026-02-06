/*
  Warnings:

  - A unique constraint covering the columns `[user_id,user_agent]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "VoiceTone" AS ENUM ('neutral', 'calm', 'energetic');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'hi');

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "voiceEnabled" BOOLEAN NOT NULL DEFAULT true,
    "voiceSpeed" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "voiceTone" "VoiceTone" NOT NULL DEFAULT 'neutral',
    "autoTranscription" BOOLEAN NOT NULL DEFAULT true,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "UserSettings_userId_idx" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE INDEX "Session_refresh_token_hash_idx" ON "Session"("refresh_token_hash");

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_user_agent_key" ON "Session"("user_id", "user_agent");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
