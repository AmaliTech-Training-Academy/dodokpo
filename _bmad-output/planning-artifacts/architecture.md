---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture-backend.md
  - docs/architecture-frontend.md
  - docs/integration-architecture.md
  - docs/api-contracts-backend.md
  - docs/data-models-backend.md
  - docs/component-inventory-frontend.md
  - docs/deployment-guide.md
workflowType: 'architecture'
project_name: 'Dodokpo'
user_name: 'Thomas'
date: '2026-04-15'
status: 'complete'
completedAt: '2026-04-15'
---

# Architecture Decision Document — Dodokpo Assessment Platform

_Brownfield architecture decisions for the existing Dodokpo platform and Q2 2026 enhancements._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 72 FRs across 10 capability areas:
- Question Bank Intelligence (FR1-FR21): Difficulty classification (dual taxonomy: difficulty tiers + Bloom's), self-maintaining calibration, AI-assisted generation, duplicate detection, versioning, bulk upload, archiving, global questions
- Assessment Creation & Dispatch (FR22-FR25): Difficulty-distributed test assembly, multi-channel dispatch
- Coding Assessment Engine (FR26-FR32): Multi-file project IDE, auto-grading with test cases, AI code review
- Candidate Experience & Proctoring (FR33-FR42): Compatibility check, ID verification, face detection, proctoring monitoring, violation tracking, rejection rate analytics
- Adaptive Testing (FR43-FR47): Dynamic difficulty adjustment, skill-level profiling
- User & Organization Management (FR48-FR52): Multi-tenant RBAC (48 permissions), multi-org support
- Skills Management (FR53-FR56): Hierarchical skills, level assignments, CMS integration
- Reporting & Analytics (FR57-FR62): AI-powered analytics, real-time streaming, webhook callbacks
- Notifications (FR63-FR66): Real-time in-app + email notifications
- Feature Flags & Configuration (FR67-FR69): Real-time flag propagation, gradual rollout
- External API Integration (FR70-FR72): API key auth, skill profile queries, webhooks

**Non-Functional Requirements:** 27 NFRs across performance, scalability, security, reliability, accessibility, and observability. Key constraints:
- API Gateway: 200ms p95 response time
- Auto-grading: p99 < 10s
- 100 concurrent assessment-takers per org
- WCAG 2.1 AA compliance
- Encrypted payloads between all services
- At-least-once event delivery

**Scale & Complexity:**
- Primary domain: Full-stack web application (internal platform)
- Complexity level: Enterprise (10 microservices, 3 languages, 5 database types)
- Existing components: 200+ API endpoints, 150+ frontend components, 40+ Kafka topics
- Project context: Brownfield with active Q2 2026 enhancement roadmap

### Technical Constraints & Dependencies

- **Existing codebase:** Must extend, not replace — all Q2 features build on current architecture
- **Polyglot backend:** Node.js (Express/NestJS), Java (Spring Boot), Python (FastAPI) — new features must align with service language
- **Database-per-service:** Each service owns its database — no shared database access across services
- **Event-driven:** Kafka is the integration backbone — new features must publish/consume events consistently
- **Multi-tenant isolation:** All data access scoped to organizationId — Q2 features (global questions, cross-org sharing) must respect org boundaries with explicit governance

### Cross-Cutting Concerns Identified

1. **Question difficulty classification** — Spans test-creation (storage + calibration), test-execution (adaptive delivery), reporting (analytics)
2. **AI provider abstraction** — Spans ai service (generation), test-execution (marking), reporting (analytics) — must support provider switching
3. **Compatibility check** — New pre-test flow affecting test-execution frontend + backend, proctoring pipeline
4. **Accessibility** — Affects all frontend components, especially test-taking flow
5. **Question versioning** — Affects test-creation data model, reporting historical integrity, test-execution cached questions

## Starter Template Evaluation

### Brownfield Assessment

**This is a brownfield project — no starter template needed.** The technology stack is established and production-proven:

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| Frontend Framework | Angular | 20 | Production |
| Frontend Build | Nx + Webpack + Module Federation | Nx 22.6 | Production |
| Frontend State | NgRx Component Store | 20.1 | Production |
| Frontend UI | Angular Material + PrimeNG + TailwindCSS | Material 20, PrimeNG 20, TW 3.4 | Production |
| Backend (Node.js) | Express.js / NestJS | Express 4/5, NestJS 10/11 | Production |
| Backend (Java) | Spring Boot | 3.1.4 (Java 21) | Production |
| Backend (Python) | FastAPI | 0.115+ (Python 3.12+) | Production |
| Primary Database | PostgreSQL | 16 | Production |
| Cache | Redis | 7 | Production |
| NoSQL | DynamoDB | AWS | Production |
| Object Storage | S3 | AWS | Production |
| Messaging | Apache Kafka | KafkaJS / Spring Kafka | Production |
| Job Queue | BullMQ | Redis-backed | Production |
| Code Execution | Judge0 | External API | Production |
| AI Providers | OpenAI / Gemini / Amali AI | GPT-4, Gemini 2.5 Flash | Production |
| CI/CD | Jenkins | Smart change detection | Production |
| Monitoring | Sentry + OpenTelemetry/Jaeger + Prometheus | -- | Production |

**Q2 additions extend this stack — no new frameworks or languages introduced.**

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Q2 Implementation):**
1. Question difficulty data model and calibration algorithm placement
2. Adaptive testing engine location (test-execution vs new service)
3. Multi-file coding IDE architecture (frontend + Judge0 integration)
4. Compatibility check service placement and flow
5. Bloom's Taxonomy integration into question schema

