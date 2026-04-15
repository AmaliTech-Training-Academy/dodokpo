---
stepsCompleted: ['step-01-requirements-inventory', 'step-02-fr-coverage-map', 'step-03-team-assignment', 'step-04-epic-definition', 'step-05-story-breakdown', 'step-06-implementation-sequence', 'step-07-dependency-map', 'step-08-integration-points']
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
workflowType: 'epics'
project_name: 'Dodokpo'
user_name: 'Thomas'
date: '2026-04-15'
status: 'complete'
teamStructure:
  framework: 'Nexus'
  teams: 2
  sprintDuration: '2 weeks'
  productOwner: 1
  backlogs: 1
---

# Epic & Story Breakdown -- Dodokpo Assessment Platform

**Author:** Thomas
**Date:** 2026-04-15
**Framework:** Nexus (2 Scrum Teams, 2-week sprints)

---

## 1. Requirements Inventory

### 1.1 Functional Requirements (72 FRs)

| ID | Description | Capability Area |
|----|-------------|-----------------|
| FR1 | Classify questions using difficulty tier + Bloom's Taxonomy | Question Bank Intelligence |
| FR2 | Continuously recalibrate difficulty tiers from assessment results | Question Bank Intelligence |
| FR3 | Compute difficulty scores from pass/fail rates, time-to-answer, score distributions | Question Bank Intelligence |
| FR4 | Test managers assign/override Bloom's Taxonomy levels per question | Question Bank Intelligence |
| FR5 | Test managers view/override system-assigned difficulty tiers (tracked in version history) | Question Bank Intelligence |
| FR6 | Flag questions with insufficient performance data for calibration review | Question Bank Intelligence |
| FR7 | Specify question distribution by difficulty tier, Bloom's level, or combination | Question Bank Intelligence |
| FR8 | Randomly select questions from matching classified pools | Question Bank Intelligence |
| FR9 | Ensure no candidate receives the same question set | Question Bank Intelligence |
| FR10 | Preview difficulty and Bloom's distribution of assembled test before dispatch | Question Bank Intelligence |
| FR11 | Trigger AI-assisted question generation by domain, difficulty, Bloom's level, count | Question Bank Intelligence |
| FR12 | AI-generated questions enter human review workflow before active bank | Question Bank Intelligence |
| FR13 | Review, approve, edit, or reject AI-generated questions | Question Bank Intelligence |
| FR14 | Detect and flag near-duplicate questions with similarity score before publish | Question Bank Intelligence |
| FR15 | Prevent publishing questions exceeding configurable similarity threshold | Question Bank Intelligence |
| FR16 | Version all question edits with full history and rollback | Question Bank Intelligence |
| FR17 | Compare any two versions of a question side-by-side | Question Bank Intelligence |
| FR18 | Archive questions, excluding from active pools while retaining audit history | Question Bank Intelligence |
| FR19 | Mark questions as global, reusable across designated organizations | Question Bank Intelligence |
| FR20 | Bulk upload coding questions via CSV/JSON template with validation | Question Bank Intelligence |
| FR21 | Report bulk upload progress, success/failure counts, downloadable error details | Question Bank Intelligence |
| FR22 | Create, configure, and dispatch assessments with proctor levels, duration, pass marks | Assessment Creation & Dispatch |
| FR23 | Dispatch assessments via email, generic link, or bulk batch | Assessment Creation & Dispatch |
| FR24 | Add, manage, and filter assessments by tags | Assessment Creation & Dispatch |
| FR25 | View assessment dispatch history and recall active dispatches | Assessment Creation & Dispatch |
| FR26 | Write and execute code in multi-file project-style IDE during assessments | Coding Assessment Engine |
| FR27 | Auto-grade coding submissions using public and hidden test cases with limits | Coding Assessment Engine |
| FR28 | Display clear pass/fail logs per test case with execution time and memory | Coding Assessment Engine |
| FR29 | Support JavaScript, TypeScript, Python, and Java for code execution | Coding Assessment Engine |
| FR30 | Define public test cases (visible) and hidden test cases (grading only) | Coding Assessment Engine |
| FR31 | Enforce resource constraints (time limit, memory limit) per test case | Coding Assessment Engine |
| FR32 | AI reviews candidate code for quality, patterns, and best practices | Coding Assessment Engine |
| FR33 | Run pre-test compatibility check (browser, OS, network, camera, mic, screen sharing) | Candidate Experience & Proctoring |
| FR34 | Provide clear remediation guidance when compatibility issues detected | Candidate Experience & Proctoring |
| FR35 | Re-run compatibility check after resolving issues | Candidate Experience & Proctoring |
| FR36 | ID verification via document OCR with confidence scoring | Candidate Experience & Proctoring |
| FR37 | Face capture verification via face detection with quality validation | Candidate Experience & Proctoring |
| FR38 | Monitor candidates via webcam capture, screenshot capture, tab-switching detection | Candidate Experience & Proctoring |
| FR39 | Distinguish genuine violations from false positives (debounce, min-duration thresholds) | Candidate Experience & Proctoring |
| FR40 | Candidates view assessment results after completion (when configured) | Candidate Experience & Proctoring |
| FR41 | Track and report compatibility check pass/fail rates per browser, OS, network | Candidate Experience & Proctoring |
| FR42 | Track assessment rejection rates from technical issues, surface trends to admins | Candidate Experience & Proctoring |
| FR43 | Dynamically adjust question difficulty based on candidate performance | Adaptive Testing |
| FR44 | Increase difficulty for subsequent questions on correct answers | Adaptive Testing |
| FR45 | Decrease difficulty for subsequent questions on incorrect answers | Adaptive Testing |
| FR46 | Generate skill-level profiles from adaptive assessment results | Adaptive Testing |
| FR47 | Enable/disable adaptive mode per assessment | Adaptive Testing |
| FR48 | Invite, activate, deactivate, delete users with RBAC (48 permissions) | User & Org Management |
| FR49 | Create custom roles with specific permission combinations | User & Org Management |
| FR50 | Users belong to multiple organizations and switch between them | User & Org Management |
| FR51 | Create, activate, deactivate, remove organizations | User & Org Management |
| FR52 | Review and approve/reject new organization applications | User & Org Management |
| FR53 | Create skills with hierarchical levels, assign assessments to each level | Skills Management |
| FR54 | Dispatch assessments via skill-level assignment | Skills Management |
| FR55 | Bulk upload skills via CSV | Skills Management |
| FR56 | Map skills to external systems for CMS integration | Skills Management |
| FR57 | View assessment reports with candidate metrics, comparative analysis, score distributions | Reporting & Analytics |
| FR58 | AI-powered candidate performance analysis and question analytics | Reporting & Analytics |
| FR59 | View proctoring data (screenshots, webcam captures, violation logs) per candidate | Reporting & Analytics |
| FR60 | Stream AI analytics insights in real-time | Reporting & Analytics |
| FR61 | Webhook callbacks to external systems with enriched assessment payloads | Reporting & Analytics |
| FR62 | Export candidate results and assessment data | Reporting & Analytics |
| FR63 | In-app notifications in real-time for assessment, user lifecycle, admin events | Notifications |
| FR64 | Email notifications for dispatch, completion, passwords, account events | Notifications |
| FR65 | Configure notification preferences and toggle categories | Notifications |
| FR66 | Mark notifications read/unread, bulk-manage | Notifications |
| FR67 | Manage feature flags with real-time propagation to all services | Feature Flags & Config |
| FR68 | Configure organization-specific settings (branding, assessment defaults, email domains) | Feature Flags & Config |
| FR69 | Roll out features gradually by organization via feature flag targeting | Feature Flags & Config |
| FR70 | External systems authenticate via API keys to dispatch assessments and retrieve results | External API Integration |
| FR71 | API consumers query candidate skill profiles from adaptive testing | External API Integration |
| FR72 | Webhook callbacks with enriched payloads (auto-graded, AI analysis, compatibility) | External API Integration |

### 1.2 Non-Functional Requirements (27 NFRs)

| ID | Description | Category |
|----|-------------|----------|
| NFR1 | API Gateway p95 response < 200ms under normal load | Performance |
| NFR2 | Auto-grading p99 < 10s under concurrent load | Performance |
| NFR3 | AI essay marking p95 < 15s per submission | Performance |
| NFR4 | Frontend LCP < 2.5s on standard broadband | Performance |
| NFR5 | Bulk upload handles 500 questions per batch without timeout | Performance |
| NFR6 | Real-time notification delivery within 2s of trigger | Performance |
| NFR7 | 100 concurrent assessment-takers per org without degradation | Scalability |
| NFR8 | Question bank scales to 100,000+ questions with sub-second search | Scalability |
| NFR9 | Event consumers process lifecycle events < 5s end-to-end | Scalability |
| NFR10 | Candidate PII encrypted at rest (AES-256) and in transit (TLS 1.2+) | Security |
| NFR11 | Authentication payloads encrypted between all services | Security |
| NFR12 | API keys hashed with industry-standard KDF | Security |
| NFR13 | Rate limiting: 60 req / 30s per client+service | Security |
| NFR14 | Circuit breaker: open after 3 failures, 30s timeout | Security |
| NFR15 | All PII access audit-logged with actor, action, timestamp | Security |
| NFR16 | 99.5% uptime during business hours (Mon-Fri 8am-6pm GMT) | Reliability |
| NFR17 | Assessment submissions: draft auto-save with recovery on network failure | Reliability |
| NFR18 | Event bus: at-least-once processing for lifecycle events | Reliability |
| NFR19 | Database migrations backward-compatible, zero-downtime deployments | Reliability |
| NFR20 | WCAG 2.1 AA compliance for all assessment-taking and management UIs | Accessibility |
| NFR21 | All interactive elements keyboard-navigable with visible focus indicators | Accessibility |
| NFR22 | Color contrast 4.5:1 minimum for normal text, 3:1 for large text | Accessibility |
| NFR23 | All images/icons have descriptive alt text or ARIA labels | Accessibility |
| NFR24 | All services emit structured logs to centralized logging | Observability |
| NFR25 | Distributed tracing spans all service-to-service calls | Observability |
| NFR26 | Error monitoring captures/alerts on unhandled exceptions across services | Observability |
| NFR27 | API Gateway exposes metrics for volume, latency, error rate, circuit breaker | Observability |

---

## 2. FR Coverage Map

Every FR maps to exactly one epic. No gaps, no overlaps.

