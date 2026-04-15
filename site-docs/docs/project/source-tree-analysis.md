# Dodokpo Assessment Platform -- Source Tree Analysis

## Repository Structure

This workspace contains two independent git repositories under a single parent directory.

```
Dodokpo/
├── backend/                          # Backend Monorepo (separate git repo)
│   ├── apps/                         # 10 Microservices
│   │   ├── api-gateway/              # Express.js -- Single entry point, routing, rate limiting, circuit breaker
│   │   │   ├─��� src/
│   │   │   │   ├── bin/server.ts         # HTTP server bootstrap (port 8001)
│   │   │   │   ├── app.ts               # Express app setup, proxy routes
│   │   │   │   ├── helpers/             # Redis cache, JWT encryption, proxy config, sendmail, feature flags
│   │   │   │   ├── middlewares/         # Rate limiter, circuit breaker, auth, metrics, sanitizePath, adminOnly
│   │   │   │   └── routes/             # Feature flag routes, proxy routes
│   │   │   └── tests/
│   │   │
│   │   ├── authentication/           # NestJS -- JWT auth, session management
│   │   │   ├── src/
│   │   │   │   ├── main.ts              # NestJS bootstrap
│   │   │   │   ├── auth/               # Auth controller, service, logout service, DTOs
│   │   │   │   ├── jwt-token/          # JWT token generation/verification service
│   │   │   │   ├── mailing/            # Email service (password reset, invites)
│   │   │   │   ├── kafka/              # Kafka consumer (user sync, role sync)
│   │   │   │   ├── task/               # Cron tasks (unblock users, cleanup tokens)
│   │   │   │   ├── helper/             # Server call service (calls user-management)
│   │   │   │   └── guards/             # AuthGuard, UserAccessGuard, ResetTokenGuard, etc.
│   │   │   ├── prisma/
│   │   │   │   └── schema.prisma        # User, Role, Permission, AuthToken, UnauthorizeRequest
│   │   │   └── test/
│   │   │
│   │   ├── user-management/          # Express.js -- Users, roles, permissions, organizations
│   │   │   ├── src/
│   │   │   │   ├── bin/server.ts
│   │   │   │   ├── app.ts
│   │   │   │   ├── controllers/        # User, Role, Organization, Application controllers
│   │   │   │   ├── services/           # Business logic for all CRUD operations
│   │   │   │   ├── middlewares/        # Auth, RBAC, validation, S3 upload, conflict guards
│   │   │   │   ├── models/            # Sequelize models (User, Role, Permission, Organization, etc.)
│   │   │   │   ├── helpers/           # Kafka producer/consumer, Redis, email
│   │   │   │   └── routes/            # User, Role, Admin, Application, ServiceCall routes
│   │   │   ├── migrations/            # Sequelize migrations
│   │   │   └── tests/
│   │   │
│   │   ├── test-creation/            # Express.js -- Test design, questions, assessments, skills
│   │   │   ├── src/
│   │   │   │   ├── bin/server.ts
│   │   │   │   ├── app.ts
│   │   │   │   ├── controllers/        # Test, Question, Assessment, Domain, Skill, BulkUpload controllers
│   │   │   │   ├── services/           # Business logic, SSE streams
│   │   │   │   ├── middlewares/        # Auth, RBAC, validation, retake delay, analytics
│   │   │   │   ├── helpers/           # Kafka, BullMQ queues, schedule, notifications
│   │   │   │   └── routes/            # Test, Question, Assessment, Domain, Skill, Config routes
│   │   │   ├── prisma/                # Assessment, Test, Question, Skill, Domain schemas
│   │   │   └── test/
│   │   │
│   │   ├── test-execution/           # Express.js 5 -- Test delivery, proctoring, code execution
│   │   │   ├── src/
│   │   │   │   ├── bin/server.ts
│   │   │   │   ├── app.ts
│   │   │   │   ├── controllers/        # Assessment taking, results, analytics, retake controllers
│   │   │   │   ├── services/           # Question analytics, question flags, code execution
│   │   │   │   ├── middlewares/        # Auth, fingerprint validation, test-taker access control
│   │   │   │   ├── helpers/           # AI marker (OpenAI/Gemini), code execution (Judge0), Kafka, assessment report
│   │   │   │   └── routes/            # Assessment taking, results, analytics routes
│   │   │   ├── prisma/                # AssessmentTaker, TestResult, Draft, ScreenShot, WindowViolation schemas
│   │   │   └── tests/
│   │   │
│   │   ├── test-cases-management/    # NestJS 11 Serverless -- Test case CRUD on AWS Lambda
│   │   │   ├── src/
│   │   │   │   ├── main.ts              # Local NestJS bootstrap
│   │   │   │   ├── lambda.ts            # AWS Lambda handler (Mangum)
│   │   │   │   ├── test-cases/         # Controller, service, DTOs
│   │   │   │   └── common/             # DynamoDB service, S3 service, exception filter
│   │   │   ├── serverless.ts            # Serverless Framework config (Node 22, 256MB)
│   │   │   └── test/
│   │   │
│   │   ├── reporting/                # Java/Spring Boot 3.1.4 -- Analytics, scoring, reports
│   │   │   ├���─ src/main/java/com/amap/amapreportmanagementservice/
│   │   │   │   ├── AmapReportManagementServiceApplication.java  # Spring Boot entry
│   │   │   │   ├── controller/         # ReportController (20+ endpoints)
│   │   │   │   ├── service/            # ResponseService, CandidateAssessmentService, AIAnalyticsService
│   │   │   │   ├── model/             # DynamoDB entities (Assessment, CandidateAssessment, TestQuestion, etc.)
│   │   │   │   ├── repository/        # DynamoDB repositories
│   │   │   │   ├── config/            # Security, DynamoDB, Redis, Kafka, CORS configs
│   │   │   │   └── kafka/             # Kafka consumers (results, progress, flags, survey)
│   │   │   ├── src/test/
│   │   │   └── pom.xml
│   │   │
│   │   ├── ai/                       # Python/FastAPI -- AI essay marking, code review, question generation
│   │   │   ├── app/
│   │   │   │   ├── main.py              # FastAPI entry, Lambda handler (Mangum)
│   │   │   │   ├── routers/            # Health, assessment, jobs routers
│   │   │   │   ├── services/           # AI providers (OpenAI, Gemini, AmaliAI), essay marker, code reviewer, test generator
│   │   │   │   ├── models/            # Pydantic request/response models
│   │   │   │   ├── utils/             # JSON repair, prompt templates
│   │   │   │   └── core/config.py     # Configuration
│   │   │   ├── tests/                  # pytest tests (unit + integration)
│   │   │   └── pyproject.toml
│   │   │
│   │   ├── notification/             # Express.js -- Email, SSE in-app notifications via Kafka
│   │   │   ├── src/
│   │   │   │   ├── bin/server.ts
│   │   │   │   ├── app.ts
│   │   │   │   ├── controllers/        # Notification CRUD, settings, SSE stream
│   │   │   │   ├── services/           # Notification service, SSE channel, message handlers
│   │   │   │   ├── helpers/           # Kafka consumer (26 topics), email sender
│   │   │   │   └── middlewares/        # Auth, feature flag guard
│   │   │   ├── prisma/                # Notification, NotificationConfiguration, NotificationType schemas
│   │   │   └── tests/
│   │   │
│   │   └── external-api-integration/ # NestJS -- Third-party API key management
│   │       ├── src/
│   │       │   ├── main.ts
│   │       │   ├── auth/               # Account controller, service, guards
│   │       │   ├── prisma/             # Prisma service
│   │       │   ├── redis/              # Redis cache service
│   │       │   └── hash/               # PBKDF2 hashing service
│   │       ├── prisma/                # Account, APIKey schemas
│   │       └── test/
│   │
│   ├── packages/
│   │   ���── feature-flag-client/      # Shared in-memory feature flag cache + Express guard middleware
│   │       └── src/index.ts
│   │
│   ├── docker/
│   │   └── init-postgres.sh           # PostgreSQL multi-database init script
│   ├── docker-compose.yml             # Infrastructure: Postgres, Redis, Zookeeper, Kafka, DynamoDB, LocalStack
│   ├── Jenkinsfile                    # CI/CD pipeline with smart change detection
│   ├── CONTRIBUTING.md
│   └── README.md
│
├── frontend/                          # Frontend Nx Monorepo (separate git repo)
│   ├── apps/
│   │   ├── dodokpo-core/             # Main Angular app (Module Federation Host)
│   │   │   ├── src/
│   │   │   │   └── app/
│   │   │   │       ├─�� app.routes.ts         # Root routes (login, dashboard, test-taker, test-taking)
│   │   │   │       ├── app.provider.ts       # App initializers (Sentry, feature flags, Monaco preload)
│   │   │   │       ├── components/           # 100+ UI components organized by feature
│   │   │   │       ├── services/             # Auth, analytics, feature flags, theme, proctoring, etc.
│   │   │   │       ├── stores/               # NgRx ComponentStores (assessment, question, test, coding, skills, reports)
│   │   │   │       ├── Interfaces/Types/     # TypeScript interfaces for all domains
│   │   │   │       ├── pipes/                # Display, filter, search, time-ago, truncate
│   │   │   │       ├── workers/              # Web Workers (CSV parsing, file parsing)
│   │   │   │       └── routes/               # Feature-area route configs (test-mgmt, reports, users, etc.)
│   │   │   ├── module-federation.config.ts   # Host config, remotes: ['dodokpo-next']
│   │   │   └── webpack.config.ts
│   │   │
│   │   └── dodokpo-next/            # Secondary Angular app (Module Federation Remote)
│   │       ├── src/app/
│   │       │   └── remote-entry/entry.routes.ts  # Exposed routes
│   │       ├── module-federation.config.ts       # Remote config, exposes './Routes'
│   │       └── webpack.config.ts
│   │
│   ├── libs/
│   │   └── shared/                   # Shared library
│   │       ├── config/               # Environment configuration (@shared/config)
│   │       ├── directives/           # DurationDirective, SafeHtmlDirective, HtmlTooltipDirective
│   │       ├── interfaces/           # 50+ shared TypeScript interfaces (@shared/interfaces)
│   │       ├── services/             # 13 shared services (@shared/services)
│   │       ├── styles/               # Material theme, global CSS, design tokens
│   │       └── utils/                # Permissions, constants, regex, coding utils
│   │
│   ├── src/assets/                   # Static assets (images, fonts)
│   ├── __mocks__/                    # Jest mocks
│   ├── scripts/                      # Build scripts (Nx wrapper, coverage merge, image optimization)
│   ├── nginx/                        # Nginx configuration
│   ├── docs/                         # Feature-specific documentation
│   ├── package.json                  # Root package.json (Angular 20, Nx 22)
│   ├── nx.json                       # Nx workspace config
│   ├── tsconfig.json                 # TypeScript config
│   ├── tailwind.config.js            # TailwindCSS (class-based dark mode)
│   ├── Jenkinsfile                   # Frontend CI/CD pipeline
│   └── Dockerfile
│
├── _bmad/                            # BMAD methodology tooling
├── _bmad-output/                     # BMAD output artifacts
├── .claude/                          # Claude Code configuration
├── .github/                          # GitHub skills/workflows
└── docs/                             # Project-level documentation (this folder)
```