**Important Decisions (Shape Q2 Architecture):**
6. Duplicate detection algorithm and service placement
7. Question versioning schema design
8. AI question generation workflow and review pipeline
9. Bulk upload processing architecture
10. Accessibility implementation strategy

**Deferred Decisions (Post-MVP):**
11. Multi-language assessment localization architecture
12. Framework-specific coding assessment sandboxing
13. CMS integration API design

### Data Architecture

#### Question Difficulty & Bloom's Classification

**Decision:** Extend the existing Question model in test-creation's Prisma schema with:
- `difficultyTier` enum: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
- `bloomsLevel` enum: REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE
- `calibrationScore` float: computed from historical performance data
- `calibrationSampleSize` int: number of candidate responses used for calibration
- `calibrationLastUpdated` datetime: last recalibration timestamp
- `difficultyOverride` boolean: whether tier was manually set
- `difficultyOverrideBy` string: userId of manual override

**Rationale:** Difficulty classification belongs with the question entity. Calibration is a derived property updated asynchronously — not computed on every read.

**Calibration Pipeline:**
- test-execution publishes `complete-link` events with per-question scores → Kafka
- New calibration consumer in test-creation aggregates scores, computes pass rates, time-to-answer distributions
- Calibration runs on a schedule (daily or after N new responses, configurable) — not real-time
- Results written back to Question.calibrationScore and Question.difficultyTier

#### Question Versioning

**Decision:** Implement versioning in test-creation's Prisma schema:
- New `QuestionVersion` model linked to Question (1:many)
- Each edit creates a new version; Question points to `currentVersionId`
- Historical assessment results link to `questionVersionId`, not `questionId` — ensures immutability
- Rollback = update Question.currentVersionId to a previous version

**Rationale:** Append-only versioning preserves assessment integrity. Historical results are never retroactively altered.

#### Duplicate Detection

**Decision:** Implement in test-creation service using text similarity:
- Compute text embeddings for question content (via AI service)
- Store embeddings alongside questions
- On create/edit, compare against existing embeddings within the organization
- Flag matches above configurable similarity threshold (default: 85%)
- UI shows flagged duplicates for human review — does not auto-block

**Rationale:** Embedding-based similarity is more robust than string matching for detecting semantic duplicates. Threshold is configurable to tune precision/recall per org.

### Authentication & Security

**Decision:** No changes to existing JWT + AES encrypted payload architecture for Q2.

Existing pattern (preserved):
- API Gateway validates/re-signs JWT with encrypted payload
- Downstream services decrypt payload to extract user context
- All inter-service calls carry trace context headers
- API key authentication for external integrations via PBKDF2 hashing

**Q2 additions:**
- Compatibility check endpoints are public (pre-auth) — no JWT required
- Question versioning audit trails use existing `userId` from JWT payload
- Global question governance requires new permission checks: `manage_global_questions` added to permission system

### API & Communication Patterns

**Decision:** Extend existing patterns — no new communication paradigms.

| Pattern | Existing | Q2 Extension |
|---------|----------|-------------|
| REST API | All services | New endpoints for difficulty calibration, duplicate detection, compatibility check, bulk upload progress |
| Kafka events | 40+ topics | New topics: `question-calibrated`, `question-duplicate-detected`, `compatibility-check-completed` |
| SSE streams | 5 streams | New stream: compatibility check progress (if check takes > 2s) |
| BullMQ jobs | 3 queues | New queue: `calibration-queue` for batch difficulty recalibration |
| Webhooks | Reporting service | Enriched payloads with skill-level profiles from adaptive testing |

**New Kafka Topics (Q2):**