| FR | Epic | Story |
|----|------|-------|
| FR1 | E2: Difficulty Classification & Intelligent Assembly | 2.1 |
| FR2 | E7: Calibration Pipeline | 7.1 |
| FR3 | E7: Calibration Pipeline | 7.1 |
| FR4 | E2: Difficulty Classification & Intelligent Assembly | 2.2 |
| FR5 | E2: Difficulty Classification & Intelligent Assembly | 2.3 |
| FR6 | E7: Calibration Pipeline | 7.2 |
| FR7 | E2: Difficulty Classification & Intelligent Assembly | 2.4 |
| FR8 | E2: Difficulty Classification & Intelligent Assembly | 2.5 |
| FR9 | E2: Difficulty Classification & Intelligent Assembly | 2.5 |
| FR10 | E2: Difficulty Classification & Intelligent Assembly | 2.6 |
| FR11 | E3: AI Question Generation & Duplicate Detection | 3.3 |
| FR12 | E3: AI Question Generation & Duplicate Detection | 3.4 |
| FR13 | E3: AI Question Generation & Duplicate Detection | 3.5 |
| FR14 | E3: AI Question Generation & Duplicate Detection | 3.1 |
| FR15 | E3: AI Question Generation & Duplicate Detection | 3.2 |
| FR16 | E1: Question Versioning & Lifecycle | 1.1 |
| FR17 | E1: Question Versioning & Lifecycle | 1.2 |
| FR18 | E1: Question Versioning & Lifecycle | 1.3 |
| FR19 | E1: Question Versioning & Lifecycle | 1.4 |
| FR20 | E4: Bulk Upload & Question Governance | 4.1 |
| FR21 | E4: Bulk Upload & Question Governance | 4.2 |
| FR22 | E9: Assessment Lifecycle & Reporting Enrichment | 9.1 |
| FR23 | E9: Assessment Lifecycle & Reporting Enrichment | 9.1 |
| FR24 | E9: Assessment Lifecycle & Reporting Enrichment | 9.2 |
| FR25 | E9: Assessment Lifecycle & Reporting Enrichment | 9.2 |
| FR26 | E5: Multi-File Coding IDE | 5.1 |
| FR27 | E6: Auto-Grading & AI Code Review | 6.1 |
| FR28 | E6: Auto-Grading & AI Code Review | 6.2 |
| FR29 | E6: Auto-Grading & AI Code Review | 6.1 |
| FR30 | E6: Auto-Grading & AI Code Review | 6.3 |
| FR31 | E6: Auto-Grading & AI Code Review | 6.1 |
| FR32 | E6: Auto-Grading & AI Code Review | 6.4 |
| FR33 | E8: Pre-Test Compatibility & Candidate Experience | 8.1 |
| FR34 | E8: Pre-Test Compatibility & Candidate Experience | 8.2 |
| FR35 | E8: Pre-Test Compatibility & Candidate Experience | 8.2 |
| FR36 | E8: Pre-Test Compatibility & Candidate Experience | 8.5 |
| FR37 | E8: Pre-Test Compatibility & Candidate Experience | 8.5 |
| FR38 | E8: Pre-Test Compatibility & Candidate Experience | 8.5 |
| FR39 | E8: Pre-Test Compatibility & Candidate Experience | 8.5 |
| FR40 | E8: Pre-Test Compatibility & Candidate Experience | 8.6 |
| FR41 | E8: Pre-Test Compatibility & Candidate Experience | 8.3 |
| FR42 | E8: Pre-Test Compatibility & Candidate Experience | 8.4 |
| FR43 | E10: Adaptive Testing Engine | 10.1 |
| FR44 | E10: Adaptive Testing Engine | 10.1 |
| FR45 | E10: Adaptive Testing Engine | 10.1 |
| FR46 | E10: Adaptive Testing Engine | 10.2 |
| FR47 | E10: Adaptive Testing Engine | 10.3 |
| FR48 | E9: Assessment Lifecycle & Reporting Enrichment | 9.3 |
| FR49 | E9: Assessment Lifecycle & Reporting Enrichment | 9.3 |
| FR50 | E9: Assessment Lifecycle & Reporting Enrichment | 9.3 |
| FR51 | E9: Assessment Lifecycle & Reporting Enrichment | 9.4 |
| FR52 | E9: Assessment Lifecycle & Reporting Enrichment | 9.4 |
| FR53 | E9: Assessment Lifecycle & Reporting Enrichment | 9.5 |
| FR54 | E9: Assessment Lifecycle & Reporting Enrichment | 9.5 |
| FR55 | E9: Assessment Lifecycle & Reporting Enrichment | 9.6 |
| FR56 | E9: Assessment Lifecycle & Reporting Enrichment | 9.6 |
| FR57 | E9: Assessment Lifecycle & Reporting Enrichment | 9.7 |
| FR58 | E9: Assessment Lifecycle & Reporting Enrichment | 9.8 |
| FR59 | E9: Assessment Lifecycle & Reporting Enrichment | 9.7 |
| FR60 | E9: Assessment Lifecycle & Reporting Enrichment | 9.8 |
| FR61 | E9: Assessment Lifecycle & Reporting Enrichment | 9.9 |
| FR62 | E9: Assessment Lifecycle & Reporting Enrichment | 9.7 |
| FR63 | E9: Assessment Lifecycle & Reporting Enrichment | 9.10 |
| FR64 | E9: Assessment Lifecycle & Reporting Enrichment | 9.10 |
| FR65 | E9: Assessment Lifecycle & Reporting Enrichment | 9.10 |
| FR66 | E9: Assessment Lifecycle & Reporting Enrichment | 9.10 |
| FR67 | E9: Assessment Lifecycle & Reporting Enrichment | 9.11 |
| FR68 | E9: Assessment Lifecycle & Reporting Enrichment | 9.11 |
| FR69 | E9: Assessment Lifecycle & Reporting Enrichment | 9.11 |
| FR70 | E9: Assessment Lifecycle & Reporting Enrichment | 9.9 |
| FR71 | E10: Adaptive Testing Engine | 10.4 |
| FR72 | E9: Assessment Lifecycle & Reporting Enrichment | 9.9 |

---

## 3. Team Assignment Strategy

**Team A -- Question Bank Intelligence & Question Lifecycle (backend-heavy)**
Focus: test-creation service, calibration pipeline, AI integration, question data model.
Services: test-creation (Express.js), ai service (FastAPI), reporting (Spring Boot) for calibration data.

**Team B -- Candidate Experience & Coding Enhancements (frontend-heavy)**
Focus: test-execution service, frontend candidate flows, IDE components, compatibility check.
Services: test-execution (Express.js), frontend (Angular), Judge0 integration.

**Shared/Cross-cutting:**
- Both teams contribute to the frontend repo (dodokpo-core).
- Accessibility (E8 stories) is split: Team B owns candidate-facing a11y, Team A owns management-facing a11y.
- Assessment Lifecycle & Reporting Enrichment (E9) is split: Team A owns reporting data enrichment, Team B owns notifications/UI.

```mermaid
flowchart TB
    subgraph "Team A -- Question Bank Intelligence"
        E1["E1: Question Versioning\n& Lifecycle"]
        E2["E2: Difficulty Classification\n& Intelligent Assembly"]
        E3["E3: AI Question Generation\n& Duplicate Detection"]
        E4["E4: Bulk Upload &\nQuestion Governance"]
        E7["E7: Calibration Pipeline"]
        E9A["E9: Reporting Enrichment\n(Team A portion)"]
    end

    subgraph "Team B -- Candidate Experience"
        E5["E5: Multi-File Coding IDE"]
        E6["E6: Auto-Grading &\nAI Code Review"]
        E8["E8: Pre-Test Compatibility\n& Candidate Experience"]
        E9B["E9: Assessment Lifecycle\n(Team B portion)"]
        E10["E10: Adaptive Testing\nEngine"]
    end

    E1 -->|"versioning schema\nunblocks question features"| E2
    E1 -->|"versioning schema\nunblocks AI generation"| E3
    E2 -->|"difficulty tiers\nunblock calibration"| E7
    E7 -->|"calibrated tiers\nunblock adaptive"| E10
    E2 -->|"difficulty schema\nenables assembly"| E9A
    E3 -->|"duplicate detection\nenriches quality"| E4
    E5 -->|"multi-file IDE\nunblocks auto-grading"| E6
    E8 -->|"compat check data\nenriches reporting"| E9B
    E6 -->|"auto-grading results\nenrich webhooks"| E9A
    E10 -->|"skill profiles\nenrich API"| E9A

    style E1 fill:#4a90d9,color:#fff
    style E2 fill:#4a90d9,color:#fff
    style E3 fill:#4a90d9,color:#fff
    style E4 fill:#4a90d9,color:#fff
    style E7 fill:#4a90d9,color:#fff
    style E9A fill:#4a90d9,color:#fff
    style E5 fill:#2ecc71,color:#fff
    style E6 fill:#2ecc71,color:#fff
    style E8 fill:#2ecc71,color:#fff
    style E9B fill:#2ecc71,color:#fff
    style E10 fill:#2ecc71,color:#fff
```

---

## 4. Epic List

### Epic 1: Question Versioning & Lifecycle
**Team:** Team A
**Goal:** Enable version-controlled question editing with full history, rollback, archiving, and cross-org global question sharing -- so that no question change ever corrupts historical assessment results and the question bank can be governed at scale.
**FRs Covered:** FR16, FR17, FR18, FR19
**Feature Flag:** `q2_question_versioning`
**Dependencies:** None (foundational -- must be first)
**NFRs Addressed:** NFR8 (scalable question bank), NFR19 (backward-compatible migrations)

### Epic 2: Difficulty Classification & Intelligent Assembly
**Team:** Team A
**Goal:** Classify every question by difficulty tier and Bloom's Taxonomy, then let test managers build tests by specifying distribution targets that the system fills automatically -- transforming test assembly from manual curation to intelligent composition.
**FRs Covered:** FR1, FR4, FR5, FR7, FR8, FR9, FR10
**Feature Flags:** `q2_difficulty_calibration`, `q2_blooms_taxonomy`
**Dependencies:** E1 (versioning schema must exist for override tracking)
**NFRs Addressed:** NFR8 (sub-second search with classification filters)

