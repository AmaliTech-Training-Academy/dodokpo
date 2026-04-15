# Dodokpo Assessment Platform -- Documentation Index

## Project Overview

- **Type:** Multi-part (2 git repos) with backend microservices monorepo + frontend Nx monorepo
- **Primary Languages:** TypeScript, Java, Python
- **Architecture:** Microservices with API Gateway, event-driven via Apache Kafka
- **Frontend:** Angular 20, Nx, Module Federation, NgRx Component Store, TailwindCSS

### Quick Reference

#### Backend (10 microservices + 1 shared package)

| Service | Framework | Database |
|---------|-----------|----------|
| api-gateway | Express.js | Redis |
| authentication | NestJS 10 | PostgreSQL (Prisma) |
| user-management | Express.js | PostgreSQL (Sequelize) |
| test-creation | Express.js | PostgreSQL (Prisma), Redis, BullMQ |
| test-execution | Express.js 5 | PostgreSQL (Prisma), Redis |
| test-cases-management | NestJS 11 (Lambda) | DynamoDB, S3 |
| reporting | Spring Boot 3.1.4 | DynamoDB, Redis |
| ai | FastAPI | DynamoDB |
| notification | Express.js | PostgreSQL (Prisma) |
| external-api-integration | NestJS 10 | PostgreSQL (Prisma), Redis |
| feature-flag-client | TypeScript (shared) | In-memory |

#### Frontend (Nx monorepo)

| App/Lib | Framework | Role |
|---------|-----------|------|
| dodokpo-core | Angular 20 | Module Federation Host (main app) |
| dodokpo-next | Angular 20 | Module Federation Remote (expansion) |
| libs/shared | Angular | Shared services, interfaces, directives, styles, utils |


## Existing Documentation

### Backend

- [Backend README](../backend/README.md) -- Project overview and service inventory
- [Backend CONTRIBUTING](../backend/CONTRIBUTING.md) -- Contribution guidelines
- [AI Service README](../backend/apps/ai/README.md) -- AI service documentation
- [AI Service Diagnosis](../backend/apps/ai/AI-SERVICE-DIAGNOSIS.md) -- Troubleshooting guide
- [API Gateway README](../backend/apps/api-gateway/README.md) -- API Gateway documentation
- [Authentication README](../backend/apps/authentication/README.md) -- Auth service documentation
- [External API README](../backend/apps/external-api-integration/README.md) -- External API documentation
- [Notification README](../backend/apps/notification/README.md) -- Notification service documentation
- [Reporting README](../backend/apps/reporting/README.md) -- Reporting service documentation
- [Test Creation README](../backend/apps/test-creation/README.md) -- Test creation documentation
- [Test Cases Management README](../backend/apps/test-cases-management/README.md) -- Test cases documentation
- [Test Execution README](../backend/apps/test-execution/README.md) -- Test execution documentation
- [User Management README](../backend/apps/user-management/README.md) -- User management documentation

### Frontend

- [Frontend README](../frontend/README.md) -- Frontend project documentation
- [AMAP Frontend Documentation](../frontend/AMAP_Frontend_Documentation.md) -- Frontend architecture docs
- [Nx Module Federation](../frontend/docs/NX_MODULE_FEDERATION.md) -- Module Federation setup
- [Face Detection](../frontend/FACE_DETECTION_README.md) -- Face detection feature
- [ID Face Verification Fix](../frontend/ID_FACE_VERIFICATION_URI_FIX.md) -- ID verification fix
- [Performance Fixes](../frontend/PERFORMANCE_FIXES.md) -- Performance optimizations
- [Performance Optimizations](../frontend/PERFORMANCE_OPTIMIZATIONS.md) -- Additional optimizations
- [Question Performance Fixes](../frontend/QUESTION_PERFORMANCE_FIXES.md) -- Question rendering fixes
- [Screen Switching Monitor](../frontend/docs/SCREEN_SWITCHING_MONITOR.md) -- Screen switching detection
- [Coding Questions Analytics](../frontend/docs/CODING_QUESTIONS_ANALYTICS.md) -- Coding analytics feature
- [Reroute Page Improvements](../frontend/docs/REROUTE_PAGE_IMPROVEMENTS.md) -- Reroute page changes
- [Face Detection Lazy Loading](../frontend/docs/FACE_DETECTION_LAZY_LOADING.md) -- Lazy loading for face detection
- [ID Verification UX Improvements](../frontend/docs/ID_VERIFICATION_UX_IMPROVEMENTS.md) -- ID verification UX


*Generated on 2026-04-15 by BMAD Document Project (exhaustive scan)*