| Topic | Producer | Consumer | Purpose |
|-------|----------|----------|---------|
| `question-calibrated` | test-creation | notification | Notify admins when difficulty tiers change |
| `question-duplicate-detected` | test-creation | notification | Alert on duplicate detection |
| `compatibility-check-completed` | test-execution | reporting | Track check pass/fail rates |
| `adaptive-assessment-completed` | test-execution | reporting | Skill-level profile data |

### Frontend Architecture

**Decision:** All Q2 frontend features built as standalone Angular components within the existing dodokpo-core app.

| Feature | Location | Key Components |
|---------|----------|---------------|
| Difficulty calibration UI | test-management/questions | DifficultyCalibrationDashboard, BloomsLevelSelector, CalibrationHistoryChart |
| Duplicate detection UI | test-management/questions | DuplicateDetectionAlert, SimilarQuestionCompare |
| Question versioning UI | test-management/questions | VersionHistory, VersionDiff, RollbackConfirm |
| AI question generation | test-management/questions | AIGenerateWizard, ReviewWorkflow, ApproveReject |
| Bulk upload (coding) | test-management/questions | CodingBulkUpload, TemplateDownload, ProgressTracker |
| Compatibility check | test-taker flow | CompatibilityCheck, NetworkTest, HardwareTest, RemediationGuide |
| Multi-file coding IDE | test-taking | MultiFileEditor, FileTree, FileTab, ProjectRunner |
| Adaptive testing config | test-management/assessments | AdaptiveToggle, DifficultyDistribution, SkillProfilePreview |
| Accessibility improvements | cross-cutting | All existing components + new ARIA patterns |

**State Management:** New NgRx ComponentStores:
- `DifficultyCalibrationStore` — calibration data, charts, overrides
- `CompatibilityCheckStore` — check progress, results, remediation state

### Infrastructure & Deployment

**Decision:** No infrastructure changes for Q2. All features deploy on existing infrastructure.