### Epic 3: AI Question Generation & Duplicate Detection
**Team:** Team A
**Goal:** Detect near-duplicate questions to prevent bank pollution, and generate new questions via AI with a governed human review workflow -- reducing manual curation effort by 40-60%.
**FRs Covered:** FR11, FR12, FR13, FR14, FR15
**Feature Flags:** `q2_duplicate_detection`, `q2_ai_question_gen`
**Dependencies:** E1 (versioning needed for review/edit flow of AI-generated questions)
**NFRs Addressed:** NFR8 (embedding search at scale)

### Epic 4: Bulk Upload & Question Governance
**Team:** Team A
**Goal:** Enable mass ingestion of coding questions via CSV/JSON with validation, progress tracking, and error reporting -- eliminating one-by-one manual entry for large question sets.
**FRs Covered:** FR20, FR21
**Feature Flag:** `q2_bulk_upload_coding`
**Dependencies:** E1 (versioning schema for new questions), E3 (optional: duplicate check on upload)
**NFRs Addressed:** NFR5 (500 questions per batch without timeout)

### Epic 5: Multi-File Coding IDE
**Team:** Team B
**Goal:** Let candidates work across multiple files in a project-style IDE during coding assessments -- mimicking real development work instead of artificial single-file exercises.
**FRs Covered:** FR26
**Feature Flag:** `q2_multifile_coding`
**Dependencies:** None (independent, can start immediately)
**NFRs Addressed:** NFR4 (LCP < 2.5s for editor), NFR7 (100 concurrent takers)

### Epic 6: Auto-Grading & AI Code Review
**Team:** Team B
**Goal:** Auto-grade coding submissions using public and hidden test cases with resource constraints, display transparent execution logs, and supplement with AI code quality review -- achieving 80%+ reduction in manual coding review.
**FRs Covered:** FR27, FR28, FR29, FR30, FR31, FR32
**Feature Flag:** `q2_multifile_coding` (shared with E5)
**Dependencies:** E5 (multi-file IDE must be functional for project-style grading)
**NFRs Addressed:** NFR2 (p99 < 10s auto-grading), NFR7 (concurrent load)

