# Dodokpo Assessment Platform -- Backend API Contracts

Complete reference of all API endpoints across the 10 backend services.

---

## Table of Contents

1. [API Gateway](#1-api-gateway)
2. [Authentication Service](#2-authentication-service)
3. [User Management Service](#3-user-management-service)
4. [Test Creation Service](#4-test-creation-service)
5. [Test Execution Service](#5-test-execution-service)
6. [Test Cases Management Service](#6-test-cases-management-service)
7. [Reporting Service](#7-reporting-service)
8. [AI Service](#8-ai-service)
9. [Notification Service](#9-notification-service)
10. [External API Integration Service](#10-external-api-integration-service)

---

## 1. API Gateway

**Port:** 8001
**Base prefix:** `/api/v1/`

### Direct Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/` | Health check | No |
| GET | `/api/v1/public/feature-flags` | Public feature flags (rate limited 10 req / 30s) | No |
| GET | `/api/v1/feature-flags` | Authenticated feature flags | Yes |
| GET | `/api/v1/flag-admin/flags/sse` | SSE stream of feature flag changes | Yes (Admin) |
| GET | `/api/v1/metrics` | Prometheus metrics endpoint | No |

### Proxy Routes

All proxy routes strip the service prefix and forward to the downstream service. Circuit breakers and retry policies are applied per route.

| Method | Path Pattern | Downstream Service | Auth Required |
|--------|-------------|-------------------|---------------|
| ALL | `/api/v1/flag-admin/**` | Feature Flags Service | Yes (adminOnly) |
| ALL | `/api/v1/auth-service/**` | Authentication Service (circuit breaker enabled) | Varies |
| ALL | `/api/v1/user-service/**` | User Management Service | Varies |
| ALL | `/api/v1/test-service/**` | Test Creation Service | Varies |
| ALL | `/api/v1/test-taking/**` | Test Execution Service | Varies |
| ALL | `/api/v1/notification-service/**` | Notification Service | Varies |
| ALL | `/api/v1/report-service/**` | Reporting Service | Varies |
| ALL | `/api/v1/api-integration-service/**` | External API Integration Service | Varies |

---

## 2. Authentication Service

**Prefix:** `/auth`

### Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/auth/login` | Authenticate user with email and password | No |
| POST | `/auth/create-password` | Create password for a new user account | No (token-based) |
| POST | `/auth/accept-invite` | Accept an organization invite and set password | No (token-based) |
| POST | `/auth/:orgId/:id/reinvite` | Resend invitation to a user | Yes |
| POST | `/auth/request-reset-password` | Request a password reset email | No |
| POST | `/auth/reset-password` | Reset password using a valid reset token | No (token-based) |
| POST | `/auth/change-password` | Change password for the currently authenticated user | Yes |
| GET | `/auth/verify/reset-password-link` | Verify that a password reset link/token is still valid | No |
| GET | `/auth/verify/create-password-link` | Verify that a create-password link/token is still valid | No |
| POST | `/auth/logout` | Log out the current user and invalidate tokens | Yes |
| GET | `/auth/verify/user` | Verify the current user's authentication status | Yes |

---

## 3. User Management Service

**Prefix:** `/api/v1`

### Users

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/users` | List all users in an organization | Yes |
| POST | `/api/v1/:orgId/users` | Create a new user in an organization | Yes |
| PUT | `/api/v1/:orgId/users/:id` | Update a user by ID | Yes |
| DELETE | `/api/v1/:orgId/users/:id` | Soft-delete a user by ID | Yes |
| GET | `/api/v1/:orgId/users/:id` | Get a single user by ID | Yes |
| GET | `/api/v1/:orgId/users/profile` | Get the authenticated user's profile | Yes |
| PUT | `/api/v1/:orgId/users/profile` | Update the authenticated user's profile | Yes |

### Roles

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/roles` | List all roles in an organization | Yes |
| POST | `/api/v1/:orgId/roles` | Create a new custom role | Yes |
| PATCH | `/api/v1/:orgId/roles/:id` | Update a role by ID | Yes |
| DELETE | `/api/v1/:orgId/roles/:id` | Delete a role by ID | Yes |
| GET | `/api/v1/:orgId/roles/permissions` | List all available permissions | Yes |

### Organizations (Admin)

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/admin/organizations` | Create a new organization | Yes (Admin) |
| GET | `/api/v1/admin/organizations` | List all organizations | Yes (Admin) |
| GET | `/api/v1/admin/organizations/:id` | Get organization details | Yes (Admin) |
| PATCH | `/api/v1/admin/organizations/:id` | Update an organization | Yes (Admin) |
| DELETE | `/api/v1/admin/organizations/:id` | Delete an organization | Yes (Admin) |
| GET | `/api/v1/admin/organizations/:id/statistics` | Get organization statistics | Yes (Admin) |

### Applications

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/applications` | Submit a new application (sign-up request) | No |
| GET | `/api/v1/applications` | List all pending applications | Yes (Admin) |
| PUT | `/api/v1/applications/:id/reject` | Reject an application | Yes (Admin) |

### Service / Seed

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/seed/roles` | Seed default system roles | Internal |
| POST | `/api/v1/seed/permissions` | Seed default permissions | Internal |

---

## 4. Test Creation Service

**Prefix:** `/api/v1`

### Tests

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/tests` | List all tests in an organization | Yes |
| POST | `/api/v1/:orgId/tests` | Create a new test | Yes |
| GET | `/api/v1/:orgId/tests/:id` | Get a test by ID | Yes |
| PATCH | `/api/v1/:orgId/tests/:id` | Update a test by ID | Yes |
| DELETE | `/api/v1/:orgId/tests/:id` | Delete a test by ID | Yes |
| POST | `/api/v1/:orgId/tests/comprehension` | Create a comprehension-based test | Yes |
| POST | `/api/v1/:orgId/tests/auto-generate` | Auto-generate a test using AI | Yes |

### Questions

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/questions` | List all questions in an organization | Yes |
| POST | `/api/v1/:orgId/questions` | Create a new question | Yes |
| GET | `/api/v1/:orgId/questions/:id` | Get a question by ID | Yes |
| PATCH | `/api/v1/:orgId/questions/:id` | Update a question by ID | Yes |
| DELETE | `/api/v1/:orgId/questions/:id` | Delete a question by ID | Yes |
| POST | `/api/v1/:orgId/questions/bulk-upload` | Bulk upload questions from file | Yes |
| GET | `/api/v1/:orgId/questions/global` | List global (shared) questions | Yes |
| POST | `/api/v1/:orgId/questions/global` | Add a question to the global pool | Yes |

### Assessments

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/assessments` | List all assessments in an organization | Yes |
| POST | `/api/v1/:orgId/assessments` | Create a new assessment | Yes |
| GET | `/api/v1/:orgId/assessments/:id` | Get an assessment by ID | Yes |
| PATCH | `/api/v1/:orgId/assessments/:id` | Update an assessment by ID | Yes |
| DELETE | `/api/v1/:orgId/assessments/:id` | Delete an assessment by ID | Yes |
| POST | `/api/v1/:orgId/assessments/:id/dispatch` | Dispatch assessment invitations to candidates | Yes |
| POST | `/api/v1/:orgId/assessments/:id/generate-link` | Generate a public assessment link | Yes |
| PATCH | `/api/v1/:orgId/assessments/:id/tags` | Update tags on an assessment | Yes |
| PATCH | `/api/v1/:orgId/assessments/:id/archive` | Archive an assessment | Yes |

### Domains

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/domains` | List all domains | Yes |
| POST | `/api/v1/:orgId/domains` | Create a new domain | Yes |
| GET | `/api/v1/:orgId/domains/:id` | Get a domain by ID | Yes |
| PATCH | `/api/v1/:orgId/domains/:id` | Update a domain by ID | Yes |
| DELETE | `/api/v1/:orgId/domains/:id` | Delete a domain by ID | Yes |
| GET | `/api/v1/:orgId/domains/:id/categories` | List categories under a domain | Yes |
| POST | `/api/v1/:orgId/domains/:id/categories` | Create a category under a domain | Yes |

### Skills

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/skills` | List all skills | Yes |
| POST | `/api/v1/:orgId/skills` | Create a new skill | Yes |
| GET | `/api/v1/:orgId/skills/:id` | Get a skill by ID | Yes |
| PUT | `/api/v1/:orgId/skills/:id` | Update a skill by ID | Yes |
| DELETE | `/api/v1/:orgId/skills/:id` | Delete a skill by ID | Yes |
| GET | `/api/v1/:orgId/skills/:id/levels` | List levels for a skill | Yes |
| POST | `/api/v1/:orgId/skills/:id/levels` | Create a skill level | Yes |
| PUT | `/api/v1/:orgId/skills/:id/levels/:levelId` | Update a skill level | Yes |
| POST | `/api/v1/:orgId/skills/:id/assessments` | Assign skill to assessments | Yes |
| POST | `/api/v1/:orgId/skills/bulk` | Bulk create skills | Yes |
| POST | `/api/v1/:orgId/skills/mapping` | Map skills to tests/questions | Yes |

### Organization Config

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/config` | Get organization configuration | Yes |
| PUT | `/api/v1/:orgId/config` | Update organization configuration | Yes |

### Admin Statistics

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/admin/assessment-statistics` | Get assessment statistics | Yes (Admin) |
| GET | `/api/v1/:orgId/admin/assessment-graphs` | Get assessment graph data | Yes (Admin) |

### Bulk Upload

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/:orgId/bulk-upload/progress` | SSE stream of bulk upload progress | Yes |
| GET | `/api/v1/:orgId/bulk-upload/status` | Get current bulk upload status | Yes |
| GET | `/api/v1/:orgId/bulk-upload/errors` | Get bulk upload error details | Yes |

---

## 5. Test Execution Service

**Prefix:** `/api/v1`

### Assessment Taking

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/assessment-in-progress` | Start or resume an assessment session | Yes (Candidate) |
| POST | `/api/v1/submit` | Submit a single answer | Yes (Candidate) |
| POST | `/api/v1/submit-test` | Submit a completed test within an assessment | Yes (Candidate) |
| POST | `/api/v1/draft-questions` | Save draft answers for questions | Yes (Candidate) |
| POST | `/api/v1/question/flag` | Flag a question for review | Yes (Candidate) |
| POST | `/api/v1/question/unflag` | Remove flag from a question | Yes (Candidate) |
| POST | `/api/v1/presigned-url` | Get a presigned S3 URL for file upload | Yes (Candidate) |

### Results

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/assessment-result` | Get assessment results for a candidate | Yes |
| POST | `/api/v1/capture-shots` | Upload captured proctoring screenshots | Yes (Candidate) |
| GET | `/api/v1/screen-shots` | Retrieve proctoring screenshots for a session | Yes |
| GET | `/api/v1/results/export` | Export results as downloadable file | Yes |

### Analytics

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/question-analytics` | Get analytics for questions | Yes |
| POST | `/api/v1/question-analytics` | Submit question analytics data | Yes |
| GET | `/api/v1/ai-analytics` | Get AI-generated analytics | Yes |
| GET | `/api/v1/ai-insights/stream` | SSE stream of AI-generated insights | Yes |

### Code Execution

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/run-test-case` | Execute a single test case against submitted code | Yes (Candidate) |
| POST | `/api/v1/run-multiple-test-cases` | Execute multiple test cases against submitted code | Yes (Candidate) |

### Retake

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/retake/check-eligibility` | Check if a candidate is eligible for retake | Yes |
| POST | `/api/v1/retake/generate-link` | Generate a retake link for a candidate | Yes |
| GET | `/api/v1/retake/history` | Get retake history for a candidate | Yes |

### API Key Routes (External Integration)

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/candidate-assessments` | List candidate assessments (API key auth) | Yes (API Key) |
| GET | `/api/v1/candidate-results` | Get candidate results (API key auth) | Yes (API Key) |

---

## 6. Test Cases Management Service

### Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/test-cases` | Create a new test case | Yes |
| POST | `/test-cases/batch` | Create multiple test cases in batch | Yes |
| GET | `/test-cases/:id` | Get a test case by ID | Yes |
| PUT | `/test-cases/:id` | Update a test case by ID | Yes |
| DELETE | `/test-cases/:id` | Delete a test case by ID | Yes |
| GET | `/questions/:id/test-cases` | List all test cases for a question | Yes |
| POST | `/update/questions/:id/test-cases` | Update test cases associated with a question | Yes |
| POST | `/questions/:id/test-cases/:id/validate` | Validate a test case against expected output | Yes |

---

## 7. Reporting Service

**Prefix:** `/organizations/:orgId`

### Organization-Level Reports

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/organizations/:orgId/basic-metrics/general-details` | General organization metrics overview | Yes |
| GET | `/organizations/:orgId/basic-metrics/assessment-details` | Aggregated assessment metrics | Yes |
| GET | `/organizations/:orgId/basic-metrics/candidate-metrics` | Candidate performance metrics | Yes |
| GET | `/organizations/:orgId/basic-metrics/comparative-analysis` | Comparative analysis across assessments | Yes |
| GET | `/organizations/:orgId/basic-metrics/feedbacks` | Collected feedback summaries | Yes |
| GET | `/organizations/:orgId/basic-metrics/all-details` | Combined report of all basic metrics | Yes |

### Candidate-Level Reports

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/organizations/:orgId/candidate/:id/assessment-results` | Get all assessment results for a candidate | Yes |
| GET | `/organizations/:orgId/candidates-metrics` | Aggregated metrics across candidates | Yes |
| GET | `/organizations/:orgId/candidates-results` | List all candidate results | Yes |

### Question Reports

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/organizations/:orgId/question/:id` | Get question-level report including flags | Yes |
| GET | `/organizations/:orgId/question-analytics` | Analytics across all questions | Yes |

### AI and Advanced Analytics

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/organizations/:orgId/ai-analytics` | AI-generated analytics for the organization | Yes |

### Bulk and Export

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/organizations/:orgId/bulk-results` | Get bulk results for an assessment | Yes |
| GET | `/organizations/:orgId/candidate-export` | Export candidate data as file | Yes |
| GET | `/organizations/:orgId/assessment-counts` | Get assessment participation counts | Yes |

---

## 8. AI Service

**Prefix:** `/api/v1`

### Essay and Code Evaluation

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/assessment/mark-essay` | Grade an essay-type answer using AI | Yes |
| POST | `/api/v1/assessment/generate-reference` | Generate a reference answer for a question | Yes |
| POST | `/api/v1/assessment/review-code` | Review submitted code for quality and correctness | Yes |
| POST | `/api/v1/assessment/generate-boilerplate` | Generate boilerplate/starter code for a question | Yes |

### Test and Question Generation

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/assessment/generate-tests` | Generate test content using AI | Yes |
| POST | `/api/v1/assessment/generate-question` | Generate a single question (async, returns 202) | Yes |
| POST | `/api/v1/assessment/generate-question-comprehensive` | Generate a comprehensive question set (async, returns 202) | Yes |

### Analysis

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/assessment/analyze-test` | Analyze test quality and difficulty distribution | Yes |
| POST | `/api/v1/assessment/analyze-questions` | Analyze a set of questions for quality metrics | Yes |
| POST | `/api/v1/assessment/analyze-candidate-performance` | Analyze candidate performance with AI insights | Yes |

### Job Status

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/jobs/:jobId` | Poll the status/result of an async AI job | Yes |

### Health

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/health` | Service health check | No |
| GET | `/api/v1/health/provider` | AI provider (LLM) connectivity health | No |

---

## 9. Notification Service

**Prefix:** `/api/v1/notification`

### Listing and Streaming

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/notification/` | List all notifications for the current user | Yes |
| GET | `/api/v1/notification/updates` | Get unread notification count and summaries | Yes |
| GET | `/api/v1/notification/user-profile` | Get notification preferences for the current user | Yes |
| GET | `/api/v1/notification/stream/:token` | SSE stream of real-time notifications | Yes (Token) |

### Bulk Operations

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| PATCH | `/api/v1/notification/bulk-mark-read` | Mark multiple notifications as read | Yes |
| PATCH | `/api/v1/notification/bulk-mark-unread` | Mark multiple notifications as unread | Yes |
| DELETE | `/api/v1/notification/bulk-delete` | Delete multiple notifications | Yes |

### Single Notification

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/v1/notification/:notificationId` | Get a single notification by ID | Yes |
| PATCH | `/api/v1/notification/:notificationId` | Update a notification (e.g., mark read) | Yes |
| DELETE | `/api/v1/notification/:notificationId` | Delete a notification | Yes |

### Settings

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| PATCH | `/api/v1/notification/settings/:settingId` | Update a notification setting | Yes |

---

## 10. External API Integration Service

**Prefix:** `/api/v1/account`

### Account Management

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/account/register` | Register a new external API account | Yes |
| GET | `/api/v1/account/verify-key` | Verify an API key is valid | Yes (API Key) |
| GET | `/api/v1/account/:orgId` | Get account details for an organization | Yes |
| PATCH | `/api/v1/account/:orgId/deactivate` | Deactivate an API account | Yes |

### API Key Management

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/api/v1/account/:orgId/apikey/generate` | Generate a new API key | Yes |
| PATCH | `/api/v1/account/:orgId/apikey/deactivate` | Deactivate an existing API key | Yes |
| DELETE | `/api/v1/account/:orgId/:keyId` | Delete an API key permanently | Yes |
| GET | `/api/v1/account/:orgId/keys` | List all API keys for an organization | Yes |
