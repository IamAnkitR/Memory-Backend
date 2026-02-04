-- CreateEnum
CREATE TYPE "AudioStatus" AS ENUM ('UPLOADED', 'TRANSCRIBING', 'TRANSCRIBED', 'FAILED');

-- CreateTable
CREATE TABLE "Audio_Records" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "status" "AudioStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audio_Records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Audio_Records" ADD CONSTRAINT "Audio_Records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