| Component | Existing | Q2 Impact |
|-----------|----------|-----------|
| PostgreSQL | 6 databases | Schema migrations in test-creation (difficulty fields, versioning tables, Bloom's enum) |
| Redis | Shared across services | New cache keys for calibration scores, compatibility check results |
| Kafka | Cluster with 40+ topics | 4 new topics (see above) |
| BullMQ | 3 queues | 1 new queue (calibration) |
| DynamoDB | 3 tables | No changes |
| S3 | 3 buckets | No changes |
| Judge0 | External API | Extended for multi-file project execution |
| Jenkins | Smart change detection | No changes — existing pipeline handles new features |

### Decision Impact Analysis

**Implementation Sequence:**
1. Question versioning schema (unblocks all question-related features)
2. Difficulty classification schema + Bloom's taxonomy (unblocks calibration + intelligent assembly)
3. Duplicate detection (embedding generation + comparison)
4. AI question generation workflow (depends on versioning for review/edit flow)
5. Compatibility check (independent — can parallel with 1-4)
6. Multi-file coding IDE (independent — can parallel)
7. Bulk upload for coding questions (depends on coding model alignment)
8. Accessibility improvements (cross-cutting — can parallel)
9. Calibration pipeline (depends on difficulty schema + historical data)
10. Adaptive testing engine (depends on calibration + difficulty classification)

**Cross-Component Dependencies:**
- Question versioning → affects test-creation schema, test-execution cached data, reporting historical integrity
- Difficulty calibration → requires test-execution to publish per-question scores, test-creation to consume and recalculate
- Adaptive testing → requires calibrated difficulty tiers to exist and be reliable before dynamic adjustment works
- Multi-file coding → requires Judge0 multi-file execution support, frontend file tree + editor components

## Implementation Patterns & Consistency Rules

### Naming Conventions

| Context | Convention | Example |
|---------|-----------|---------|
| Database tables (Prisma) | PascalCase | `QuestionVersion`, `CalibrationScore` |
| Database columns (Prisma) | camelCase | `difficultyTier`, `calibrationScore` |
| Database tables (Sequelize) | camelCase plural | `questionVersions` |
| API endpoints | kebab-case | `/api/v1/question/:orgId/:questionId/versions` |
| Kafka topics | kebab-case | `question-calibrated`, `compatibility-check-completed` |
| Angular components | PascalCase with Component suffix | `DifficultyCalibrationDashboardComponent` |
| Angular services | PascalCase with Service suffix | `CalibrationService` |
| NgRx stores | PascalCase with Store suffix | `DifficultyCalibrationStore` |
| Python modules | snake_case | `difficulty_calibrator.py` |
| Java classes | PascalCase | `CalibrationService.java` |
| Environment variables | UPPER_SNAKE_CASE | `CALIBRATION_MIN_SAMPLE_SIZE` |

### API Response Format

All new endpoints must follow the existing response wrapper pattern:

**Success:** `{ success: true, data: { ... } }`
**Error:** `{ success: false, message: "...", statusCode: 400 }`
**Paginated:** `{ success: true, data: { items: [...], total: N, page: N, size: N } }`

### Error Handling

- Express services: Use existing `AppError` class hierarchy with HTTP status codes
- NestJS services: Use existing `AppHttpException` global exception filter
- FastAPI: Use existing `error_handler` utility
- All errors logged via existing Winston/Spring Boot/Python logging
- All unhandled exceptions captured by existing Sentry integration

### Testing Patterns

| Service Type | Framework | Pattern |
|-------------|-----------|---------|
| Express.js (test-creation, test-execution, user-mgmt, gateway, notification) | Mocha + Chai + Sinon | Unit tests colocated in `test/` or `tests/` directory |
| NestJS (auth, ext-api, test-cases-mgmt) | Jest | Unit tests colocated as `*.spec.ts` |
| Spring Boot (reporting) | Spring Test + JUnit | Tests in `src/test/` |
| FastAPI (ai) | Pytest | Tests in `tests/` directory |
| Angular (frontend) | Jest | Tests colocated as `*.spec.ts` next to components |

**Q2 Testing Requirements:**
- All new FRs must have corresponding unit tests before merge
- Calibration algorithm must have statistical validation tests
- Duplicate detection must have precision/recall test suite
- Compatibility check must have mock tests for each check type (browser, OS, network, hardware)
- Adaptive testing must have scenario tests (all-correct, all-wrong, mixed patterns)

### Feature Flag Pattern

All Q2 features must be gated behind feature flags using the existing `@dodokpo/feature-flag-client`:

| Feature | Flag Name | Default |
|---------|-----------|---------|
| Question difficulty calibration | `q2_difficulty_calibration` | disabled |
| Bloom's taxonomy | `q2_blooms_taxonomy` | disabled |
| Duplicate detection | `q2_duplicate_detection` | disabled |
| AI question generation | `q2_ai_question_gen` | disabled |
| Question versioning | `q2_question_versioning` | disabled |
| Compatibility check | `q2_compatibility_check` | disabled |
| Multi-file coding | `q2_multifile_coding` | disabled |
| Bulk upload coding | `q2_bulk_upload_coding` | disabled |
| Adaptive testing | `q2_adaptive_testing` | disabled |
| Accessibility improvements | `q2_accessibility` | disabled |

**Rollout strategy:** Enable per-organization via feature flag targeting. Training Center first, then Recruitment, then Service Center.

## Project Structure & Boundaries

### Q2 Changes by Service

**test-creation (Express.js):**
```
src/
├── controllers/
│   ├── questionController.ts      # Extended: versioning, calibration, Bloom's endpoints
│   ├── bulkUploadController.ts    # Extended: coding question bulk upload
│   └── duplicateController.ts     # NEW: duplicate detection endpoints
├── services/
│   ├── calibrationService.ts      # NEW: difficulty calibration logic
│   ├── duplicateService.ts        # NEW: embedding comparison + flagging
│   ├── versioningService.ts       # NEW: question version CRUD
│   └── aiGenerationService.ts     # NEW: AI question generation workflow
├── helpers/
│   └── kafkaConsumer.ts           # Extended: calibration event consumer
prisma/
├── schema.prisma                  # Extended: QuestionVersion, difficulty fields, Bloom's enum
└── migrations/                    # NEW: versioning + difficulty + Bloom's migrations
```

**test-execution (Express.js 5):**
```
src/
├── controllers/
│   └── compatibilityController.ts # NEW: pre-test compatibility check endpoints
├── services/
│   ├── compatibilityService.ts    # NEW: browser/OS/network/hardware checks
│   └── adaptiveEngine.ts          # NEW: difficulty adjustment during test
├── helpers/
│   ├── codeExecution.ts           # Extended: multi-file project support
│   └── kafkaPublisher.ts          # Extended: new event topics
```

**frontend (Angular, dodokpo-core):**
```
apps/dodokpo-core/src/app/
├── components/
│   ├── test-management/
│   │   ├── questions/
│   │   │   ├── difficulty-calibration/     # NEW: calibration dashboard
│   │   │   ├── blooms-level-selector/      # NEW: Bloom's taxonomy picker
│   │   │   ├── duplicate-detection/        # NEW: duplicate alerts + comparison
│   │   │   ├── version-history/            # NEW: version diff + rollback
│   │   │   ├── ai-generate-wizard/         # NEW: AI generation workflow
│   │   │   └── coding-bulk-upload/         # NEW: coding question bulk upload
│   │   └── assessments/
│   │       ├── adaptive-toggle/            # NEW: adaptive mode config
│   │       └── difficulty-distribution/    # NEW: difficulty/Bloom's distribution picker
│   ├── test-taker/
│   │   └── compatibility-check/            # NEW: pre-test system check
│   └── test-taking/
│       └── multi-file-editor/              # NEW: multi-file project IDE
├── stores/
│   ├── difficulty-calibration-store/       # NEW
│   └── compatibility-check-store/          # NEW
```

### Service Boundary Rules

| Rule | Description |
|------|-------------|
| Data ownership | Each service reads/writes ONLY its own database. Cross-service data access via API calls or Kafka events only. |
| Event contracts | Kafka message schemas must be documented. Breaking changes require topic versioning (e.g., `question-calibrated-v2`). |
| API contracts | New endpoints must follow existing path conventions: `/api/v1/{resource}/:organizationId/...` |
| Feature flags | All Q2 features gated. No feature reaches production without flag control. |
| Migration safety | All Prisma/Sequelize migrations must be backward-compatible. No destructive column drops without deprecation period. |
| Testing gate | No PR merged without passing tests. New features require tests covering happy path + error cases. |

## Architecture Validation

### Coherence Check

| Check | Status | Notes |
|-------|--------|-------|
| Technology compatibility | PASS | All Q2 features use existing stack — no new frameworks |
| Decision consistency | PASS | Calibration → versioning → adaptive testing dependency chain is coherent |
| Pattern alignment | PASS | All new features follow existing Express/NestJS/Angular patterns |
| Naming consistency | PASS | Conventions documented and aligned with existing codebase |
| Structure alignment | PASS | New files placed in logical locations within existing service structure |

### Requirements Coverage

| FR Category | Architecture Coverage | Gaps |
|-------------|----------------------|------|
| Question Bank Intelligence (FR1-21) | Covered: schema, calibration pipeline, Bloom's enum, versioning model, duplicate embeddings, bulk upload queue | None |
| Assessment Creation (FR22-25) | Covered: difficulty distribution assembly uses calibrated pools | None |
| Coding Assessment (FR26-32) | Covered: multi-file IDE components, Judge0 extension, auto-grading pipeline | Judge0 multi-file API must be verified |
| Candidate Experience (FR33-42) | Covered: compatibility check service + frontend, rejection rate tracking | None |
| Adaptive Testing (FR43-47) | Covered: adaptive engine in test-execution, depends on calibration | Post-MVP — requires calibration maturity |
| User/Org Management (FR48-52) | Covered: existing architecture, new `manage_global_questions` permission | None |
| Skills Management (FR53-56) | Covered: existing architecture | None |
| Reporting (FR57-62) | Covered: new Kafka topics for calibration + compatibility data | None |
| Notifications (FR63-66) | Covered: existing architecture + new event topics | None |
| Feature Flags (FR67-69) | Covered: existing flag system + Q2 flag names defined | None |
| External API (FR70-72) | Covered: existing architecture + enriched webhook payloads | None |

### NFR Coverage

| NFR Category | Architecture Support |
|-------------|---------------------|
| Performance (NFR1-6) | Existing infrastructure. Calibration runs async (BullMQ), not on request path. |
| Scalability (NFR7-9) | No new bottlenecks. Calibration is batch, not per-request. |
| Security (NFR10-15) | Existing JWT/encryption preserved. New permission for global questions. |
| Reliability (NFR16-19) | Kafka at-least-once delivery for new topics. Migration backward-compatibility enforced. |
| Accessibility (NFR20-23) | Cross-cutting WCAG 2.1 AA work documented as feature-flagged incremental improvement. |
| Observability (NFR24-27) | Existing Sentry + OpenTelemetry + Prometheus extended to new features automatically. |

### Risk Assessment

| Risk | Mitigation | Status |
|------|-----------|--------|
| Calibration accuracy with insufficient data | Minimum sample size threshold (configurable). Flag under-calibrated questions. | Addressed in FR5-6 |
| Duplicate detection false positives | Configurable similarity threshold. Human review required — never auto-block. | Addressed in architecture |
| Multi-file Judge0 support | Verify Judge0 API supports multi-file submission. Fallback: single-file concatenation. | Requires verification |
| Adaptive testing fairness | Phase to post-MVP. Validate calibration quality before enabling adaptive. | Addressed in sequencing |
| Migration backward-compatibility | All migrations additive (new columns/tables). No column drops. Zero-downtime deploy. | Addressed in boundary rules |
