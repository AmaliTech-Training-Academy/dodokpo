# Dodokpo Assessment Platform -- Development Guide

## Prerequisites

| Requirement | Version | Used By |
|-------------|---------|---------|
| Node.js | 20+ | All Node.js backend services, frontend |
| Java | 21 | Reporting service |
| Python | 3.12+ | AI service |
| Docker & Docker Compose | Latest | Local infrastructure |
| PostgreSQL | 16+ | Auth, user-mgmt, test-creation, test-execution, notification, ext-api |
| Redis | 7+ | API gateway, test-creation, test-execution, notification, reporting, ext-api |
| Apache Kafka | Latest | Event-driven communication between services |
| AWS CLI (optional) | Latest | For DynamoDB local, S3 (LocalStack), Lambda |
| uv (optional) | Latest | Python dependency management for AI service |

## Repository Setup

```bash
# Clone the workspace (both repos)
cd Dodokpo/

# Backend is at backend/ (separate git repo)
# Frontend is at frontend/ (separate git repo)
```

## Infrastructure Setup (Docker Compose)

The backend provides a unified Docker Compose for all infrastructure:

```bash
cd backend/

# Start infrastructure only (Postgres, Redis, Kafka, DynamoDB, LocalStack)
docker compose up

# Start infrastructure + specific services
docker compose --profile auth up           # Infra + auth
docker compose --profile gateway --profile auth up  # Multiple services

# Start everything
docker compose --profile all up
```

**Infrastructure services** (start automatically, no profile needed):
- PostgreSQL (port 5432) -- user: `dodokpo_dev`, password: `dodokpo_dev_pass`
- Redis (port 6379)
- Zookeeper (port 2181)
- DynamoDB Local (port 8000)
- LocalStack/S3 (port 4566)

## Backend Services

### Node.js Services (Express/NestJS)

Each service is independent with its own `package.json`:

```bash
cd backend/apps/<service-name>/

# Install dependencies
npm install

# Environment setup
cp example.env .env    # or sample.env
# Edit .env with your local config

# Database setup (Prisma-based services)
npx prisma generate
npx prisma migrate deploy

# Database setup (Sequelize-based: user-management)
npm run migrate
npm run seed

# Development
npm run dev            # Express services (nodemon + ts-node)
# OR
npm run start:dev      # NestJS services (nest start --watch)

# Build
npm run build

# Production
npm start
```

**Service ports** (defaults from configs):
| Service | Default Port |
|---------|-------------|
| api-gateway | 8001 |
| authentication | (from PORT env) |
| user-management | 3001 |
| test-creation | 4204 |
| test-execution | 4205 |
| notification | 3001 |
| external-api-integration | (from PORT env) |

### Reporting Service (Java/Spring Boot)

```bash
cd backend/apps/reporting/

# Build
./mvnw clean package

# Run
./mvnw spring-boot:run

# Or with Docker
docker compose -f docker-compose.dev.yml up
```

### AI Service (Python/FastAPI)

```bash
cd backend/apps/ai/

# Install dependencies (using uv)
uv sync --dev

# Or using pip
pip install -e ".[dev]"

# Development
poe dev              # uvicorn with --reload on port 8000

# Production
poe start            # uvicorn on 0.0.0.0:8000

# Serverless deployment
poe deploy-dev       # Deploy to AWS Lambda (dev stage)
```

### Test Cases Management (Serverless)

```bash
cd backend/apps/test-cases-management/

# Install
npm install

# Local development (serverless-offline)
npm run sls:offline

# Deploy
npm run sls:deploy
```

## Frontend

```bash
cd frontend/

# Install dependencies
npm install

# Environment setup
cp .env.example .env

# Start development server (dodokpo-core on port 4200)
npm start

# Start both apps (core + next on port 4201)
npm run start:servers

# Build all apps
npm run build

# Build with bundle analysis
npm run build:analyze
```

## Testing

### Backend Node.js Services

| Service | Framework | Command |
|---------|-----------|---------|
| api-gateway | Mocha/Chai/Sinon | `npm test` |
| authentication | Jest | `npm test` |
| user-management | Mocha/Chai/Sinon | `npm test` |
| test-creation | Mocha/Chai | `npm test` |
| test-execution | Mocha/Chai/Sinon | `npm test` |
| test-cases-management | Jest | `npm test` |
| notification | Jest | `npm test` |
| external-api-integration | Jest | `npm test` |

### Reporting (Java)
```bash
./mvnw test
```

### AI Service (Python)
```bash
poe test              # Run all tests
poe test-cov          # With coverage
poe test-fast         # Stop on first failure
poe quality           # Lint + format check + tests
```

### Frontend
```bash
npm test                    # Run all tests (Jest via Nx)
npm run test:watch          # Watch mode
npm run test:fullCoverage   # Full coverage report
npm run test:changed        # Only changed app tests
```

## Linting & Formatting

### Backend
```bash
# Per service
npm run lint          # ESLint
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier

# AI service
poe lint              # Ruff check
poe lint-fix          # Ruff auto-fix
poe format            # Ruff format
```

### Frontend
```bash
npm run lint          # ESLint all apps
npm run lint:fix      # Auto-fix
npm run format        # Prettier
npm run format:check  # Check only
```

## Code Quality

- **SonarQube**: Both backend services and frontend have `sonar-project.properties`
- **Commitlint**: Conventional commits enforced via Husky + commitlint
- **Pre-commit hooks**: Husky + lint-staged for linting on commit

## Environment Variables

All services require a `.env` file. Key shared variables:

| Variable | Used By | Description |
|----------|---------|-------------|
| `JWT_SECRET` | All backend | JWT signing/verification secret |
| `JWT_ENCRYPTION_KEY` | All backend | AES key for JWT payload encryption |
| `JWT_ENCRYPTION_ALGO` | All backend | AES algorithm (aes-256-cbc) |
| `KAFKA_BOOTSTRAP_SERVERS` | All backend | Kafka broker address |
| `REDIS_HOST` / `REDIS_PORT` | Most backend | Redis connection |
| `DATABASE_URL` | Prisma services | PostgreSQL connection string |
| `SENTRY_DSN` | All | Sentry error tracking |
| `SYSTEM_INDEX` | Auth, user-mgmt, gateway | System organization UUID |

## Key Development Patterns

1. **JWT flow**: API Gateway receives requests, validates/re-signs JWT with encrypted payload, forwards to downstream services
2. **Kafka events**: Services communicate asynchronously via Kafka topics (user lifecycle, assessment events, notifications)
3. **Feature flags**: Managed via dedicated endpoints, distributed via Kafka + SSE
4. **Prisma migrations**: Run `npx prisma migrate deploy` after pulling changes
5. **Sequelize migrations**: Run `npm run migrate` for user-management service
6. **Module Federation**: Frontend loads `dodokpo-next` as a remote at runtime