### Epic 7: Calibration Pipeline
**Team:** Team A
**Goal:** Continuously recalibrate question difficulty tiers from real candidate performance data -- making the question bank self-maintaining rather than relying on subjective difficulty assignment.
**FRs Covered:** FR2, FR3, FR6
**Feature Flag:** `q2_difficulty_calibration`
**Dependencies:** E2 (difficulty schema and Bloom's classification must exist)
**NFRs Addressed:** NFR9 (event consumer < 5s), NFR18 (at-least-once event delivery)

### Epic 8: Pre-Test Compatibility & Candidate Experience
**Team:** Team B
**Goal:** Validate browser, OS, network stability, camera, mic, and screen-sharing before assessments begin, with clear remediation guidance -- eliminating surprise technical failures and reducing support tickets by ~30%.
**FRs Covered:** FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42
**Feature Flag:** `q2_compatibility_check`, `q2_accessibility`
**Dependencies:** None (independent, can start immediately)
**NFRs Addressed:** NFR20-23 (WCAG 2.1 AA), NFR17 (session recovery)

### Epic 9: Assessment Lifecycle & Reporting Enrichment
**Team:** Team A (reporting enrichment) + Team B (assessment lifecycle, notifications, UI)
**Goal:** Strengthen the existing assessment creation, dispatch, user management, skills, reporting, notifications, feature flags, and external API capabilities -- enriching all existing flows with data from the new Q2 features (difficulty profiles, compatibility outcomes, auto-grading results).
**FRs Covered:** FR22, FR23, FR24, FR25, FR48, FR49, FR50, FR51, FR52, FR53, FR54, FR55, FR56, FR57, FR58, FR59, FR60, FR61, FR62, FR63, FR64, FR65, FR66, FR67, FR68, FR69, FR70, FR72
**Feature Flags:** Various (enrichment gated by individual feature flags)
**Dependencies:** E2 (difficulty data for reports), E7 (calibration data), E8 (compatibility data for reports)
**NFRs Addressed:** NFR1 (API response times), NFR6 (notification delivery < 2s), NFR15 (PII audit logging)

### Epic 10: Adaptive Testing Engine
**Team:** Team B
**Goal:** Dynamically adjust question difficulty during live assessments based on candidate performance, generating granular skill-level profiles -- so evaluators see precise capability breakdowns instead of flat percentage scores.
**FRs Covered:** FR43, FR44, FR45, FR46, FR47, FR71
**Feature Flag:** `q2_adaptive_testing`
**Dependencies:** E7 (calibrated difficulty tiers must be reliable), E2 (difficulty classification)
**NFRs Addressed:** NFR2 (real-time difficulty computation), NFR7 (concurrent takers)

---

## 5. Stories

### Epic 1: Question Versioning & Lifecycle

#### Story 1.1: Question Version Creation and History
**Team:** Team A
**FRs:** FR16

As a test manager,
I want every edit to a question to be automatically versioned with full history,
So that I can track how questions evolve over time and never lose previous content.

**Acceptance Criteria:**
- **Given** a question exists in the bank **When** a test manager edits any field (content, options, answer, metadata) and saves **Then** the system creates a new QuestionVersion record, increments the version number, and updates the question's currentVersionId
- **Given** a question has multiple versions **When** a test manager opens the version history panel **Then** the system displays all versions in reverse chronological order with author, timestamp, and change summary
- **Given** a question version exists **When** a test manager selects "Rollback to this version" **Then** the system sets currentVersionId to the selected version, creates an audit log entry, and the question's content reflects the rolled-back version
- **Given** a historical assessment was taken with question version N **When** version N+1 is created **Then** the historical assessment result continues to reference version N with no data alteration
- **Given** the feature flag `q2_question_versioning` is disabled **When** a test manager edits a question **Then** the system behaves as before (direct edit, no versioning)

---

#### Story 1.2: Version Comparison (Side-by-Side Diff)
**Team:** Team A
**FRs:** FR17

As a test manager,
I want to compare any two versions of a question side-by-side,
So that I can understand exactly what changed and make informed rollback decisions.

**Acceptance Criteria:**
- **Given** a question has 3 or more versions **When** a test manager selects two versions to compare **Then** the system displays both versions side-by-side with changed fields highlighted (additions in green, deletions in red)
- **Given** a comparison is displayed **When** the test manager reviews the diff **Then** all fields (content, options, correct answer, difficulty, Bloom's level, metadata) are included in the comparison
- **Given** a comparison shows a previous version is preferable **When** the test manager clicks "Rollback to this version" from the comparison view **Then** the system performs the rollback as described in Story 1.1

---

#### Story 1.3: Question Archiving
**Team:** Team A
**FRs:** FR18

As an organization admin,
I want to archive questions that are no longer relevant,
So that they are excluded from active test pools but their history and historical assessment results are preserved.

**Acceptance Criteria:**
- **Given** a question is in active status **When** an organization admin selects "Archive" **Then** the question's status changes to archived, it no longer appears in question selection pools, and an audit log entry is created
- **Given** a question is archived **When** a test manager builds a new test **Then** the archived question does not appear in available question lists
- **Given** a question is archived **When** an admin views historical assessments that used the question **Then** the question content (at the version used) is still accessible in the assessment results
- **Given** a question is archived **When** an admin selects "Restore" **Then** the question returns to active status and is available for test pools again

---

#### Story 1.4: Global Questions Across Organizations
**Team:** Team A
**FRs:** FR19

As a system admin,
I want to mark questions as global and make them reusable across designated organizations,
So that high-quality questions can be shared without duplication across AmaliTech's three business units.

**Acceptance Criteria:**
- **Given** a question exists in one organization **When** a system admin marks it as "Global" and designates target organizations **Then** the question becomes visible in those organizations' question pools
- **Given** a global question is available **When** a test manager in a target organization builds a test **Then** the global question appears in the pool alongside org-specific questions, clearly labeled as "Global"
- **Given** a global question is used in an assessment **When** the source organization edits the question **Then** a new version is created, and assessments in other orgs that used the previous version retain reference to that version
- **Given** a system admin **When** they revoke global status from a question **Then** the question is removed from other orgs' pools but assessments already using it retain their references
- **Given** the `manage_global_questions` permission is not granted **When** a user attempts to mark a question as global **Then** the system returns an authorization error

---

### Epic 2: Difficulty Classification & Intelligent Assembly

#### Story 2.1: Difficulty Tier and Bloom's Taxonomy Schema
**Team:** Team A
**FRs:** FR1

As a test manager,
I want every question classified by both a difficulty tier and a Bloom's Taxonomy cognitive level,
So that I can understand the challenge level and cognitive demand of each question independently.

**Acceptance Criteria:**
- **Given** the difficulty classification feature flag is enabled **When** a test manager creates or edits a question **Then** the form includes a difficultyTier selector (Beginner, Intermediate, Advanced, Expert) and a bloomsLevel selector (Remember, Understand, Apply, Analyze, Evaluate, Create)
- **Given** a question exists without classification data **When** the schema migration runs **Then** existing questions receive a default difficultyTier of null (pending classification) and bloomsLevel of null
- **Given** the Prisma schema is extended **When** a developer queries questions **Then** the new fields (difficultyTier, bloomsLevel, calibrationScore, calibrationSampleSize, calibrationLastUpdated, difficultyOverride, difficultyOverrideBy) are available

---

#### Story 2.2: Bloom's Taxonomy Assignment by Test Managers
**Team:** Team A
**FRs:** FR4

As a test manager,
I want to assign or override Bloom's Taxonomy levels on individual questions,
So that I can classify the cognitive demand of questions based on my domain expertise.

**Acceptance Criteria:**
- **Given** a question is displayed in the question editor **When** a test manager selects a Bloom's Taxonomy level from the dropdown **Then** the system saves the bloomsLevel and records the change in version history
- **Given** a question has a Bloom's level assigned **When** a test manager changes it **Then** a new version is created with the updated bloomsLevel and the change is visible in version history
- **Given** the blooms taxonomy feature flag is disabled **When** a test manager views the question editor **Then** the Bloom's Taxonomy selector is not displayed

---

#### Story 2.3: Manual Difficulty Override with Audit Trail
**Team:** Team A
**FRs:** FR5

As a test manager,
I want to view the system-assigned difficulty tier and override it with my own judgment,
So that I can correct misclassifications while the override is tracked for transparency.

**Acceptance Criteria:**
- **Given** a question has a system-assigned difficulty tier **When** a test manager views the question detail **Then** the current tier, calibration score, and sample size are displayed
- **Given** a test manager disagrees with the system tier **When** they select a different tier and save **Then** the system sets difficultyOverride to true, records difficultyOverrideBy with the user's ID, creates a new version, and the question uses the manually set tier
- **Given** a question has a manual override **When** the calibration pipeline runs **Then** the system does not overwrite the manual override (override is sticky until explicitly cleared)
- **Given** a question has a manual override **When** a test manager clicks "Reset to system-assigned" **Then** the override is cleared and the system-computed tier is restored

---

#### Story 2.4: Difficulty and Bloom's Distribution Specification
**Team:** Team A
**FRs:** FR7

As a test manager,
I want to specify the desired distribution of difficulty tiers and Bloom's levels when building a test,
So that I can ensure balanced coverage appropriate for the role level being assessed.

**Acceptance Criteria:**
- **Given** a test manager is building a new assessment **When** they open the question distribution configuration **Then** they can specify percentages or counts per difficulty tier (e.g., 20% Beginner, 40% Intermediate, 30% Advanced, 10% Expert)
- **Given** the distribution configuration **When** the test manager also selects Bloom's Taxonomy distribution **Then** they can combine both (e.g., "3 Advanced Apply questions, 2 Intermediate Analyze questions")
- **Given** a distribution is configured **When** the pool has insufficient questions for a tier/level combination **Then** the system warns the test manager with specific shortfall details before proceeding

---

#### Story 2.5: Intelligent Question Selection from Classified Pools
**Team:** Team A
**FRs:** FR8, FR9

As a test manager,
I want the system to randomly select questions from classified pools matching my distribution targets,
So that test assembly is automated and each candidate receives a unique question combination.

**Acceptance Criteria:**
- **Given** a difficulty/Bloom's distribution is specified **When** the test manager clicks "Auto-Fill" **Then** the system randomly selects questions from the matching pools to fill the specified distribution
- **Given** multiple candidates are dispatched the same assessment **When** each candidate starts **Then** the system ensures question randomization produces unique combinations per candidate (no two candidates receive identical sets)
- **Given** the pool has enough questions **When** auto-fill runs **Then** the selected questions match the distribution within a reasonable tolerance (e.g., +/- 1 question per tier)

---

#### Story 2.6: Test Distribution Preview Before Dispatch
**Team:** Team A
**FRs:** FR10

As a test manager,
I want to preview the difficulty and Bloom's distribution of an assembled test before dispatching,
So that I can verify the assessment is balanced and appropriate.

**Acceptance Criteria:**
- **Given** a test has been assembled (manually or via auto-fill) **When** the test manager opens the distribution preview **Then** the system displays a breakdown chart showing count per difficulty tier and count per Bloom's level
- **Given** the preview is displayed **When** the test manager identifies an imbalance **Then** they can return to editing to adjust the selection before dispatch
- **Given** the preview shows the distribution **When** it includes both difficulty and Bloom's axes **Then** a cross-tabulation matrix is displayed (rows = difficulty tiers, columns = Bloom's levels)

---

### Epic 3: AI Question Generation & Duplicate Detection

#### Story 3.1: Duplicate Detection Engine (Backend)
**Team:** Team A
**FRs:** FR14

As a test manager,
I want the system to automatically detect near-duplicate questions when I create or edit a question,
So that I avoid polluting the question bank with redundant content.

**Acceptance Criteria:**
- **Given** a test manager creates or edits a question **When** they click "Save" or "Publish" **Then** the system computes a text embedding for the question content and compares it against all existing question embeddings within the organization
- **Given** the comparison finds matches above the configurable similarity threshold (default 85%) **When** results are returned **Then** the system displays a "Similar questions detected" alert with the matching questions and their similarity scores
- **Given** a duplicate is detected **When** the test manager reviews the flagged matches **Then** they can choose to proceed with publishing, edit their question, or cancel
- **Given** the `q2_duplicate_detection` feature flag is disabled **When** a question is saved **Then** no duplicate check is performed

---

#### Story 3.2: Duplicate Detection Threshold and Blocking
**Team:** Team A
**FRs:** FR15

As an organization admin,
I want to configure the similarity threshold and blocking behavior for duplicate detection,
So that I can tune precision/recall for my organization's question bank.

**Acceptance Criteria:**
- **Given** an organization admin accesses duplicate detection settings **When** they adjust the similarity threshold (0-100%) **Then** the system uses the new threshold for all subsequent duplicate checks in that organization
- **Given** a question exceeds the threshold **When** blocking mode is enabled **Then** the system prevents publishing and requires the test manager to acknowledge or dismiss each flagged duplicate
- **Given** a question exceeds the threshold **When** blocking mode is disabled (warning only) **Then** the system shows the warning but allows publishing without dismissal

---

#### Story 3.3: AI Question Generation Trigger
**Team:** Team A
**FRs:** FR11

As a test manager,
I want to trigger AI-assisted question generation by specifying domain, difficulty, Bloom's level, and count,
So that I can rapidly expand the question bank without manual authoring.

**Acceptance Criteria:**
- **Given** a test manager opens the AI generation wizard **When** they specify domain (e.g., "JavaScript"), difficulty target (e.g., Intermediate), Bloom's level (e.g., Apply), and count (e.g., 10) **Then** the system sends the request to the AI service for generation
- **Given** the AI service receives the request **When** it generates questions **Then** each question includes content, options (for MCQ), correct answer, and metadata matching the specified parameters
- **Given** the generation is in progress **When** the test manager waits **Then** a progress indicator is displayed with estimated completion
- **Given** the `q2_ai_question_gen` feature flag is disabled **When** a test manager accesses the question management screen **Then** the "AI Generate" button is not displayed

---

#### Story 3.4: AI-Generated Question Review Workflow
**Team:** Team A
**FRs:** FR12

As a test manager,
I want AI-generated questions to enter a human review workflow before becoming active,
So that no AI-generated question enters the bank without human validation.

**Acceptance Criteria:**
- **Given** the AI service has generated a batch of questions **When** generation completes **Then** each question is created with status "pending_review" and does not appear in active question pools
- **Given** pending review questions exist **When** a test manager opens the review queue **Then** they see all AI-generated questions awaiting review with their generation parameters and AI-assigned metadata
- **Given** a question is in pending_review status **When** a test manager reviews it **Then** they can approve (status becomes active), edit (opens editor with version tracking), or reject (status becomes rejected with reason)

---

#### Story 3.5: AI Question Approve, Edit, Reject Actions
**Team:** Team A
**FRs:** FR13

As a test manager,
I want to approve, edit, or reject each AI-generated question with tracked actions,
So that the review workflow produces an auditable trail of human oversight.

**Acceptance Criteria:**
- **Given** a test manager approves an AI-generated question **When** they click "Approve" **Then** the question status changes to active, a version record is created with reviewedBy, and the question enters the active pool
- **Given** a test manager edits an AI-generated question **When** they modify content and save **Then** a new version is created (original AI content = v1, edited content = v2), and the question remains in pending_review until explicitly approved
- **Given** a test manager rejects an AI-generated question **When** they click "Reject" with a reason **Then** the question status changes to rejected, the rejection reason is stored, and the question never enters active pools
- **Given** a batch of 10 AI-generated questions **When** a test manager uses the review queue **Then** they can approve/reject in bulk or review individually

---

### Epic 4: Bulk Upload & Question Governance

#### Story 4.1: Coding Question Bulk Upload via CSV/JSON
**Team:** Team A
**FRs:** FR20

As a test manager,
I want to bulk upload coding questions via a CSV or JSON template,
So that I can ingest large question sets in one operation instead of creating each manually.

**Acceptance Criteria:**
- **Given** a test manager accesses the bulk upload interface **When** they click "Download Template" **Then** they receive a CSV and JSON template with columns for question content, language (JS/TS/Python/Java), test cases (public and hidden), difficulty tier, Bloom's level, time limit, and memory limit
- **Given** a completed template file **When** the test manager uploads it **Then** the system validates the file format, required fields, test case syntax, and language support before processing
- **Given** validation passes **When** the upload is processed **Then** each question is created with an initial version and enters the bank (with duplicate detection if enabled)
- **Given** validation fails for some rows **When** processing completes **Then** valid questions are ingested and invalid rows are skipped with specific error details per row
- **Given** the `q2_bulk_upload_coding` feature flag is disabled **When** a test manager accesses question management **Then** the bulk upload option is not displayed

---

#### Story 4.2: Bulk Upload Progress and Error Reporting
**Team:** Team A
**FRs:** FR21

As a test manager,
I want to see real-time progress, success/failure counts, and downloadable error reports during bulk upload,
So that I can monitor the upload and fix any issues without guessing what went wrong.

**Acceptance Criteria:**
- **Given** a bulk upload is in progress **When** the test manager views the upload screen **Then** a progress bar shows percentage completion with estimated time remaining
- **Given** a bulk upload completes **When** the test manager views the results **Then** the system displays total rows processed, successful imports, failed imports, and skipped duplicates
- **Given** some rows failed validation **When** the test manager clicks "Download Error Report" **Then** they receive a file listing each failed row number, the field that failed, and the specific validation error message
- **Given** a bulk upload of 500 questions **When** processing runs **Then** it completes without timeout (NFR5)

---

### Epic 5: Multi-File Coding IDE

#### Story 5.1: Multi-File Project Editor (Frontend)
**Team:** Team B
**FRs:** FR26

As a candidate,
I want to work across multiple files in a project-style IDE during coding assessments,
So that the assessment mimics real development work with proper file organization.

**Acceptance Criteria:**
- **Given** a coding question is configured for multi-file mode **When** a candidate opens the question **Then** a file tree panel is displayed on the left showing the project structure (e.g., main.py, utils.py, test_solution.py)
- **Given** the file tree is visible **When** the candidate clicks a file **Then** the Monaco editor opens that file's content in a new tab, and the candidate can switch between open tabs
- **Given** multiple files are open **When** the candidate edits code in one file **Then** changes are preserved when switching to another tab, and all files are included in the submission
- **Given** the candidate clicks "Run" **When** the multi-file project is submitted for execution **Then** the system sends all files to the execution engine (Judge0) as a single project submission
- **Given** the `q2_multifile_coding` feature flag is disabled **When** a candidate opens a coding question **Then** the existing single-file editor is displayed

---

#### Story 5.2: Multi-File Project Configuration (Test Manager)
**Team:** Team B
**FRs:** FR26

As a test manager,
I want to configure multi-file project structures for coding questions,
So that candidates work on realistic project layouts with pre-populated starter files.

**Acceptance Criteria:**
- **Given** a test manager creates a coding question **When** they select "Multi-file project" mode **Then** they can define the file structure: add files, set filenames, choose which files are editable vs read-only, and populate starter code
- **Given** a multi-file question configuration **When** the test manager adds starter files **Then** each file has a filename, language (auto-detected or manual), and initial content
- **Given** a multi-file question **When** the test manager marks certain files as read-only **Then** candidates can view but not edit those files during the assessment
- **Given** the project structure is complete **When** the test manager saves **Then** the configuration is stored as a versioned question (Story 1.1)

---

#### Story 5.3: Multi-File Execution via Judge0
**Team:** Team B
**FRs:** FR26

As a candidate,
I want my multi-file project to execute correctly with all files included,
So that I can test my solution as a complete project, not isolated fragments.

**Acceptance Criteria:**
- **Given** a candidate submits a multi-file project for execution **When** the system processes the submission **Then** all files are bundled and sent to Judge0 as a single execution request with the correct entry point
- **Given** the execution completes **When** results are returned **Then** the candidate sees stdout, stderr, and execution status for the entire project run
- **Given** execution fails due to a syntax error in one file **When** the error is returned **Then** the error message identifies the specific file and line number
- **Given** multiple candidates execute simultaneously **When** the system processes concurrent submissions **Then** executions are isolated and do not interfere with each other (sandboxed)

---

### Epic 6: Auto-Grading & AI Code Review

#### Story 6.1: Auto-Grading with Test Cases and Resource Limits
**Team:** Team B
**FRs:** FR27, FR29, FR31

As a candidate,
I want my coding submission to be auto-graded using predefined test cases with clear pass/fail results,
So that I receive immediate, objective feedback on my solution.

**Acceptance Criteria:**
- **Given** a candidate submits their code (single-file or multi-file) **When** the auto-grading engine runs **Then** the system executes all public and hidden test cases against the submission
- **Given** each test case has time and memory limits **When** a test case exceeds the time limit **Then** the execution is terminated and marked as "Time Limit Exceeded"
- **Given** each test case has memory limits **When** a test case exceeds the memory limit **Then** the execution is terminated and marked as "Memory Limit Exceeded"
- **Given** the system supports JS, TS, Python, and Java **When** a candidate submits code in any of these languages **Then** the auto-grading runs correctly with language-appropriate execution
- **Given** auto-grading completes **When** results are computed **Then** the overall score is calculated as the ratio of passed test cases to total test cases

---

#### Story 6.2: Test Case Execution Logs Display
**Team:** Team B
**FRs:** FR28

As a candidate,
I want to see clear pass/fail logs for each test case with execution time and memory usage,
So that I can understand which test cases my solution passes and where it fails.

**Acceptance Criteria:**
- **Given** auto-grading has completed **When** the candidate views results **Then** each public test case is listed with: status (pass/fail/TLE/MLE), execution time (ms), memory usage (MB), expected output, and actual output
- **Given** hidden test cases exist **When** the candidate views results **Then** hidden test cases show only status (pass/fail) without revealing inputs or expected outputs
- **Given** a test case fails **When** the candidate reviews the log **Then** the expected vs actual output diff is clearly displayed for public test cases

---

#### Story 6.3: Public and Hidden Test Case Management
**Team:** Team B
**FRs:** FR30

As a test manager,
I want to define public test cases that candidates can see and hidden test cases used only for grading,
So that candidates can validate their approach while the final grade uses comprehensive hidden checks.

**Acceptance Criteria:**
- **Given** a test manager creates a coding question **When** they add test cases **Then** each test case can be marked as "Public" (visible to candidate) or "Hidden" (grading only)
- **Given** a public test case **When** a candidate views the question **Then** the test case input and expected output are displayed
- **Given** a hidden test case **When** a candidate runs their code **Then** hidden test cases are executed but results show only pass/fail without revealing test case details
- **Given** a question has both public and hidden test cases **When** grading runs **Then** the final score includes results from all test cases (public + hidden)

---

#### Story 6.4: AI Code Quality Review
**Team:** Team B
**FRs:** FR32

As a test manager,
I want AI to review candidate code for quality, patterns, and best practices,
So that evaluation goes beyond test case pass/fail to assess code craftsmanship.

**Acceptance Criteria:**
- **Given** a candidate submits a coding solution **When** auto-grading completes **Then** the system sends the code to the AI service for quality review
- **Given** the AI reviews the code **When** the analysis completes **Then** the system generates a quality report covering: code style, naming conventions, design patterns, efficiency, and best practices
- **Given** the AI review is complete **When** the test manager views the candidate's result **Then** the AI quality report is displayed alongside the auto-grading results with a transparent scoring rationale
- **Given** multiple AI providers are configured **When** the AI review runs **Then** the system uses the configured provider (OpenAI, Gemini, or Amali AI) with consistent scoring within acceptable variance

---

### Epic 7: Calibration Pipeline

#### Story 7.1: Calibration Score Computation from Historical Data
**Team:** Team A
**FRs:** FR2, FR3

As a system,
I want to continuously recalibrate question difficulty tiers based on candidate performance data,
So that the question bank reflects actual difficulty as experienced by candidates, not subjective estimates.

**Acceptance Criteria:**
- **Given** assessment results are published via Kafka (`complete-link` events) **When** the calibration consumer in test-creation receives them **Then** it aggregates per-question: pass rate, average time-to-answer, and score distribution
- **Given** a question has accumulated enough responses (minimum configurable sample size, default 30) **When** the calibration job runs (daily or after N new responses, configurable) **Then** a calibrationScore is computed and the difficultyTier is updated if the computed tier differs from the current one
- **Given** a question has a manual difficulty override (difficultyOverride = true) **When** the calibration pipeline runs **Then** the system recalculates the score but does not overwrite the manual tier (the computed suggestion is stored for admin visibility)
- **Given** the calibration pipeline updates a difficulty tier **When** the change is saved **Then** a Kafka event `question-calibrated` is published with the question ID, old tier, new tier, and supporting statistics

---

#### Story 7.2: Under-Calibrated Question Flagging
**Team:** Team A
**FRs:** FR6

As a test manager,
I want the system to flag questions with insufficient performance data for calibration review,
So that I know which questions have unreliable difficulty classifications.

**Acceptance Criteria:**
- **Given** a question has fewer responses than the minimum sample size **When** a test manager views the question list or detail **Then** the question displays an "Under-calibrated" badge with the current sample count and required minimum
- **Given** the calibration dashboard is open **When** a test manager filters by calibration status **Then** they can see all under-calibrated questions sorted by sample size (lowest first)
- **Given** an under-calibrated question is used in a test **When** the test manager views the distribution preview **Then** a warning indicates that some questions have unreliable difficulty classifications

---

### Epic 8: Pre-Test Compatibility & Candidate Experience

#### Story 8.1: Browser and OS Compatibility Check
**Team:** Team B
**FRs:** FR33

As a candidate,
I want the system to check my browser and operating system before I start an assessment,
So that I know my setup is compatible and I will not encounter technical failures mid-test.

**Acceptance Criteria:**
- **Given** a candidate navigates to an assessment link **When** the compatibility check page loads **Then** the system automatically detects browser name, version, OS name, and OS version
- **Given** the browser is Chrome 100+, Firefox 100+, Safari 16+, or Edge 100+ **When** the check runs **Then** the browser check passes with a green indicator
- **Given** the browser is below minimum version **When** the check runs **Then** the browser check fails with a clear message: "Your browser (X vY) is not supported. Please update to X v100+ or use Chrome, Firefox, Safari 16+, or Edge."
- **Given** the compatibility check endpoint is pre-auth **When** the candidate has not logged in **Then** the check runs without requiring JWT authentication

---

#### Story 8.2: Network Stability and Hardware Check
**Team:** Team B
**FRs:** FR34, FR35

As a candidate,
I want the system to check my network stability, camera, microphone, and screen sharing capability,
So that I can resolve any issues before the timed assessment begins.

**Acceptance Criteria:**
- **Given** the compatibility check runs **When** the network test executes **Then** the system measures latency (ping) and bandwidth (download speed estimate) and reports pass/fail based on minimum thresholds
- **Given** the assessment requires proctoring **When** the hardware check runs **Then** the system verifies camera access, microphone access, and screen sharing permission
- **Given** any check fails **When** the candidate views results **Then** the system provides specific remediation guidance (e.g., "Your network connection is unstable. We recommend switching to a wired connection or moving closer to your router.")
- **Given** remediation guidance is displayed **When** the candidate resolves the issue **Then** they can click "Re-run Check" to validate the fix without refreshing the page

---

#### Story 8.3: Compatibility Check Analytics Dashboard
**Team:** Team B
**FRs:** FR41

As a system admin,
I want to view compatibility check pass/fail rates per browser, OS, and network condition,
So that I can identify systemic issues and proactively improve guidance.

**Acceptance Criteria:**
- **Given** compatibility checks have been run by multiple candidates **When** a system admin opens the compatibility analytics dashboard **Then** the system displays pass/fail rates broken down by browser (name + version), OS (name + version), and network quality tier
- **Given** the dashboard is displayed **When** a particular browser version shows high failure rates **Then** the admin can drill down to see specific failure reasons
- **Given** a `compatibility-check-completed` Kafka event is published **When** the reporting service consumes it **Then** it aggregates the data for dashboard display

---

#### Story 8.4: Assessment Rejection Rate Tracking
**Team:** Team B
**FRs:** FR42

As a system admin,
I want the system to track assessment rejection rates caused by technical issues and surface trends,
So that I can measure the impact of compatibility checks on reducing rejections.

**Acceptance Criteria:**
- **Given** assessments are completed or invalidated **When** the system records outcomes **Then** technical rejections (network drop, browser crash, hardware failure) are categorized separately from proctoring violations
- **Given** rejection data is collected **When** a system admin views the trends dashboard **Then** they see rejection rates over time, with a before/after comparison for when compatibility checks were enabled
- **Given** a spike in rejections is detected **When** the admin views the data **Then** they can filter by organization, assessment, browser, OS, and time period

---

#### Story 8.5: Proctoring Enhancements (Violation Debounce)
**Team:** Team B
**FRs:** FR36, FR37, FR38, FR39

As a candidate,
I want the proctoring system to distinguish genuine violations from false positives,
So that momentary browser events do not unfairly flag me for review.

**Acceptance Criteria:**
- **Given** ID verification is initiated **When** the candidate uploads their ID document **Then** the system performs OCR with confidence scoring and returns a pass/fail result
- **Given** face capture is initiated **When** the candidate positions their face **Then** the system performs face detection with quality validation (single clear face required)
- **Given** the candidate is being monitored **When** a tab switch occurs for less than the configured minimum duration threshold (e.g., < 2 seconds) **Then** the event is logged but not flagged as a violation
- **Given** a tab switch exceeds the minimum duration **When** the system evaluates the event **Then** it is flagged as a genuine violation with timestamp and duration
- **Given** a browser notification popup causes a brief focus loss **When** the system detects it **Then** it applies debounce logic and does not flag it as a violation

---

#### Story 8.6: Candidate Results Viewing
**Team:** Team B
**FRs:** FR40

As a candidate,
I want to view my assessment results after completion when the test manager has enabled result sharing,
So that I receive feedback on my performance.

**Acceptance Criteria:**
- **Given** a test manager has configured result sharing for an assessment **When** a candidate completes the assessment **Then** the candidate can view their results page showing overall score, per-question scores, and time spent
- **Given** result sharing is disabled **When** a candidate completes the assessment **Then** the results page shows a "Thank you for completing the assessment" message without scores
- **Given** a coding assessment with auto-grading **When** the candidate views results **Then** public test case pass/fail results are displayed (hidden test cases show only pass/fail counts without details)

---

### Epic 9: Assessment Lifecycle & Reporting Enrichment

#### Story 9.1: Assessment Creation and Dispatch with Difficulty Distribution
**Team:** Team B
**FRs:** FR22, FR23

As a test manager,
I want to create and dispatch assessments that leverage difficulty distribution from classified pools,
So that dispatched assessments are balanced and appropriately challenging.

**Acceptance Criteria:**
- **Given** a test manager creates an assessment **When** they configure proctor levels, duration, and pass marks **Then** the system saves the assessment configuration
- **Given** an assessment is configured with difficulty distribution **When** the test manager dispatches via email, generic link, or bulk batch **Then** each candidate receives a randomized question set matching the distribution
- **Given** dispatch is initiated **When** the test manager selects "Email dispatch" **Then** invitation emails are sent with unique assessment links per candidate

---

#### Story 9.2: Assessment Tagging and Dispatch History
**Team:** Team B
**FRs:** FR24, FR25

As a test manager,
I want to tag assessments and view dispatch history,
So that I can organize assessments and recall or review past dispatches.

**Acceptance Criteria:**
- **Given** a test manager is managing assessments **When** they add tags to an assessment **Then** the tags are saved and the assessment can be filtered by those tags
- **Given** assessments have been dispatched **When** the test manager views dispatch history **Then** they see a list of all dispatches with date, method, recipient count, and status
- **Given** an active dispatch **When** the test manager clicks "Recall" **Then** the dispatch is deactivated and candidates can no longer access the assessment via those links

---

#### Story 9.3: User Management with RBAC
**Team:** Team B
**FRs:** FR48, FR49, FR50

As an organization admin,
I want to manage users with granular RBAC including the new `manage_global_questions` permission,
So that access control reflects the new Q2 capabilities.

**Acceptance Criteria:**
- **Given** an organization admin accesses user management **When** they invite, activate, deactivate, or delete a user **Then** the action is performed with the existing RBAC system (48 permissions)
- **Given** the admin creates a custom role **When** they select permissions **Then** the new `manage_global_questions` permission is available in the permission list
- **Given** a user belongs to multiple organizations **When** they log in **Then** they can switch between organizations, and their permissions are scoped to each org

---

#### Story 9.4: Organization Management
**Team:** Team B
**FRs:** FR51, FR52

As a system admin,
I want to manage organizations and review applications,
So that new organizations can be onboarded through a governed process.

**Acceptance Criteria:**
- **Given** a system admin accesses organization management **When** they create, activate, deactivate, or remove an organization **Then** the action is performed and audit-logged
- **Given** new organization applications are submitted **When** a system admin reviews them **Then** they can approve (creates org + admin account) or reject (sends rejection notification) with reason

---

#### Story 9.5: Skills Management and Assessment Assignment
**Team:** Team A
**FRs:** FR53, FR54

As a test manager,
I want to create skills with hierarchical levels and assign assessments to each level,
So that assessments are tied to specific competency milestones.

**Acceptance Criteria:**
- **Given** a test manager accesses skills management **When** they create a new skill **Then** they can define the skill name, description, and hierarchical levels (e.g., Beginner, Intermediate, Advanced)
- **Given** a skill with levels exists **When** the test manager assigns an assessment to a level **Then** candidates dispatched via that skill-level receive the corresponding assessment
- **Given** a skill-level assignment **When** the test manager dispatches via skill-level **Then** the system uses the assigned assessment with difficulty distribution matching the level

---

#### Story 9.6: Skills Bulk Upload and CMS Integration
**Team:** Team A
**FRs:** FR55, FR56

As a test manager,
I want to bulk upload skills via CSV and map them to external systems,
So that skills can be synchronized with AmaliTech's CMS without manual entry.

**Acceptance Criteria:**
- **Given** a test manager has a CSV of skills **When** they upload it **Then** the system validates and creates skills with hierarchical levels as specified
- **Given** skills exist in the system **When** a test manager maps a skill to an external system ID **Then** the mapping is stored and available via API for CMS integration
- **Given** skills are mapped **When** the CMS queries via API **Then** the external system receives skill data with assessment assignments

---

#### Story 9.7: Assessment Reporting with Enriched Data
**Team:** Team A
**FRs:** FR57, FR59, FR62

As a test manager,
I want assessment reports enriched with difficulty calibration data, compatibility outcomes, and auto-grading details,
So that reports provide comprehensive insight into candidate performance.

**Acceptance Criteria:**
- **Given** an assessment has been completed **When** the test manager views the report **Then** they see candidate metrics, comparative analysis, score distributions, and per-question difficulty tier information
- **Given** proctoring was enabled **When** the test manager views a candidate's result **Then** they can access screenshots, webcam captures, and violation logs
- **Given** the test manager needs the data externally **When** they click "Export" **Then** candidate results and assessment data are exported in CSV/JSON format with all enriched fields

---

#### Story 9.8: AI-Powered Analytics and Real-Time Streaming
**Team:** Team A
**FRs:** FR58, FR60

As a test manager,
I want AI-powered performance analysis that streams insights in real-time,
So that I receive actionable analytics without waiting for batch reports.

**Acceptance Criteria:**
- **Given** assessment results are available **When** the test manager requests AI analysis **Then** the system sends performance data to the AI service and streams insights back via SSE
- **Given** the AI analysis is streaming **When** the test manager views the analytics panel **Then** insights appear progressively (not all at once) with candidate performance patterns, question effectiveness metrics, and recommendations
- **Given** question analytics are enabled **When** the AI analyzes question performance **Then** metrics include discrimination index, difficulty alignment accuracy, and under-performing question flags

---

#### Story 9.9: Webhook Callbacks and External API Enrichment
**Team:** Team A
**FRs:** FR61, FR70, FR72

As an external API consumer,
I want webhook callbacks with enriched payloads including auto-grading results, AI analysis, and compatibility outcomes,
So that our CMS receives comprehensive assessment data without polling.

**Acceptance Criteria:**
- **Given** an external system has registered webhook endpoints **When** an assessment completes **Then** the system sends a webhook callback with the enriched payload
- **Given** the enriched payload **When** it includes auto-grading data **Then** it contains per-test-case pass/fail, execution times, and overall score
- **Given** adaptive testing was used **When** the payload is constructed **Then** it includes the candidate's skill-level profile
- **Given** an external system authenticates via API key **When** it calls assessment dispatch or result retrieval endpoints **Then** the API returns data scoped to the authenticated organization

---

#### Story 9.10: Notification Enhancements for Q2 Events
**Team:** Team B
**FRs:** FR63, FR64, FR65, FR66

As a user,
I want to receive real-time notifications for new Q2 events (calibration changes, duplicate detection alerts, compatibility check results),
So that I stay informed about platform activity relevant to my role.

**Acceptance Criteria:**
- **Given** a question's difficulty tier changes via calibration **When** the `question-calibrated` Kafka event fires **Then** relevant test managers receive an in-app notification
- **Given** a duplicate is detected during question creation **When** the `question-duplicate-detected` event fires **Then** the creating test manager receives a notification
- **Given** notification preferences are configured **When** a user has disabled a notification category **Then** notifications of that category are not delivered to that user
- **Given** a user has unread notifications **When** they open the notification panel **Then** they can mark as read, mark as unread, and bulk-manage notifications

---

#### Story 9.11: Feature Flag Management for Q2 Rollout
**Team:** Team B
**FRs:** FR67, FR68, FR69

As a system admin,
I want to manage the 10 Q2 feature flags with per-organization targeting,
So that I can roll out features gradually (Training Center first, then Recruitment, then Service Center).

**Acceptance Criteria:**
- **Given** a system admin accesses feature flag management **When** they toggle a Q2 feature flag **Then** the change propagates in real-time to all services via the existing feature flag infrastructure
- **Given** a feature flag supports org-level targeting **When** the admin enables a flag for specific organizations **Then** only those organizations see the feature; others continue with the previous behavior
- **Given** an organization admin accesses org settings **When** they configure branding, assessment defaults, or email domains **Then** the settings apply only to their organization

---

### Epic 10: Adaptive Testing Engine

#### Story 10.1: Dynamic Difficulty Adjustment During Assessment
**Team:** Team B
**FRs:** FR43, FR44, FR45

As a candidate,
I want the system to dynamically adjust question difficulty based on my performance,
So that I am assessed at my true skill level rather than a fixed difficulty.

**Acceptance Criteria:**
- **Given** adaptive mode is enabled for an assessment **When** a candidate answers a question correctly **Then** the system selects the next question from a higher difficulty tier (if available)
- **Given** a candidate answers incorrectly **When** the system selects the next question **Then** it selects from a lower difficulty tier (if available)
- **Given** a candidate is at the Expert tier and answers correctly **When** the system selects the next question **Then** it remains at Expert tier (ceiling)
- **Given** a candidate is at the Beginner tier and answers incorrectly **When** the system selects the next question **Then** it remains at Beginner tier (floor)
- **Given** difficulty tiers have not been calibrated (all questions are under-calibrated) **When** adaptive mode is enabled **Then** the system falls back to random selection and logs a warning

---

#### Story 10.2: Skill-Level Profile Generation
**Team:** Team B
**FRs:** FR46

As a test manager,
I want the system to generate skill-level profiles from adaptive assessment results,
So that I can see granular capability breakdowns instead of a single percentage score.

**Acceptance Criteria:**
- **Given** a candidate completes an adaptive assessment **When** the system processes the results **Then** a skill-level profile is generated mapping each assessed domain to a proficiency level (e.g., "Algorithms: Expert, System Design: Beginner-Intermediate")
- **Given** the profile is generated **When** a test manager views the candidate's result **Then** the skill-level breakdown is displayed alongside the overall score
- **Given** the adaptive assessment event fires **When** the reporting service consumes `adaptive-assessment-completed` **Then** the skill profile data is stored for analytics and API access

---

#### Story 10.3: Adaptive Mode Configuration
**Team:** Team B
**FRs:** FR47

As a test manager,
I want to enable or disable adaptive mode per assessment,
So that I can choose between fixed-difficulty and adaptive assessments based on the evaluation goal.

**Acceptance Criteria:**
- **Given** a test manager configures an assessment **When** they toggle "Adaptive Mode" on **Then** the assessment uses the adaptive difficulty algorithm during test-taking
- **Given** adaptive mode is enabled **When** the test manager also specifies a starting difficulty tier **Then** the first question is drawn from that tier
- **Given** adaptive mode is disabled **When** candidates take the assessment **Then** questions are served in the fixed order or randomized from pools as before (no difficulty adjustment)
- **Given** the `q2_adaptive_testing` feature flag is disabled **When** a test manager views assessment configuration **Then** the "Adaptive Mode" toggle is not displayed

---

#### Story 10.4: Skill Profile API for External Consumers
**Team:** Team B
**FRs:** FR71

As an external API consumer,
I want to query candidate skill profiles generated by adaptive testing,
So that our CMS can use granular skill-level data for training pipeline decisions.

**Acceptance Criteria:**
- **Given** an external system authenticates via API key **When** it queries the skill profile endpoint for a candidate **Then** the API returns the candidate's skill-level profile (domain, proficiency level, confidence score)
- **Given** a candidate has not taken an adaptive assessment **When** the API is queried **Then** it returns a 404 with a clear message that no adaptive profile is available
- **Given** the skill profile data **When** returned via API **Then** it includes the assessment ID, completion date, and individual domain breakdowns

---

## 6. Implementation Sequence

### Sprint-by-Sprint Timeline (Recommended)

The following timeline spans 6 sprints (12 weeks) aligned with Q2 2026.

```mermaid
gantt
    title Dodokpo Q2 2026 -- Sprint-by-Sprint Implementation
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Team A
    S1: E1 - Question Versioning (1.1, 1.2)           :a1, 2026-04-20, 14d
    S2: E1 - Archiving, Global (1.3, 1.4)             :a2, after a1, 14d
    S2: E2 - Schema + Bloom's (2.1, 2.2)              :a2b, after a1, 14d
    S3: E2 - Override, Distribution (2.3, 2.4)         :a3, after a2, 14d
    S3: E3 - Duplicate Detection (3.1, 3.2)            :a3b, after a2, 14d
    S4: E2 - Intelligent Select, Preview (2.5, 2.6)    :a4, after a3, 14d
    S4: E3 - AI Gen Trigger + Review (3.3, 3.4)        :a4b, after a3, 14d
    S5: E3 - AI Approve/Reject (3.5)                   :a5, after a4, 14d
    S5: E4 - Bulk Upload (4.1, 4.2)                    :a5b, after a4, 14d
    S5: E7 - Calibration Score (7.1)                   :a5c, after a4, 14d
    S6: E7 - Under-calibrated Flagging (7.2)           :a6, after a5, 14d
    S6: E9A - Reporting + Webhooks (9.5-9.9)           :a6b, after a5, 14d

    section Team B
    S1: E5 - Multi-File Editor (5.1, 5.2)              :b1, 2026-04-20, 14d
    S1: E8 - Browser/OS Check (8.1)                    :b1b, 2026-04-20, 14d
    S2: E5 - Judge0 Multi-File (5.3)                   :b2, after b1, 14d
    S2: E8 - Network/Hardware Check (8.2)              :b2b, after b1, 14d
    S3: E6 - Auto-Grading + Logs (6.1, 6.2)           :b3, after b2, 14d
    S3: E8 - Compat Analytics (8.3, 8.4)               :b3b, after b2, 14d
    S4: E6 - Test Case Mgmt + AI Review (6.3, 6.4)    :b4, after b3, 14d
    S4: E8 - Proctoring + Results (8.5, 8.6)           :b4b, after b3, 14d
    S5: E9B - Assessment CRUD, Tags (9.1-9.4)          :b5, after b4, 14d
    S5: E9B - Notifications, Flags (9.10, 9.11)        :b5b, after b4, 14d
    S6: E10 - Adaptive Engine (10.1, 10.2)             :b6, after b5, 14d
    S6: E10 - Config + API (10.3, 10.4)                :b6b, after b5, 14d
```

### Sprint Summary Table

| Sprint | Team A | Team B | Integration Points |
|--------|--------|--------|-------------------|
| S1 (Apr 20 - May 3) | E1: Stories 1.1, 1.2 (Versioning schema, diff) | E5: Stories 5.1, 5.2 (Multi-file editor, config); E8: Story 8.1 (Browser/OS check) | None -- both teams work independently |
| S2 (May 4 - May 17) | E1: Stories 1.3, 1.4 (Archive, global); E2: Stories 2.1, 2.2 (Schema, Bloom's) | E5: Story 5.3 (Judge0 multi-file); E8: Story 8.2 (Network/hardware) | Team B needs question schema awareness from E2 for coding question format |
| S3 (May 18 - May 31) | E2: Stories 2.3, 2.4 (Override, distribution); E3: Stories 3.1, 3.2 (Duplicate detection) | E6: Stories 6.1, 6.2 (Auto-grading, logs); E8: Stories 8.3, 8.4 (Analytics) | Team B auto-grading events consumed by Team A's reporting pipeline |
| S4 (Jun 1 - Jun 14) | E2: Stories 2.5, 2.6 (Auto-fill, preview); E3: Stories 3.3, 3.4 (AI gen, review) | E6: Stories 6.3, 6.4 (Test cases, AI review); E8: Stories 8.5, 8.6 (Proctoring, results) | AI service shared: Team A generation, Team B code review |
| S5 (Jun 15 - Jun 28) | E3: Story 3.5 (Approve/reject); E4: Stories 4.1, 4.2 (Bulk upload); E7: Story 7.1 (Calibration) | E9B: Stories 9.1-9.4 (Assessment CRUD, users, orgs); Stories 9.10, 9.11 (Notifications, flags) | Calibration pipeline (A) consumes assessment events from test-execution (B) |
| S6 (Jun 29 - Jul 12) | E7: Story 7.2 (Under-calibrated flagging); E9A: Stories 9.5-9.9 (Reporting, webhooks) | E10: Stories 10.1-10.4 (Adaptive engine, profiles, API) | Adaptive engine (B) depends on calibrated tiers from calibration pipeline (A) |

---

## 7. Cross-Team Dependency Map

```mermaid
flowchart LR
    subgraph "Team A Stories"
        A_1_1["1.1: Version Schema"]
        A_2_1["2.1: Difficulty Schema"]
        A_2_2["2.2: Bloom's Assignment"]
        A_3_1["3.1: Duplicate Engine"]
        A_7_1["7.1: Calibration Score"]
        A_9_9["9.9: Webhook Enrichment"]
        A_9_5["9.5: Skills Mgmt"]
    end

    subgraph "Team B Stories"
        B_5_2["5.2: Multi-File Config"]
        B_6_1["6.1: Auto-Grading"]
        B_6_4["6.4: AI Code Review"]
        B_8_3["8.3: Compat Analytics"]
        B_9_1["9.1: Assessment Dispatch"]
        B_10_1["10.1: Adaptive Engine"]
        B_10_4["10.4: Skill Profile API"]
    end

    A_2_1 -.->|"difficulty schema needed\nfor question format"| B_5_2
    A_1_1 -.->|"versioning schema\nfor coding questions"| B_5_2
    B_6_1 -.->|"auto-grading results\nenrich webhooks"| A_9_9
    B_6_4 -.->|"AI review data\nenriches reports"| A_9_9
    B_8_3 -.->|"compat check data\nenriches reports"| A_9_9
    A_7_1 -.->|"calibrated tiers required\nfor adaptive"| B_10_1
    A_2_1 -.->|"difficulty classification\nenables adaptive"| B_10_1
    B_10_1 -.->|"skill profiles\nenable API"| B_10_4
    B_10_4 -.->|"skill profile data\nenriches webhooks"| A_9_9
    A_9_5 -.->|"skill-level assignments\nused in dispatch"| B_9_1
    A_3_1 -.->|"duplicate check on\nbulk upload"| B_5_2

    style A_1_1 fill:#4a90d9,color:#fff
    style A_2_1 fill:#4a90d9,color:#fff
    style A_2_2 fill:#4a90d9,color:#fff
    style A_3_1 fill:#4a90d9,color:#fff
    style A_7_1 fill:#4a90d9,color:#fff
    style A_9_9 fill:#4a90d9,color:#fff
    style A_9_5 fill:#4a90d9,color:#fff
    style B_5_2 fill:#2ecc71,color:#fff
    style B_6_1 fill:#2ecc71,color:#fff
    style B_6_4 fill:#2ecc71,color:#fff
    style B_8_3 fill:#2ecc71,color:#fff
    style B_9_1 fill:#2ecc71,color:#fff
    style B_10_1 fill:#2ecc71,color:#fff
    style B_10_4 fill:#2ecc71,color:#fff
```

---

## 8. Story Dependency Chain Per Team

```mermaid
flowchart TD
    subgraph "Team A -- Story Dependency Chain"
        A1_1["1.1: Version Schema"] --> A1_2["1.2: Version Diff"]
        A1_1 --> A1_3["1.3: Archiving"]
        A1_1 --> A1_4["1.4: Global Questions"]
        A1_1 --> A2_1["2.1: Difficulty Schema"]
        A2_1 --> A2_2["2.2: Bloom's Assignment"]
        A2_1 --> A2_3["2.3: Difficulty Override"]
        A2_3 --> A2_4["2.4: Distribution Config"]
        A2_4 --> A2_5["2.5: Intelligent Selection"]
        A2_5 --> A2_6["2.6: Distribution Preview"]
        A1_1 --> A3_1["3.1: Duplicate Engine"]
        A3_1 --> A3_2["3.2: Threshold Config"]
        A1_1 --> A3_3["3.3: AI Gen Trigger"]
        A3_3 --> A3_4["3.4: Review Workflow"]
        A3_4 --> A3_5["3.5: Approve/Reject"]
        A1_1 --> A4_1["4.1: Bulk Upload"]
        A4_1 --> A4_2["4.2: Progress/Errors"]
        A2_1 --> A7_1["7.1: Calibration Score"]
        A7_1 --> A7_2["7.2: Under-calibrated Flagging"]
        A7_1 --> A9_5["9.5: Skills Mgmt"]
        A9_5 --> A9_6["9.6: Skills Bulk Upload"]
        A7_1 --> A9_7["9.7: Enriched Reports"]
        A9_7 --> A9_8["9.8: AI Analytics"]
        A9_8 --> A9_9["9.9: Webhook Enrichment"]
    end

    subgraph "Team B -- Story Dependency Chain"
        B5_1["5.1: Multi-File Editor"] --> B5_2["5.2: Project Config"]
        B5_2 --> B5_3["5.3: Judge0 Multi-File"]
        B5_3 --> B6_1["6.1: Auto-Grading"]
        B6_1 --> B6_2["6.2: Execution Logs"]
        B6_1 --> B6_3["6.3: Test Case Mgmt"]
        B6_1 --> B6_4["6.4: AI Code Review"]
        B8_1["8.1: Browser/OS Check"] --> B8_2["8.2: Network/Hardware"]
        B8_2 --> B8_3["8.3: Compat Analytics"]
        B8_3 --> B8_4["8.4: Rejection Tracking"]
        B8_2 --> B8_5["8.5: Proctoring Debounce"]
        B8_5 --> B8_6["8.6: Candidate Results"]
        B6_4 --> B9_1["9.1: Assessment Dispatch"]
        B9_1 --> B9_2["9.2: Tags/History"]
        B8_6 --> B9_3["9.3: User RBAC"]
        B9_3 --> B9_4["9.4: Org Management"]
        B9_4 --> B9_10["9.10: Notifications"]
        B9_10 --> B9_11["9.11: Feature Flags"]
        B9_11 --> B10_1["10.1: Adaptive Engine"]
        B10_1 --> B10_2["10.2: Skill Profiles"]
        B10_1 --> B10_3["10.3: Adaptive Config"]
        B10_2 --> B10_4["10.4: Skill Profile API"]
    end

    style A1_1 fill:#4a90d9,color:#fff
    style A2_1 fill:#4a90d9,color:#fff
    style A7_1 fill:#4a90d9,color:#fff
    style B5_1 fill:#2ecc71,color:#fff
    style B8_1 fill:#2ecc71,color:#fff
    style B10_1 fill:#2ecc71,color:#fff
```

---

## 9. Integration Points

### 9.1 Shared Artifacts

| Artifact | Owner | Consumers | Coordination |
|----------|-------|-----------|-------------|
| Question schema (Prisma) | Team A | Team B (coding question format) | Team A publishes migration first; Team B adapts question creation flows |
| Kafka topic contracts | Both | Both | Topic schemas documented in shared contract spec; breaking changes require topic versioning |
| AI service API | Shared | Team A (generation), Team B (code review) | Coordinate endpoint additions; avoid conflicting changes to AI service routes |
| Feature flag definitions | Team B (UI) | Team A (backend checks) | Both teams reference same flag names; flags managed in shared config |
| Frontend component library | Both | Both | Both teams commit to dodokpo-core; coordinate PR reviews to avoid merge conflicts |

### 9.2 Coordination Events

| When | What | Who | Format |
|------|------|-----|--------|
| Sprint Planning Part A (every 2 weeks) | Identify cross-team dependencies for upcoming sprint | Both teams + PO | Joint meeting: review dependency map, agree on delivery order, identify blockers |
| Mid-sprint sync (weekly) | Check dependency delivery status | Team leads | 15-min standup: "What did you deliver that unblocks the other team? What do you need?" |
| Sprint Review (every 2 weeks) | Joint demo of integrated features | Both teams + stakeholders | Single review meeting: demonstrate end-to-end flows crossing both teams' work |
| Before Sprint 3 | Schema alignment checkpoint | Team A (schema owners) + Team B (consumers) | Team B validates their flows work with Team A's schema migrations |
| Before Sprint 5 | Calibration-to-execution contract review | Team A (calibration) + Team B (adaptive engine) | Agree on calibration data format, Kafka event schema, and minimum data requirements |
| Before Sprint 6 | Webhook payload review | Team A (reporting) + Team B (adaptive profiles) | Finalize enriched webhook payload schema including skill profiles from adaptive testing |

### 9.3 Continuous Integration Rules

| Rule | Description |
|------|-------------|
| Shared trunk | Both teams merge to `main` daily; CI runs full test suite on every merge |
| Schema migration order | Team A's Prisma migrations run before Team B's code that depends on new fields |
| Feature flag isolation | Both teams can deploy independently because all Q2 features are flag-gated |
| Contract tests | Cross-team API contracts validated by consumer-driven contract tests (Team B writes consumer expectations, Team A validates) |
| Breaking change protocol | Any change to a shared Kafka topic schema or API endpoint requires a PR review from the other team |

### 9.4 Critical Cross-Team Handoffs

| Sprint | From | To | Handoff |
|--------|------|-----|---------|
| S1 to S2 | Team A | Team B | Question versioning schema (QuestionVersion model) available for Team B's coding question configuration |
| S2 to S3 | Team A | Team B | Difficulty tier + Bloom's enums in schema; Team B uses these for coding question metadata |
| S3 to S5 | Team B | Team A | Auto-grading result events published via Kafka; Team A's reporting pipeline consumes them |
| S4 to S5 | Team B | Team A | Compatibility check result events published; Team A integrates into reporting enrichment |
| S5 to S6 | Team A | Team B | Calibration pipeline operational, difficulty tiers actively recalibrating; Team B's adaptive engine depends on reliable calibrated tiers |
| S5 to S6 | Team A | Team B | Webhook enrichment endpoint ready for skill profile data from adaptive testing |

---

## 10. Feature Flag Mapping

All Q2 features are gated. The flag must be checked at both the API layer (backend) and the UI layer (frontend).

| Flag | Epic(s) | Stories | Default | Rollout Order |
|------|---------|---------|---------|---------------|
| `q2_question_versioning` | E1 | 1.1, 1.2, 1.3, 1.4 | disabled | Training Center, Recruitment, Service Center |
| `q2_difficulty_calibration` | E2, E7 | 2.1, 2.3, 2.5, 7.1, 7.2 | disabled | Training Center, Recruitment, Service Center |
| `q2_blooms_taxonomy` | E2 | 2.1, 2.2, 2.4, 2.6 | disabled | Training Center, Recruitment, Service Center |
| `q2_duplicate_detection` | E3 | 3.1, 3.2 | disabled | Training Center, Recruitment, Service Center |
| `q2_ai_question_gen` | E3 | 3.3, 3.4, 3.5 | disabled | Training Center, Recruitment, Service Center |
| `q2_bulk_upload_coding` | E4 | 4.1, 4.2 | disabled | Training Center, Recruitment, Service Center |
| `q2_multifile_coding` | E5, E6 | 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 6.4 | disabled | Training Center, Recruitment, Service Center |
| `q2_compatibility_check` | E8 | 8.1, 8.2, 8.3, 8.4 | disabled | Training Center, Recruitment, Service Center |
| `q2_accessibility` | E8 | 8.5, 8.6 (partial) | disabled | All orgs simultaneously |
| `q2_adaptive_testing` | E10 | 10.1, 10.2, 10.3, 10.4 | disabled | Training Center first (requires calibration maturity) |

---

## 11. NFR Allocation

NFRs apply as cross-cutting constraints to all stories. Key NFR-to-story mappings:

| NFR | Primary Stories Affected | Validation Method |
|-----|-------------------------|------------------|
| NFR1 (API p95 < 200ms) | All API stories | Load testing in staging |
| NFR2 (Auto-grading p99 < 10s) | 6.1, 6.2, 6.4 | Performance testing with concurrent submissions |
| NFR3 (AI marking p95 < 15s) | 6.4, 9.8 | AI service response time monitoring |
| NFR4 (LCP < 2.5s) | 5.1, 8.1, 8.2 | Lighthouse audit in CI |
| NFR5 (500 questions/batch) | 4.1, 4.2 | Load test with 500-question CSV |
| NFR6 (Notification < 2s) | 9.10 | End-to-end notification latency monitoring |
| NFR7 (100 concurrent takers) | 5.3, 6.1, 10.1 | Load testing with 100 simulated candidates |
| NFR8 (100K questions, sub-second search) | 2.5, 3.1 | Index performance testing with scaled data |
| NFR9 (Event processing < 5s) | 7.1, 8.3 | Kafka consumer lag monitoring |
| NFR10-15 (Security) | All stories | Security audit, PII access logging tests |
| NFR16-19 (Reliability) | All stories | Uptime monitoring, auto-save testing, migration compatibility checks |
| NFR20-23 (Accessibility) | 5.1, 8.1, 8.2, 8.5, 8.6 | WCAG 2.1 AA audit (axe-core), manual a11y testing |
| NFR24-27 (Observability) | All stories | Structured log verification, tracing span coverage, Sentry integration |

---

## 12. Definition of Done (Shared)

A story is done when ALL of the following are satisfied:

1. All acceptance criteria pass (demonstrated in Sprint Review)
2. Code is merged to `main` with passing CI (unit tests + linting + type checks)
3. Feature flag gating verified (feature hidden when flag is off)
4. New API endpoints follow existing response format and path conventions
5. New Kafka events have documented schemas
6. Prisma/Sequelize migrations are backward-compatible (additive only)
7. Relevant NFRs are validated (performance, accessibility, security as applicable)
8. No regressions in existing tests
9. Cross-team contract tests pass (if story touches shared interfaces)
10. PII handling follows encryption and audit-logging requirements
