# Database Normalization — Prera Application

## 1. Introduction

Normalization is the process of organizing data in a relational database to reduce redundancy and prevent insertion, update, and deletion anomalies.

The Prera application uses PostgreSQL with Prisma ORM. Its database contains three main models:

- EventSubmission
- WorkApplication
- Admin

This document explains the normalization of these models up to Third Normal Form (3NF).

## 2. Database Models

### 2.1 EventSubmission

Stores information about event submissions made by organizers.

**Primary Key:** `id`

**Unique Attribute:** `referenceId`

Attributes:
- id
- referenceId
- organizerName
- contactPerson
- email
- phone
- organization
- eventName
- category
- description
- eventDate
- location
- expectedAudience
- requirements
- socialLinks
- status
- createdAt
- updatedAt

### 2.2 WorkApplication

Stores information about people applying for work opportunities.

**Primary Key:** `id`

**Unique Attribute:** `referenceId`

Attributes:
- id
- referenceId
- fullName
- email
- phone
- institution
- studyYear
- role
- applicationType
- skills
- experience
- motivation
- linkedinUrl
- portfolioUrl
- resumeUrl
- status
- createdAt
- updatedAt

### 2.3 Admin

Stores administrator account information.

**Primary Key:** `id`

**Unique Attribute:** `email`

Attributes:
- id
- name
- email
- password
- createdAt
- updatedAt

## 3. First Normal Form (1NF)

A relation is in First Normal Form when:
- Each attribute contains a single value.
- There are no repeating groups.
- Each row can be uniquely identified.

The Prera database models use individual columns for attributes such as organizer name, email, event name, application role, and status.

Each record is uniquely identified by its primary key `id`.

Therefore, the models are designed to satisfy 1NF, provided that fields such as `skills`, `socialLinks`, and `requirements` are stored as single values rather than repeating relational groups.

## 4. Second Normal Form (2NF)

A relation is in Second Normal Form when:
- It is in 1NF.
- Every non-prime attribute is fully dependent on the entire candidate key.
- No partial dependency exists.

In the Prera schema, each model uses a single-attribute primary key:

- EventSubmission: `id`
- WorkApplication: `id`
- Admin: `id`

Since the primary keys are not composite, partial dependencies cannot occur with respect to these primary keys.

Hence, the models satisfy the primary-key based requirement of 2NF.

## 5. Third Normal Form (3NF)

A relation is in Third Normal Form when:
- It is in 2NF.
- Non-key attributes do not depend transitively on the primary key through another non-key attribute.

### EventSubmission

Functional dependency:

`id → all other attributes`

Additionally:

`referenceId → all other attributes`

Because `referenceId` is unique, it acts as an alternate candidate key.

### WorkApplication

Functional dependency:

`id → all other attributes`

Additionally:

`referenceId → all other attributes`

Because `referenceId` is unique, it acts as an alternate candidate key.

### Admin

Functional dependency:

`id → name, email, password, createdAt, updatedAt`

Additionally:

`email → name, password, createdAt, updatedAt`

Because `email` is unique, it acts as an alternate candidate key.

No transitive dependencies are explicitly represented in the provided Prisma schema. Based on the declared attributes and keys, the models are designed to satisfy 3NF.

## 6. Functional Dependencies Summary

| Model | Candidate Key(s) | Functional Dependency |
|---|---|---|
| EventSubmission | id, referenceId | id → all attributes |
| WorkApplication | id, referenceId | id → all attributes |
| Admin | id, email | id → all attributes |

## 7. Normalization Benefits

Normalization provides the following benefits to the Prera application:

- Reduces unnecessary data redundancy.
- Maintains consistency in stored records.
- Prevents insertion, update, and deletion anomalies.
- Improves database organization.
- Simplifies database maintenance.

## 8. Conclusion

The Prera application's database consists of EventSubmission, WorkApplication, and Admin models.

Each model uses a single-column primary key and includes unique candidate keys where applicable. The schema is designed to satisfy 1NF, 2NF, and 3NF based on the declared attributes and constraints.

The normalized structure provides a reliable foundation for managing event submissions, work applications, and administrator accounts.