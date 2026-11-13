-- CreateTable
CREATE TABLE "event_submissions" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "organizerName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "expectedAudience" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "socialLinks" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_applications" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "studyYear" TEXT,
    "role" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" TEXT,
    "motivation" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "portfolioUrl" TEXT,
    "resumeUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_submissions_referenceId_key" ON "event_submissions"("referenceId");

-- CreateIndex
CREATE INDEX "event_submissions_status_idx" ON "event_submissions"("status");

-- CreateIndex
CREATE INDEX "event_submissions_createdAt_idx" ON "event_submissions"("createdAt");

-- CreateIndex
CREATE INDEX "event_submissions_email_idx" ON "event_submissions"("email");

-- CreateIndex
CREATE INDEX "event_submissions_referenceId_idx" ON "event_submissions"("referenceId");

-- CreateIndex
CREATE UNIQUE INDEX "work_applications_referenceId_key" ON "work_applications"("referenceId");

-- CreateIndex
CREATE INDEX "work_applications_status_idx" ON "work_applications"("status");

-- CreateIndex
CREATE INDEX "work_applications_createdAt_idx" ON "work_applications"("createdAt");

-- CreateIndex
CREATE INDEX "work_applications_email_idx" ON "work_applications"("email");

-- CreateIndex
CREATE INDEX "work_applications_referenceId_idx" ON "work_applications"("referenceId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "feedback_status_idx" ON "feedback"("status");

-- CreateIndex
CREATE INDEX "feedback_createdAt_idx" ON "feedback"("createdAt");

-- CreateIndex
CREATE INDEX "feedback_email_idx" ON "feedback"("email");
