-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('AUDIO_UPLOAD', 'TRANSCRIPTION', 'POST_PROCESSING');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('INITIALIZED', 'PROCESSING', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "Processing_Jobs" (
    "id" TEXT NOT NULL,
    "audio_record_id" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "status" "ProcessingStatus" NOT NULL,
    "attempts" INTEGER NOT NULL,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "started_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "Processing_Jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Processing_Jobs" ADD CONSTRAINT "Processing_Jobs_audio_record_id_fkey" FOREIGN KEY ("audio_record_id") REFERENCES "Audio_Records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
