-- ============================================
-- AP CP1 - APPLICATION DATABASE QUERIES
-- PostgreSQL
-- ============================================

-- ================= READ QUERIES =================

-- R1: Fetch event submissions with optional filters, search, pagination and sorting
SELECT *
FROM event_submissions
WHERE
    (:status IS NULL OR status = :status)
    AND (:category IS NULL OR category = :category)
    AND (:start_date IS NULL OR event_date >= :start_date)
    AND (:end_date IS NULL OR event_date <= :end_date)
    AND (
        :search IS NULL OR
        reference_id ILIKE '%' || :search || '%' OR
        event_name ILIKE '%' || :search || '%' OR
        organizer_name ILIKE '%' || :search || '%' OR
        contact_person ILIKE '%' || :search || '%' OR
        email ILIKE '%' || :search || '%' OR
        organization ILIKE '%' || :search || '%' OR
        location ILIKE '%' || :search || '%'
    )
ORDER BY created_at DESC
LIMIT :limit OFFSET :offset;

-- R2: Count event submissions with optional filters
SELECT COUNT(*)
FROM event_submissions
WHERE
    (:status IS NULL OR status = :status)
    AND (:category IS NULL OR category = :category)
    AND (:start_date IS NULL OR event_date >= :start_date)
    AND (:end_date IS NULL OR event_date <= :end_date)
    AND (
        :search IS NULL OR
        reference_id ILIKE '%' || :search || '%' OR
        event_name ILIKE '%' || :search || '%' OR
        organizer_name ILIKE '%' || :search || '%' OR
        contact_person ILIKE '%' || :search || '%' OR
        email ILIKE '%' || :search || '%' OR
        organization ILIKE '%' || :search || '%' OR
        location ILIKE '%' || :search || '%'
    );

-- R3: Find an event by ID or reference ID
SELECT *
FROM event_submissions
WHERE id = :id OR reference_id = :reference_id
LIMIT 1;

-- R4: Find admin by email during login
SELECT *
FROM admins
WHERE email = :email
LIMIT 1;

-- R5: Fetch work applications with optional filters, search, pagination and sorting
SELECT *
FROM work_applications
WHERE
    (:status IS NULL OR status = :status)
    AND (:role IS NULL OR role = :role)
    AND (:application_type IS NULL OR application_type = :application_type)
    AND (:start_date IS NULL OR created_at >= :start_date)
    AND (:end_date IS NULL OR created_at <= :end_date)
    AND (
        :search IS NULL OR
        reference_id ILIKE '%' || :search || '%' OR
        full_name ILIKE '%' || :search || '%' OR
        email ILIKE '%' || :search || '%' OR
        phone ILIKE '%' || :search || '%' OR
        institution ILIKE '%' || :search || '%' OR
        role ILIKE '%' || :search || '%' OR
        skills ILIKE '%' || :search || '%'
    )
ORDER BY created_at DESC
LIMIT :limit OFFSET :offset;

-- R6: Count work applications with optional filters
SELECT COUNT(*)
FROM work_applications
WHERE
    (:status IS NULL OR status = :status)
    AND (:role IS NULL OR role = :role)
    AND (:application_type IS NULL OR application_type = :application_type)
    AND (:start_date IS NULL OR created_at >= :start_date)
    AND (:end_date IS NULL OR created_at <= :end_date)
    AND (
        :search IS NULL OR
        reference_id ILIKE '%' || :search || '%' OR
        full_name ILIKE '%' || :search || '%' OR
        email ILIKE '%' || :search || '%' OR
        phone ILIKE '%' || :search || '%' OR
        institution ILIKE '%' || :search || '%' OR
        role ILIKE '%' || :search || '%' OR
        skills ILIKE '%' || :search || '%'
    );

-- R7: Find a work application by ID or reference ID
SELECT *
FROM work_applications
WHERE id = :id OR reference_id = :reference_id
LIMIT 1;

-- R8: Count total event submissions
SELECT COUNT(*) FROM event_submissions;

-- R9: Count total work applications
SELECT COUNT(*) FROM work_applications;

-- R10: Count pending event submissions
SELECT COUNT(*) FROM event_submissions WHERE status = 'Pending';

-- R11: Count pending work applications
SELECT COUNT(*) FROM work_applications WHERE status = 'Pending';

-- R12: Count approved event submissions
SELECT COUNT(*) FROM event_submissions WHERE status = 'Approved';

-- R13: Count approved work applications
SELECT COUNT(*) FROM work_applications WHERE status = 'Approved';

-- R14: Count event submissions under review
SELECT COUNT(*) FROM event_submissions WHERE status = 'Under Review';

-- R15: Count work applications under review
SELECT COUNT(*) FROM work_applications WHERE status = 'Under Review';

-- R16: Count shortlisted work applications
SELECT COUNT(*) FROM work_applications WHERE status = 'Shortlisted';

-- R17: Fetch 5 recent event submissions for dashboard
SELECT id, reference_id, event_name, organizer_name, status, created_at
FROM event_submissions
ORDER BY created_at DESC
LIMIT 5;

-- R18: Fetch 5 recent work applications for dashboard
SELECT id, reference_id, full_name, role, status, created_at
FROM work_applications
ORDER BY created_at DESC
LIMIT 5;

-- R19: Find admin by ID for authentication middleware
SELECT id, name, email, created_at
FROM admins
WHERE id = :id
LIMIT 1;

-- R20: Find admin by email during seeding
SELECT *
FROM admins
WHERE email = :email
LIMIT 1;


-- ================= WRITE QUERIES =================

-- W1: Create event submission
INSERT INTO event_submissions (
    id, reference_id, organizer_name, contact_person, email, phone,
    organization, event_name, category, description, event_date,
    location, expected_audience, requirements, social_links, status,
    created_at, updated_at
)
VALUES (
    :id, :reference_id, :organizer_name, :contact_person, :email, :phone,
    :organization, :event_name, :category, :description, :event_date,
    :location, :expected_audience, :requirements, :social_links, 'Pending',
    NOW(), NOW()
);

-- W2: Update event submission status
UPDATE event_submissions
SET status = :status, updated_at = NOW()
WHERE id = :id;

-- W3: Delete event submission
DELETE FROM event_submissions
WHERE id = :id;

-- W4: Create work application
INSERT INTO work_applications (
    id, reference_id, full_name, email, phone, institution,
    study_year, role, application_type, skills, experience,
    motivation, linkedin_url, portfolio_url, resume_url,
    status, created_at, updated_at
)
VALUES (
    :id, :reference_id, :full_name, :email, :phone, :institution,
    :study_year, :role, :application_type, :skills, :experience,
    :motivation, :linkedin_url, :portfolio_url, :resume_url,
    'Pending', NOW(), NOW()
);

-- W5: Update work application status
UPDATE work_applications
SET status = :status, updated_at = NOW()
WHERE id = :id;

-- W6: Delete work application
DELETE FROM work_applications
WHERE id = :id;

-- W7: Update existing admin during seeding
UPDATE admins
SET name = :name, password = :password, updated_at = NOW()
WHERE email = :email;

-- W8: Create admin during seeding
INSERT INTO admins (id, name, email, password, created_at, updated_at)
VALUES (:id, :name, :email, :password, NOW(), NOW());
