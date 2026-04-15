# Dodokpo Assessment Platform -- Backend API Contracts

Complete reference of all API endpoints across the 10 backend services.


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