## Critical Folders Summary

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `backend/apps/api-gateway/src/` | All traffic enters here | `app.ts`, `middlewares/circuitBreaker.ts`, `middlewares/rateLimiter.ts` |
| `backend/apps/authentication/src/auth/` | Login, password, JWT tokens | `auth.service.ts`, `logout.service.ts` |
| `backend/apps/user-management/src/models/` | Core user/org/role data models | Sequelize models for User, Role, Organization |
| `backend/apps/test-creation/prisma/` | Assessment domain schema | `schema.prisma` (Assessment, Test, Question, Skill, Domain) |
| `backend/apps/test-execution/src/helpers/` | Test delivery engine | `assessmentReport.ts`, `codeExecution.ts`, `AImarker/` |
| `backend/apps/reporting/src/main/java/.../service/` | Report generation | `ResponseServiceImpl.java`, `AIAnalyticsServiceImpl.java` |
| `backend/apps/ai/app/services/` | AI capabilities | `essay_marker.py`, `code_reviewer.py`, `test_generator.py` |
| `frontend/apps/dodokpo-core/src/app/stores/` | Frontend state | NgRx ComponentStores for all domains |
| `frontend/apps/dodokpo-core/src/app/services/` | Frontend services | `auth.service.ts`, `feature-flag.service.ts`, `proctoring.service.ts` |
| `frontend/libs/shared/` | Cross-app shared code | Interfaces, services, directives, styles, utils |

