```sql
CREATE TABLE event_submissions (
    id UUID PRIMARY KEY,
    reference_id VARCHAR(255) UNIQUE NOT NULL,
    organizer_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    expected_audience VARCHAR(255) NOT NULL,
    requirements TEXT NOT NULL,
    social_links TEXT,
    status VARCHAR(255) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_event_status ON event_submissions(status);
CREATE INDEX idx_event_created_at ON event_submissions(created_at);
CREATE INDEX idx_event_email ON event_submissions(email);
CREATE INDEX idx_event_reference_id ON event_submissions(reference_id);


CREATE TABLE work_applications (
    id UUID PRIMARY KEY,
    reference_id VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    study_year VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    application_type VARCHAR(255) NOT NULL,
    skills TEXT NOT NULL,
    experience TEXT,
    motivation TEXT NOT NULL,
    linkedin_url TEXT,
    portfolio_url TEXT,
    resume_url TEXT,
    status VARCHAR(255) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_application_status ON work_applications(status);
CREATE INDEX idx_application_created_at ON work_applications(created_at);
CREATE INDEX idx_application_email ON work_applications(email);
CREATE INDEX idx_application_reference_id ON work_applications(reference_id);


CREATE TABLE admins (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
);
```