## Entry Points

| Part | Entry Point | Description |
|------|------------|-------------|
| Backend API Gateway | `backend/apps/api-gateway/src/bin/server.ts` | HTTP server, all traffic proxy |
| Backend Auth | `backend/apps/authentication/src/main.ts` | NestJS bootstrap |
| Backend User Mgmt | `backend/apps/user-management/src/bin/server.ts` | HTTP server |
| Backend Test Creation | `backend/apps/test-creation/src/bin/server.ts` | HTTP server + BullMQ workers |
| Backend Test Execution | `backend/apps/test-execution/src/bin/server.ts` | HTTP server + cron jobs |
| Backend Test Cases | `backend/apps/test-cases-management/src/lambda.ts` | AWS Lambda handler |
| Backend Reporting | `backend/apps/reporting/src/.../AmapReportManagementServiceApplication.java` | Spring Boot |
| Backend AI | `backend/apps/ai/app/main.py` | FastAPI + Mangum (Lambda) |
| Backend Notification | `backend/apps/notification/src/bin/server.ts` | HTTP server + Kafka consumer |
| Backend Ext API | `backend/apps/external-api-integration/src/main.ts` | NestJS bootstrap |
| Frontend Core | `frontend/apps/dodokpo-core/src/main.ts` | Angular bootstrap (MF host) |
| Frontend Next | `frontend/apps/dodokpo-next/src/main.ts` | Angular bootstrap (MF remote) |
