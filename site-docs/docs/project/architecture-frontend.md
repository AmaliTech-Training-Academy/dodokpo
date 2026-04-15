# Dodokpo Assessment Platform -- Frontend Architecture

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Module Federation Architecture](#2-module-federation-architecture)
3. [Routing Architecture](#3-routing-architecture)
4. [State Management](#4-state-management)
5. [Service Layer](#5-service-layer)
6. [Authentication & Security](#6-authentication--security)
7. [Proctoring Pipeline](#7-proctoring-pipeline)
8. [UI Component Architecture](#8-ui-component-architecture)
9. [Theming & Design System](#9-theming--design-system)
10. [Testing Strategy](#10-testing-strategy)

---

## 1. Executive Summary

The Dodokpo Assessment Platform frontend is an **Angular 20** application organized as an **Nx monorepo** (`frontend/`) with a **Webpack Module Federation** architecture. It ships two applications -- `dodokpo-core` (the host shell) and `dodokpo-next` (a federated remote) -- plus a shared library workspace under `libs/shared`.

The platform serves two distinct user populations with fundamentally different security models:

- **Organization administrators and recruiters** access a full dashboard for managing domains, questions, tests, assessments, skills, reports, users, roles, and feature flags.
- **Test-taker candidates** follow a guided assessment pipeline that includes identity verification (OCR via tesseract.js), face capture (face-api.js), real-time proctoring (webcam + screen monitoring), and a timed exam experience with coding support (Monaco Editor + Judge0).

Key technology choices:

| Concern | Technology |
|---|---|
| Framework | Angular 20.3.x (standalone components, no NgModules) |
| Monorepo | Nx with manual `run-nx-no-plugins.mjs` wrapper |
| Module Federation | `@nx/module-federation/angular` (Webpack 5) |
| State Management | NgRx ComponentStore (7 stores, all `providedIn: 'root'`) |
| UI Libraries | Angular Material (M2), PrimeNG, TailwindCSS (class-based dark mode) |
| HTTP | Angular HttpClient (interceptors) + Axios (guards only) |
| Real-time | Server-Sent Events (notifications, feature flags, analytics streaming) |
| Code Editor | Monaco Editor (conditional preload on coding routes) |
| Analytics | Segment (`@segment/analytics-next`) |
| Error Tracking | Sentry (`@sentry/angular`) |
| Testing | Jest + jest-preset-angular (353 spec files, 80% line coverage threshold) |
| Code Quality | ESLint, SonarQube, Husky + lint-staged + commitlint |

The codebase contains **253 components**, **353 test files**, **612 lines of permission definitions** across 48 access groups, and **80+ CSS custom properties** powering light/dark theming.

---

## 2. Module Federation Architecture

### 2.1 Overview

The frontend uses Webpack 5 Module Federation to split the application into independently deployable units. This enables the `dodokpo-next` remote to evolve and deploy separately from the core shell.

```
+-------------------------------+        +-----------------------------+
|        dodokpo-core           |        |       dodokpo-next          |
|         (Host Shell)          | <----> |         (Remote)            |
|                               |        |                             |
|  module-federation.config.ts  |        |  module-federation.config.ts|
|  - name: 'dodokpo-core'      |        |  - name: 'dodokpo-next'     |
|  - remotes: ['dodokpo-next']  |        |  - exposes: './Routes'      |
|  - exposes: {}                |        |    -> entry.routes.ts       |
+-------------------------------+        +-----------------------------+
```

```mermaid
graph LR
    subgraph "Host: dodokpo-core"
        HC[module-federation.config.ts<br/>name: dodokpo-core]
        AppRoutes["app.routes.ts<br/>/next/** → loadChildren()"]
    end

    subgraph "Remote: dodokpo-next"
        RC[module-federation.config.ts<br/>name: dodokpo-next]
        EntryRoutes["entry.routes.ts<br/>exposes: ./Routes"]
    end

    subgraph "Shared Singletons"
        AC["@angular/core"]
        ACom["@angular/common"]
        AR["@angular/router"]
    end

    subgraph "Shared Library"
        LS["libs/shared<br/>@shared/services<br/>@shared/interfaces<br/>@shared/utils<br/>@shared/directives<br/>@shared/config"]
    end

    HC -- "remotes: ['dodokpo-next']" --> RC
    AppRoutes -- "import('dodokpo-next/Routes')" --> EntryRoutes
    HC --- AC & ACom & AR
    RC --- AC & ACom & AR
    HC --- LS
    RC --- LS

    subgraph "nginx (same origin)"
        N1["/ → dodokpo-core"]
        N2["/next/ → dodokpo-next"]
    end

    N1 -. "loads remoteEntry.mjs" .-> N2
```

### 2.2 Host Configuration (dodokpo-core)

```typescript
// apps/dodokpo-core/module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'dodokpo-core',
  remotes: ['dodokpo-next'],
  exposes: {},
  shared: (libraryName, defaultConfig) => {
    if (SINGLETON_LIBS.includes(libraryName)) {
      return { ...defaultConfig, singleton: true, strictVersion: true };
    }
    return defaultConfig;
  },
};
```

The host Webpack config merges a fallback configuration for Node.js polyfills (`fs: false`, `path: false`, `crypto: false`) required by dependencies like `tesseract.js` and `crypto-js`. In production, the remote entry resolves to `/next/remoteEntry.mjs` (same-origin nginx), while development uses the Nx dev server on `localhost:4201`.

### 2.3 Remote Configuration (dodokpo-next)

```typescript
// apps/dodokpo-next/module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'dodokpo-next',
  exposes: {
    './Routes': './apps/dodokpo-next/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (SINGLETON_LIBS.includes(libraryName)) {
      return { ...defaultConfig, singleton: true, strictVersion: true };
    }
    return defaultConfig;
  },
};
```

The remote exposes a single `Routes` module. The host consumes it via dynamic import:

```typescript
// In app.routes.ts
{
  path: 'next',
  loadChildren: () =>
    import('dodokpo-next/Routes').then((m) => m.remoteRoutes),
  data: { preload: true },
}
```

### 2.4 Shared Dependencies

Angular core, common, and router are configured as strict singletons to prevent duplicate framework instances. The `shared` callback preserves Nx's resolved `requiredVersion` (e.g., `^20.3.18`) rather than using the literal string `auto`, which the federation runtime cannot resolve at runtime.

### 2.5 Deployment Topology

```
                    nginx (same origin)
                    /           \
        dodokpo-core (/)     dodokpo-next (/next/)
        - index.html         - remoteEntry.mjs
        - main.*.js           - *.chunk.js
        - remoteEntry.mjs
```

Both apps are built independently (`npm run build` runs `nx run-many -t build --all --parallel=1`) and served from the same nginx instance. The host dynamically loads the remote entry from `/next/remoteEntry.mjs` at runtime.

---

## 3. Routing Architecture

### 3.1 Top-Level Route Map

All routes use lazy-loaded standalone components. No NgModules are used in routing (the only `NgModule` in the codebase is the `FeatureModule` in `dodokpo-next` for MF compatibility).

```
/                           -> LoginPageComponent
/login                      -> LoginPageComponent
/change-password            -> ChangePasswordComponent      [authLinkValidationGuard]
/create-password            -> CreatePasswordComponent      [authLinkValidationGuard]
/forgot-password            -> ForgotPasswordComponent
/reset-link-sent            -> ResetLinkSentComponent
/organizations-list         -> UserOrganizationListComponent [organizationListGuard]
/dashboard/...              -> mainAppRoutes (lazy)
/test-taker/...             -> testTakerRoutes (lazy)
/test-taking/...            -> testTakingRoutes (lazy)       [testTakingPhaseGuard]
/invalid-link               -> InvalidLinkPageComponent
/link-expired               -> LinkExpiredPageComponent
/link-used                  -> LinkUsedPageComponent
/unauthorized               -> UnauthorizedComponent
/please-wait                -> ReroutePageComponent
/next/...                   -> dodokpo-next remote routes    [preload: true]
/**                         -> NotFoundPageComponent
```

```mermaid
flowchart TD
    Root["/ (Root)"]

    Root --> Login["/login<br/>LoginPageComponent"]
    Root --> CP["/create-password<br/>authLinkValidationGuard"]
    Root --> FP["/forgot-password<br/>ForgotPasswordComponent"]
    Root --> OL["/organizations-list<br/>organizationListGuard"]

    Root --> Dashboard["/dashboard/**<br/>🔒 authGuard"]
    Root --> TestTaker["/test-taker/**<br/>🔒 testTakerGuard"]
    Root --> TestTaking["/test-taking/**<br/>🔒 testTakingPhaseGuard"]
    Root --> Next["/next/**<br/>Module Federation Remote"]

    Dashboard --> DHome["/home"]
    Dashboard --> DTM["/test-management"]
    Dashboard --> DRM["/report-management"]
    Dashboard --> DUM["/user-management"]
    Dashboard --> DWC["/workspace-configuration"]
    Dashboard --> DN["/notifications"]
    Dashboard --> DA["/archives"]
    Dashboard --> DFF["/feature-flags"]

    TestTaker --> TEmail["/enter-email"]
    TEmail --> TSI["/system-instruction"]
    TSI --> THC["/honour-code"]
    THC --> TMC["/media-consent"]
    TMC --> TID["/interception<br/>ID Verification"]
    TID --> TFC["/interception/face-capture"]
    TFC --> TAI["/interception/assessment-instructions"]
    TAI --> TWU["/warm-up"]
    TWU --> TSP["/step-page"]

    TestTaking --> TEP["/exams-phase<br/>TestTakingMainPageComponent"]
    TestTaking --> TWP["/waiting-page<br/>WaitingPageComponent"]

    style Dashboard fill:#e3f2fd,stroke:#1565c0
    style TestTaker fill:#fff3e0,stroke:#e65100
    style TestTaking fill:#fce4ec,stroke:#c62828
    style Next fill:#e8f5e9,stroke:#2e7d32
```

### 3.2 Dashboard Routes (authGuard)

The dashboard shell (`MainAppComponent`) wraps all authenticated admin routes:

```
/dashboard/home                         -> DashboardHomePageComponent
/dashboard/report-management/...        -> reportManagementRoutes    [preload]
/dashboard/test-management/...          -> testManagementRoutes      [preload]
/dashboard/user-management/...          -> userManagementRoutes      [preload]
/dashboard/update-profile               -> UpdateUserProfileComponent
/dashboard/workspace-configuration/...  -> workspaceConfigRoutes
/dashboard/notifications                -> NotificationsComponent
/dashboard/feature-flags                -> FeatureFlagsComponent
/dashboard/archives/...                 -> archivesRoutes
```

### 3.3 Test Management Routes

```
/dashboard/test-management/
  domain/...         -> domainRoutes         [preload]
  questions/...      -> questionsRoutes      [preload]
  tests/...          -> testsRoutes          [preload]
  assessments/...    -> assessmentRoutes     [preload]
  skills/...         -> skillsRoutes         [preload]
```

Each sub-area supports full CRUD. Questions support 7 types with bulk upload. Tests use a 4-step wizard (regular + comprehension). Assessments use a 3-step wizard with dispatch and history views. Skills use a 3-step wizard with bulk upload.

### 3.4 Report Management Routes

```
/dashboard/report-management/
  dispatched-assessments/            -> ReportDispatchedAssessmentsComponent
  dispatched-assessments/download    -> ReportDownloadComponent
  candidates-report/                 -> CandidatesReportComponent
  candidates-report/:candidateEmail  -> CandidateReportDetailsComponent
  assessment-candidates/:id/         -> ReportAssessmentCandidatesComponent
  assessment-candidates/:id/question-analytics  -> questionAnalyticsRoutes
  assessment-candidates/:id/candidate-metrics   -> candidateMetricsRoutes
  feedback/:assessmentId             -> FeedbackComponent
```

Report routes include breadcrumb metadata and support nested navigation with parent breadcrumbs (e.g., "Dispatched Assessments > Assessment Candidates").

### 3.5 User Management Routes

```
/dashboard/user-management/
  users           -> UsersComponent
  organisations   -> OrganisationsComponent
  roles/          -> RolesComponent
  roles/create-new-role  -> CreateNewRoleComponent
  roles/role-details     -> RoleDetailsComponent
  roles/role-details/:id -> RoleDetailsComponent
  applications    -> ApplicationsComponent
```

### 3.6 Test-Taker Pipeline Routes

The test-taker flow is a guided pipeline with route-level side panel configuration via `data`:

```
/test-taker/
  enter-email                          -> EnterEmailComponent
  system-instruction                   -> SystemInstructionsComponent       [testTakerGuard]
  honour-code                          -> HonorCodePageComponent            [testTakerGuard]
  media-consent                        -> MediaConsentComponent             [testTakerGuard]
  interception                         -> InterceptionWithIdComponent       [testTakerGuard]
  interception/face-capture            -> FaceCaptureComponent              [testTakerGuard]
  interception/assessment-instructions -> AssessmentInstructionsComponent   [testTakerGuard]
  warm-up                              -> FirstWarmUpPageComponent          [testTakerGuard]
  step-page                            -> StepPageComponent                 [testTakingPhaseGuard]
  assessment-completed                 -> CompletePageComponent
  assessment-results                   -> AssessmentResultsComponent
  feedback                             -> FeedbackPageComponent
  assessment-not-due                   -> AssessmentNotDueComponent
  retake-delay-not-due                 -> RetakeDelayNotDueComponent
  retake-maximum-attempt               -> RetakeMaximumAttemptComponent
```

Each route carries `data` properties controlling the sidebar layout:
- `sideImg`: path to the illustration SVG
- `sideStyle`: CSS class for the side panel
- `sidePadding`: inline padding value
- `showSideBar`: boolean to toggle the left panel

### 3.7 Test-Taking Routes

```
/test-taking/
  exams-phase     -> TestTakingMainPageComponent   [testTakingPhaseGuard]
  waiting-page    -> WaitingPageComponent           [testTakingPhaseGuard]
```

### 3.8 Selective Preloading Strategy

The application uses a custom `SelectivePreloadingStrategy` instead of Angular's `PreloadAllModules`:

```typescript
@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return route.data?.['preload'] ? load() : of(null);
  }
}
```

Only routes annotated with `data: { preload: true }` are preloaded. This covers the core dashboard sub-areas (test-management, report-management, user-management) and the `dodokpo-next` remote, while deferring less-visited routes like workspace configuration and update-profile.

---

## 4. State Management

### 4.1 Architecture: NgRx ComponentStore

State management uses **NgRx ComponentStore** (not the full NgRx Store/Effects pattern). All stores are `providedIn: 'root'`, making them application-wide singletons despite the ComponentStore name suggesting component-scoped usage.

### 4.2 Store Inventory

| Store | Location | Responsibility |
|---|---|---|
| `QuestionStore` | `stores/questions-store/question.store.ts` | Question CRUD, pagination, filtering, bulk operations |
| `AssessmentStore` | `stores/assessments-store/assessment.store.ts` | Assessment CRUD, dispatch, history |
| `TestStore` | `stores/tests-store/test.store.ts` | Test CRUD, wizard state |
| `CodingStore` | `stores/coding-store/coding.store.ts` | Code execution state, test case management |
| `ComprehensionStore` | `stores/comprehension-store/comprehension.store.ts` | Comprehension test passages and questions |
| `SkillsStore` | `stores/skills-store/skills.store.ts` | Skills CRUD, bulk upload state |
| `ReportAssessmentMetricsStore` | `stores/report-assessment-metrics.store.ts` | Report candidate metrics, proctoring data |

### 4.3 Store Pattern

Each store follows a consistent pattern:

```typescript
@Injectable({ providedIn: 'root' })
export class QuestionStore extends ComponentStore<QuestionsState> {
  // Injected dependencies
  private readonly authService = inject(AuthService);
  private readonly questionsService = inject(QuestionsService);

  constructor() {
    super({
      allQuestions: { data: { data: [], totalItems: 0, ... } },
      isQuestionLoading: boolean,
      error: string | null,
      success: boolean,
    });
  }

  // Selectors (readonly state slices)
  readonly allQuestions$ = this.select((state) => state.allQuestions);
  readonly isLoading$ = this.select((state) => state.isQuestionLoading);

  // Updaters (synchronous state mutations)
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state, isQuestionLoading: loading,
  }));

  // Effects (async side effects)
  readonly loadQuestions = this.effect((params$: Observable<QueryParams>) =>
    params$.pipe(
      switchMap((params) => this.questionsService.getQuestions(params).pipe(
        tap((response) => this.patchState({ allQuestions: response })),
        catchError((error) => { this.patchState({ error }); return of(null); }),
      )),
    )
  );
}
```

```mermaid
flowchart LR
    subgraph Components["Components"]
        C1["Dashboard Components"]
        C2["Test Management Components"]
        C3["Report Components"]
        C4["Test-Taking Components"]
    end

    subgraph Stores["NgRx ComponentStores (providedIn: root)"]
        AS["AssessmentStore"]
        QS["QuestionStore"]
        TS["TestStore"]
        CS["CodingStore"]
        CPS["ComprehensionStore"]
        SS["SkillsStore"]
        RAMS["ReportAssessmentMetricsStore"]
    end

    subgraph Services["HTTP Services"]
        ASvc["AssessmentService"]
        QSvc["QuestionsService"]
        TSvc["TestsService"]
        CESvc["CodeExecutionService"]
        CPSvc["ComprehensionService"]
        SSvc["SkillsService"]
        RSvc["ReportsService"]
    end

    API[("Backend API")]

    C1 -- "select$" --> AS
    C2 -- "select$" --> QS & TS & CS & CPS & SS
    C3 -- "select$" --> RAMS
    C4 -- "select$" --> CS & CPS

    C1 -- "effect()" --> AS
    C2 -- "effect()" --> QS & TS & CS & CPS & SS
    C3 -- "effect()" --> RAMS
    C4 -- "effect()" --> CS & CPS

    AS -- "switchMap" --> ASvc
    QS -- "switchMap" --> QSvc
    TS -- "switchMap" --> TSvc
    CS -- "switchMap" --> CESvc
    CPS -- "switchMap" --> CPSvc
    SS -- "switchMap" --> SSvc
    RAMS -- "switchMap" --> RSvc

    ASvc --> API
    QSvc --> API
    TSvc --> API
    CESvc --> API
    CPSvc --> API
    SSvc --> API
    RSvc --> API

    style Stores fill:#e8eaf6,stroke:#3949ab
    style Services fill:#e0f2f1,stroke:#00695c
    style Components fill:#fff8e1,stroke:#f9a825
```

### 4.4 DevTools Integration

NgRx Store DevTools are configured in `app.provider.ts`:

```typescript
provideStoreDevtools({
  autoPause: true,
  trace: false,
  traceLimit: 75,
  connectInZone: true,
  maxAge: 25,
  logOnly: !isDevMode(),
})
```

---

## 5. Service Layer

### 5.1 Service Organization

Services are split across two locations:

- **App-local services** (`apps/dodokpo-core/src/app/services/`): 20+ services specific to the core application.
- **Shared library services** (`libs/shared/services/src/`): 13 re-exported services shared between `dodokpo-core` and `dodokpo-next`.

All services use `@Injectable({ providedIn: 'root' })` for tree-shakeable singleton registration.

### 5.2 Shared Services (via `@shared/services`)

| Export | Description |
|---|---|
| `ToastService` | Notification toasts with title, message, auto-close, severity |
| `AuthService` | Login/logout, token management, fingerprinting, multi-org |
| `ThemeService` | Light/dark mode toggling with feature flag awareness |
| `FeatureFlagService` | HTTP + SSE real-time feature flags with admin CRUD |
| `ProctoringService` | Webcam/screen monitoring, screenshot capture, tab detection |
| `AnalyticsService` | Segment integration, SSE-streamed question analytics + AI insights |
| `BreadcrumbService` | Dynamic breadcrumb management from route data |
| `NotificationsService` | SSE real-time push notifications with sound |
| `SentryService` | Error tracking via `@sentry/angular` |
| `FaceDetectionService` | face-api.js TinyFaceDetector for face verification |
| `TestTakingService` | Test-taker session state, assessment data, tracking |
| `AiHealthCheckService` | AI service availability monitoring |

### 5.3 App-Local Services (notable)

| Service | Responsibility |
|---|---|
| `CodeExecutionService` | Judge0 integration for running code, generating test cases, boilerplate, and solutions via AI |
| `MonacoLoaderService` | Dynamic script loading and configuration of Monaco Editor |
| `IdVerificationService` | Tesseract.js OCR with PDF support, field extraction, confidence scoring |
| `FileParseWorkerService` | Web Worker delegation for CSV/file parsing |
| `PermissionsService` | RBAC permission checks against 48 access groups |
| `DomainService` | Domain CRUD operations |
| `NavigationService` | Programmatic navigation helpers |
| `ResponsiveService` | Viewport breakpoint detection |
| `ReloadService` | Route reload state management (for the "please wait" interstitial) |
| `DropdownManagerService` | Shared dropdown state coordination |
| `EditorService` | Rich text editor (Quill) configuration |
| `Html2PdfService` | PDF generation from HTML (html2pdf.js + jspdf) |
| `SidebarService` | Sidebar open/close state |
| `DashboardService` | Dashboard home page data |

### 5.4 App Initializers

Three `provideAppInitializer` functions run before the application renders:

1. **Sentry TraceService** -- Initializes Sentry performance tracing on the Router.
2. **Feature Flag Initializer** -- Fetches public feature flags via HTTP and populates the `FeatureFlagService`. This always resolves (never blocks bootstrap) since `publicListFlags()` handles its own errors internally.
3. **Monaco Preload Initializer** -- Conditionally preloads Monaco Editor only when the initial route (or subsequent navigation) matches coding-related paths (`/test-taking`, `/test-taker`, `/dashboard/test-management/questions`, `/dashboard/test-management/tests`). Uses a `NavigationEnd` listener with `take(1)` to trigger preload on first navigation to a coding route.

```mermaid
sequenceDiagram
    participant B as Angular Bootstrap
    participant S as Sentry TraceService
    participant FF as featureFlagInitializer
    participant FFS as FeatureFlagService
    participant M as monacoPreloadFactory
    participant ML as MonacoLoaderService
    participant R as Router
    participant App as App Renders

    Note over B,App: provideAppInitializer sequence

    B->>S: 1. Initialize Sentry TraceService
    S->>R: Attach performance tracing to Router
    S-->>B: Sentry ready

    B->>FF: 2. featureFlagInitializer
    FF->>FFS: publicListFlags() via HTTP
    FFS-->>FF: Public feature flags loaded
    Note over FF: Always resolves (never blocks bootstrap)
    FF-->>B: Feature flags ready

    B->>M: 3. monacoPreloadFactory
    M->>R: Subscribe to NavigationEnd (take 1)

    alt Route matches coding path
        Note over M: /test-taking, /test-taker,<br/>/dashboard/test-management/questions,<br/>/dashboard/test-management/tests
        M->>ML: Preload Monaco Editor scripts
        ML-->>M: Monaco preloaded
    else Route does not match
        Note over M: Skip Monaco preload
    end

    M-->>B: Monaco init complete

    B->>App: All initializers resolved → Render application
```

### 5.5 Real-Time Communication (SSE)

Three services maintain persistent SSE connections:

| Service | SSE Endpoint | Purpose |
|---|---|---|
| `FeatureFlagService` | `/api/v1/flag-admin/flags/sse` | Real-time flag toggles, creates, deletes |
| `NotificationsService` | `${environment.eventUrl}/${token}` | Push notifications with unread count |
| `AnalyticsService` | `/test-taking/assessment/:id/questions-analysis-stream` | Streamed question analytics + AI insights |

All three implement:
- Retry logic with configurable max retries (3) and 5-second backoff
- Concurrent connection prevention (`isConnecting` flag)
- Proper cleanup in `ngOnDestroy`
- Sentry reporting on persistent failures

---

## 6. Authentication & Security

### 6.1 Dual-Layer Token Architecture

The application uses a dual HTTP client strategy:

| Layer | Client | Use Case |
|---|---|---|
| **Interceptor layer** | Angular `HttpClient` | All service calls from components and stores |
| **Guard layer** | Axios | Route guards that run before component initialization |

This dual approach exists because Angular's `HttpClient` interceptors are not available during guard execution in certain lifecycle scenarios. Guards use Axios directly with manual header injection.

```mermaid
sequenceDiagram
    participant U as User
    participant Auth as AuthService
    participant FP as FingerprintJS
    participant API as Backend API
    participant SS as sessionStorage
    participant LS as localStorage
    participant IDB as IndexedDB
    participant Int as loggerInterceptor
    participant Err as errorInterceptor

    Note over U,API: Login Flow
    U->>Auth: login(email, password)
    Auth->>API: POST /auth-service/auth/login
    API-->>Auth: JWT token
    Auth->>FP: FingerprintJS.load()
    FP-->>Auth: visitorId (fingerprint)
    Auth->>Auth: JSON.stringify({token, fingerprint})
    Auth->>Auth: Base64-encode (btoa + encodeURIComponent)
    Auth->>SS: store access_token_key
    Auth->>Auth: AES-GCM encrypt fingerprint<br/>(PBKDF2, 100K iterations, SHA-256)
    Auth->>LS: store fp_persistent (encrypted)
    Auth->>IDB: store BrowserTagDB.fingerprints.fp_id (encrypted)

    Note over U,API: Authenticated Request Flow
    U->>Int: HTTP request
    Int->>Auth: getFingerprint()
    Auth-->>Int: fingerprint (from memory/LS/IDB cache)
    Int->>Auth: getToken()
    Auth->>SS: retrieve access_token_key
    Auth->>Auth: Base64-decode + parse JSON
    Auth->>FP: regenerate current fingerprint
    Auth->>Auth: compare stored vs current fingerprint

    alt Fingerprint match
        Auth-->>Int: JWT token
        Int->>API: Request + Authorization: Bearer JWT<br/>+ X-Device-Fingerprint header
        API-->>Int: Response + amap-auth-access-token header
        Int->>Auth: rotate token if new header present
    else Fingerprint mismatch
        Auth->>Auth: track analytics event
        Auth->>U: logOut() → redirect to /login
    end

    Note over U,API: Error Handling
    API-->>Err: Error response
    alt 401 / invalid token / expired token
        Err->>Auth: logoutForErrorInterceptor()
        Auth->>U: redirect to /login
    else 403
        Err->>U: redirect to /unauthorized
    else 429
        Err->>U: show rate limit message
    end
```

### 6.2 Token Storage (Fingerprint-Bound)

Tokens are stored with browser fingerprint binding:

```
Login -> setToken(jwt)
  1. Generate fingerprint via FingerprintJS
  2. JSON.stringify({ token: jwt, fingerprint })
  3. Base64-encode (btoa + encodeURIComponent)
  4. Store in sessionStorage['access_token_key']

getToken()
  1. Retrieve from sessionStorage
  2. Base64-decode
  3. Parse JSON
  4. Regenerate current fingerprint
  5. Compare stored fingerprint with current
  6. If mismatch -> track analytics event -> logOut()
  7. If match -> return token
```

### 6.3 Browser Fingerprint System

The `AuthService` generates and persists browser fingerprints using a multi-layer strategy:

```
Memory cache (fastest)
    |
    v  miss
localStorage['fp_persistent'] (encrypted with AES-GCM)
    |
    v  miss
IndexedDB['BrowserTagDB']['fingerprints']['fp_id'] (encrypted with AES-GCM)
    |
    v  miss
FingerprintJS.load() -> generate new visitorId
    -> store in all three layers
```

Encryption uses **PBKDF2-derived AES-GCM keys** (100,000 iterations, SHA-256) with a 12-byte random IV prepended to the ciphertext. The passphrase is derived from the Segment write key in the environment config.

A 5-second cooldown prevents rapid fingerprint regeneration.

### 6.4 HTTP Interceptors

**loggerInterceptor** (runs first):
1. Resolves the browser fingerprint (async)
2. Retrieves the stored token (async, with fingerprint validation)
3. Clones the request with `Authorization: Bearer <token>` and `X-Device-Fingerprint: <fingerprint>` headers
4. On response, captures the `amap-auth-access-token` header for token rotation

**errorInterceptor** (runs second):
- **Status 0**: Checks internet connectivity, returns appropriate network/server error message
- **Status 429**: Extracts rate limit message from nested error response
- **Status 502/503/504**: Server communication error messages
- **Status 404**: Navigates back (except for background requests like public feature flags)
- **Status 403**: Redirects to `/unauthorized`
- **Token errors** (`invalid token`, `expired token`, `missing token`): Triggers `logoutForErrorInterceptor()`
- **Account deactivation**: Shows error for 5 seconds, then auto-logout
- **Assessment-specific errors**: Routes to `invalid-link`, `assessment-not-due`, `assessment-completed`, `link-expired`

### 6.5 Route Guards

**authGuard** (dashboard routes):
1. If user is already in memory, allow immediately
2. Otherwise, show "please wait" interstitial (`/please-wait`)
3. Retrieve and validate token (from sessionStorage with fingerprint check)
4. Verify token with server via Axios (`/auth-service/auth/verify/user`)
5. Fetch user profile via Axios (`/user-service/users/:orgId/my-profile`)
6. Fetch tags if user has tag permissions
7. Fetch authenticated feature flags and reconnect SSE
8. Set user in AuthService, return `true`
9. On any failure, redirect to `/login`

**authLinkValidationGuard** (password reset/create links):
- Validates the password link token before allowing access to change/create password pages

**testTakerGuard** (test-taker pipeline):
1. If assessment state is already loaded, allow immediately
2. Extract `testTakerId` from query params
3. Generate browser fingerprint
4. Fetch assessment link status via Axios with fingerprint header
5. Handle complex error scenarios:
   - Rate limiting (429): Show toast, preserve current route
   - Retake delays: Navigate to appropriate retake page with dates
   - Fingerprint mismatch: Clear all storage, redirect to login
   - Assessment status (invalid, undue, expired, completed, max retakes): Route to status pages
6. Process assessment phase:
   - `CODE_CONDUCT_SIGNING`: Allow navigation through the pipeline
   - `TEST_TAKING`: Calculate frontend-adjusted estimated end time, redirect to step page

**testTakingPhaseGuard** (exam phase):
1. If in-progress data exists, allow immediately
2. Fetch link status with fingerprint
3. Reject if phase is not `TEST_TAKING`
4. Calculate server clock offset: `estimatedEndTime(server) - currentDate(server) + now(client)`
5. Store remaining time in localStorage for countdown recovery

### 6.6 Server Clock Offset Compensation

The `getFrontendEstimatedEnd` function compensates for clock drift between client and server:

```typescript
export function getFrontendEstimatedEnd(
  estimatedEndTime: string,
  currentDate: string
): string {
  const now = new Date();
  const serverTimeOffset =
    new Date(estimatedEndTime).getTime() - new Date(currentDate).getTime();
  return new Date(now.getTime() + serverTimeOffset).toISOString();
}
```

This ensures the countdown timer uses the server's remaining duration applied to the client's local clock, preventing premature or delayed exam termination due to time zone or clock differences.

### 6.7 Permission System

The permission system maintains dual compatibility between new RBAC permissions and legacy permission strings:

```typescript
type PermissionName = SystemPermission |
  `${Action} ${'user' | 'role' | 'assessment' | ... }`;

type LegacyPermission = 'admin' | 'manage users' | 'view users' | ...;

interface AccessGroup {
  permissions: PermissionName[];
  legacy: LegacyPermission[];
}
```

48 access groups are defined (612 lines), covering every UI action from viewing the dashboard to archiving individual questions. The `checkPermission()` function matches a user's permission array against an access group, checking both new and legacy permission names.

---

## 7. Proctoring Pipeline

### 7.1 Pipeline Overview

The proctoring system monitors test-takers during assessments through three parallel channels:

```mermaid
flowchart TD
    Start([Test-Taker Begins]) --> Email["/enter-email<br/>Enter assessment email"]
    Email --> SI["/system-instruction<br/>System Instructions"]
    SI --> HC["/honour-code<br/>Honour Code Agreement"]
    HC --> MC["/media-consent<br/>Media Consent<br/>(camera + screen)"]
    MC --> IDV["/interception<br/>ID Verification<br/>📷 tesseract.js OCR"]
    IDV --> FC["/interception/face-capture<br/>Face Capture<br/>🧠 face-api.js detection"]
    FC --> AI["/interception/assessment-instructions<br/>Assessment Instructions"]
    AI --> WU["/warm-up<br/>Warm Up Exercise"]
    WU --> TT["/test-taking/exams-phase<br/>🎯 Active Test Taking"]

    subgraph "Proctoring During Test"
        direction TB
        WM["📹 Webcam Monitoring<br/>getUserMedia()<br/>periodic face detection<br/>→ S3 upload"]
        SC["🖥️ Screenshot Capture<br/>getDisplayMedia()<br/>canvas → PNG → MD5<br/>→ presigned S3 URL → PUT"]
        TD["🔄 Tab-Switch Detection<br/>visibilitychange event<br/>1s debounce + 2s minimum<br/>+ false-positive filters"]
    end

    TT --- WM & SC & TD

    IDV -- "OCR Pipeline" --> OCR["Image preprocessing (max 1000px)<br/>→ tesseract.js worker (English)<br/>→ Field extraction (name, ID, DOB)<br/>→ Confidence scoring (≥60 to pass)<br/>→ 20s hard timeout"]

    FC -- "Face Pipeline" --> FD["TinyFaceDetector (416×416)<br/>+ FaceLandmark68Net<br/>→ Score threshold 0.6<br/>→ Reject 0 or >1 faces<br/>→ Quality: face area >10K px²"]

    style TT fill:#c8e6c9,stroke:#2e7d32
    style WM fill:#bbdefb,stroke:#1565c0
    style SC fill:#bbdefb,stroke:#1565c0
    style TD fill:#bbdefb,stroke:#1565c0
    style OCR fill:#fff9c4,stroke:#f9a825
    style FD fill:#fff9c4,stroke:#f9a825
```

### 7.2 Screen Sharing (ProctoringService)

Screen sharing uses `navigator.mediaDevices.getDisplayMedia()` with Safari-specific handling:

- Safari does not support the `displaySurface` constraint; the service conditionally omits it
- Detects window/tab sharing (vs. full screen) by inspecting the video track label for browser-specific keywords (`window`, `tab`, `chrome`, `mozilla`, `edge`)
- Shows a warning toast if window/tab sharing is detected instead of full screen
- Handles share cancellation vs. permission denial separately (only logs actual errors)
- Re-share modal triggered when the track's `onended` fires
- `muted` and `playsInline` attributes set for Safari autoplay compliance

### 7.3 Tab/Window Switching Detection

Tab switching detection uses the `visibilitychange` event with multiple false-positive protections:

1. **1-second debounce**: Violations only register after the tab has been hidden for 1 second
2. **2-second minimum duration**: Only violations lasting 2+ seconds are finalized
3. **Genuine violation check** excludes:
   - Active modals, dropdowns, overlays, tooltips, dialogs (`role="dialog"`, SweetAlert, etc.)
   - Document still has focus (browser UI interaction like address bar)
   - Active input elements or Monaco editor focus
   - Document not actually hidden
   - CDK drag-and-drop in progress
   - Divider resize operations

### 7.4 Screenshot Upload Pipeline

1. **Capture**: Creates an off-screen `<video>` element from the MediaStream, draws to canvas, exports as PNG data URL
2. **MD5 computation**: Calculates Content-MD5 hash using CryptoJS for S3 integrity verification
3. **Presigned URL**: Requests a pre-signed S3 upload URL from the backend (`/test-taking/assessment/:id/presigned-url`)
4. **S3 upload**: Direct PUT to S3 using Axios with the presigned URL and required headers (Content-Type, Content-MD5, object lock mode/retention)
5. **Internet check**: Silently skips upload when offline (`isInternetAvailable()`)

Image types are categorized: `id-shot`, `head-shot`, `screen-monitoring`, `candidate-monitoring`.

### 7.5 Face Detection (FaceDetectionService)

Uses **face-api.js** with lazy-loaded models:

- **Models**: TinyFaceDetector (416x416 input) + FaceLandmark68Net, loaded from `/assets/models`
- **Lazy loading**: The `face-api.js` module itself is dynamically imported on first use
- **Detection parameters**: Score threshold 0.6, input size 416
- **Results**: Face count, confidence score, bounding box, face quality assessment (`good` if face area > 10,000 px^2)
- **Validation**: Rejects zero faces and multiple faces

### 7.6 ID Verification (IdVerificationService)

Uses **tesseract.js** for OCR with lazy loading (saves ~14.9MB from initial bundle):

1. **Image preprocessing**: Resizes to max 1000px dimension before OCR
2. **Worker setup**: Creates a tesseract worker with English language data from `/assets/tesseract`
3. **Timeout protection**: 20-second hard timeout with worker termination
4. **Field extraction**: Regex patterns for name, surname, ID number, date of birth, nationality, sex, expiry date, etc. Supporting English, French, and Swahili label variants
5. **Confidence scoring**: Based on keyword matches (40pts for 2+), name detection (40pts), ID number (20pts), date of birth (10pts)
6. **Validation**: Requires name + ID number + 2 keywords + confidence >= 60 for `isValid: true`
7. **PDF support**: Single-page PDFs are rendered to canvas at 2x scale via `pdfjs-dist`, then OCR'd

---

## 8. UI Component Architecture

### 8.1 Component Organization

Components are organized by feature area within the `dodokpo-core` app:

```
apps/dodokpo-core/src/app/
  authentication/         # Login, password flows
  main-app/               # Dashboard shell (sidebar + header + router-outlet)
  dashboard-home-page/    # Home dashboard
  test-management/        # Domains, Questions, Tests, Assessments, Skills
    Domain/
    Questions/
    Tests/
    Assessment/
    Skills/
    components/           # Shared test-management components
  reportsManagement/      # Report views
    components/           # Dispatched assessments, candidates, metrics
    pages/                # Download, feedback, candidate report
  user-management/        # Users, organisations, roles, applications
  test-taker/             # Test-taker pipeline pages
    pages/                # Each step in the pipeline
    components/           # Shared test-taker components
  test-taking/            # Active exam experience
  feature-flags/          # Admin feature flag management
  notifications/          # Notification center
  archives/               # Archived items
  account-configuration/  # Profile, workspace settings
  components/             # Truly shared/cross-cutting components
  error/                  # Error display components
  coming-soon-page/       # Placeholder for unreleased features
  not-found-page/         # 404 page
  no-result-found/        # Empty state component
```

**Total: 253 components** across the codebase.

### 8.2 Standalone Component Pattern

All components use the standalone pattern (no NgModules):

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent { }
```

### 8.3 Shared Library (`libs/shared`)

The shared library is organized into five sub-packages:

| Package | Import Path | Contents |
|---|---|---|
| **config** | `@shared/config` | Environment configuration (`environment.ts`) |
| **services** | `@shared/services` | 13 shared services (Toast, Auth, Theme, FeatureFlag, etc.) |
| **interfaces** | `@shared/interfaces` | 50+ TypeScript interfaces (feature flags, reports, notifications, test-taker types) |
| **directives** | `@shared/directives` | `DurationDirective`, `SafeHtmlDirective`, `HtmlTooltipDirective` |
| **utils** | `@shared/utils` | Permissions (48 access groups), constants, regex patterns, coding type utils, test-taker constants |
| **styles** | (SCSS/CSS imports) | Material M2 theme, global CSS with 80+ custom properties |

### 8.4 Third-Party UI Integration

| Library | Usage |
|---|---|
| **Angular Material** | Buttons, dialogs, tables, forms, tabs, chips, autocomplete, date pickers, snackbars |
| **PrimeNG** | Data tables (with advanced filtering), dropdowns, multiselect, calendar |
| **TailwindCSS** | Utility-first layout, spacing, typography, responsive design, dark mode (`class` strategy) |
| **Monaco Editor** | In-browser code editor for coding questions (7+ language support via Judge0) |
| **Chart.js** | Analytics visualizations (bar, line, pie charts for assessment reports) |
| **Quill** | Rich text editor for question descriptions and assessment instructions |
| **ngx-lottie** | Animated illustrations (loading states, empty states, success animations) |
| **ngx-highlightjs** | Syntax highlighting for code blocks in question previews |
| **html2pdf.js + jspdf** | Client-side PDF generation for reports and certificates |

### 8.5 Web Workers

Two Web Workers handle CPU-intensive file parsing off the main thread:

- **`csv.worker.ts`**: Parses CSV files for bulk question/skill uploads
- **`file-parse.worker.ts`**: General file parsing delegated from `FileParseWorkerService`

---

## 9. Theming & Design System

### 9.1 Theme Architecture

The theming system operates across three layers:

```
Layer 1: Angular Material (M2)
  - Indigo primary palette
  - Pink accent palette (A200/A100/A400)
  - Red warn palette
  - M2 light theme with default typography and density 0

Layer 2: CSS Custom Properties (80+ variables)
  - :root defines light theme defaults
  - .dark class overrides all variables for dark mode
  - Consumed by Tailwind (via theme.extend.colors) and direct CSS

Layer 3: TailwindCSS
  - darkMode: 'class' (toggled by ThemeService)
  - Colors mapped to CSS custom properties
  - Utility classes for layout, typography, responsive
```

```mermaid
block-beta
    columns 1
    block:L3["Layer 3: TailwindCSS"]:1
        TW1["darkMode: 'class'"]
        TW2["Colors mapped to CSS vars:<br/>bg → var(--color-bg)<br/>text → var(--color-text)<br/>primary → var(--color-primary)"]
        TW3["Utility classes for layout,<br/>typography, responsive"]
    end
    block:L2["Layer 2: CSS Custom Properties (80+ vars)"]:1
        L2A[":root — light theme defaults"]
        L2B[".dark — dark mode overrides"]
        L2C["Consumed by Tailwind & direct CSS"]
    end
    block:L1["Layer 1: Angular Material M2"]:1
        M1["Indigo primary palette"]
        M2["Pink accent (A200/A100/A400)"]
        M3["Red warn palette"]
        M4["Default typography, density 0"]
    end

    style L3 fill:#e8f5e9,stroke:#2e7d32
    style L2 fill:#e3f2fd,stroke:#1565c0
    style L1 fill:#fce4ec,stroke:#c62828
```

```mermaid
flowchart LR
    TS["ThemeService<br/>BehaviorSubject&lt;'light' | 'dark'&gt;"]
    TS -- "toggleTheme()" --> HTML["&lt;html&gt; element"]
    HTML -- "add/remove class" --> DC[".dark class<br/>(Tailwind + CSS vars)"]
    HTML -- "add/remove class" --> TC["light-theme / dark-theme"]
    HTML -- "set attribute" --> DT["data-theme on &lt;body&gt;"]
    TS -- "localStorage['theme']" --> LS[("localStorage")]
    TS -- "getMonacoTheme()" --> MO["Monaco: 'vs' | 'codeQuestionDark'"]

    FF["Feature Flag:<br/>use_system_default_theme_082379"]
    OS["OS prefers-color-scheme"]
    FF -. "if enabled + no saved theme" .-> OS
    OS -. "initial theme" .-> TS

    style TS fill:#e8eaf6,stroke:#3949ab
```

### 9.2 ThemeService

The `ThemeService` manages theme state as an observable `BehaviorSubject<'light' | 'dark'>`:

```typescript
toggleTheme():
  1. Flip 'light' <-> 'dark'
  2. Update BehaviorSubject
  3. Persist to localStorage['theme']
  4. Apply CSS classes to <html>:
     - Remove 'light-theme' / 'dark-theme'
     - Add new theme class
     - Add/remove 'dark' class (for Tailwind)
     - Set data-theme attribute on <body>
```

**Feature flag integration**: On initialization, if no saved theme exists, the service checks the `use_system_default_theme_082379` feature flag. If enabled, it respects the OS `prefers-color-scheme` media query.

**Monaco integration**: `getMonacoTheme()` returns `'vs'` for light mode and `'codeQuestionDark'` for dark mode (a custom theme defined in `MonacoLoaderService`).

### 9.3 CSS Custom Properties

The `:root` scope defines 80+ custom properties organized by component type:

| Category | Example Variables |
|---|---|
| **Brand** | `--color-brand-orange`, `--color-brand-dark-blue`, `--color-brand-dark-blue-hover` |
| **Semantic** | `--color-danger`, `--color-success`, `--color-warning`, `--color-gray` |
| **Surface** | `--color-bg`, `--color-text`, `--color-surface`, `--color-muted`, `--color-input` |
| **Cards** | `--card-bg`, `--card-title`, `--card-text`, `--card-border` |
| **Question cards** | `--questions-card-bg`, `--questions-card-border`, `--questions-card-pill-*` |
| **Long cards** | `--long-card-bg`, `--long-card-chip-*` |
| **Assessment cards** | `--assessment-card-bg`, `--assessment-card-footer-bg` |
| **Tables** | `--table-header-bg`, `--table-header-text`, `--table-header-hover-bg` |
| **Navigation** | `--sidebar-active`, `--side-bar-bg`, `--side-bar-border` |
| **Search** | `--search-bg`, `--search-text` |

The `.dark` class overrides every variable. Notable dark mode transformations:
- `--color-white` becomes `#21211f` (dark surface)
- `--color-bg` becomes `#1a1a18` (near-black background)
- `--color-primary` shifts from `#0c4767` to `#559fe0` (lighter blue for contrast)
- `--color-brand` becomes `#ffffff` (inverted for readability)

### 9.4 Typography

The primary font stack is `'Segoe UI', sans-serif` with `Work Sans` loaded from Google Fonts as a supplementary typeface. The `color-scheme: light` CSS property is set on `:root`.

Custom fonts are loaded from `apps/dodokpo-core/src/assets/fonts/fonts.css`.

### 9.5 Tailwind Integration

Tailwind configuration maps semantic color names to CSS custom properties:

```javascript
colors: {
  bg: 'var(--color-bg)',
  text: 'var(--color-text)',
  surface: 'var(--color-surface)',
  primary: 'var(--color-primary)',
  // ... 15+ semantic mappings
}
```

This means `class="bg-primary text-text"` resolves to the correct colors in both light and dark mode without any Tailwind dark: prefix -- the CSS variables handle the switch.

---

## 10. Testing Strategy

### 10.1 Framework and Configuration

| Aspect | Configuration |
|---|---|
| Test Runner | Jest |
| Angular Preset | `jest-preset-angular` |
| Environment | jsdom with `jest-canvas-mock` |
| Transform | TypeScript, JavaScript, MJS, HTML, SVG |
| Module Aliases | `@shared/*` mapped to `libs/shared/*/src/index.ts` |

### 10.2 Coverage Thresholds

Enforced per-build via Jest configuration:

```javascript
coverageThreshold: {
  global: {
    branches: 61,
    functions: 75,
    lines: 80,
    statements: 80,
  },
}
```

Coverage reports are generated in `coverage/apps/dodokpo-core/` and merged across all apps using `lcov-result-merger`.

### 10.3 Test File Distribution

- **353 spec files** across the `dodokpo-core` application
- Tests co-located with source files (e.g., `auth.service.spec.ts` alongside `auth.service.ts`)
- Store tests: All 7 stores have corresponding spec files
- Service tests: Core services (auth, analytics, feature-flag, proctoring, etc.) have dedicated specs
- Component tests: 253 components, majority have corresponding spec files

### 10.4 Mock Strategy

Complex third-party dependencies are mocked at the module level:

| Dependency | Mock Location |
|---|---|
| `face-api.js` | `src/__mocks__/face-api.js` |
| `html2pdf.js` | `__mocks__/html2pdf.js` |
| `pdfjs-dist` | `__mocks__/pdfjs-dist.js` |
| `chart.js` | `__mocks__/chart.js` |
| `monaco-editor` | `__mocks__/monaco-editor.js` |
| Monaco service | `__mocks__/monaco-service.js` |
| `FileParseWorkerService` | `__mocks__/file-parse-worker.service.js` |
| CSS/SCSS | `identity-obj-proxy` |
| Quill CSS | `identity-obj-proxy` |

### 10.5 Test Scripts

| Script | Purpose |
|---|---|
| `npm test` | Run all tests across all apps with merged coverage |
| `npm run test:fullCoverage` | Full coverage run with parallel=1 and merge |
| `npm run test:watch` | Watch mode for development |
| `npm run test:changed` | Only test apps affected by recent changes |
| `npm run test:coverage` | Affected tests with coverage merge |

### 10.6 Code Quality Pipeline

```mermaid
flowchart TD
    DC["Developer Commit"] --> Husky["Husky pre-commit hook"]
    Husky --> LS["lint-staged<br/>ESLint fix on staged files"]
    LS --> CL["commitlint<br/>(conventional commits)"]
    CL --> CI["CI Pipeline"]

    CI --> Lint["ESLint<br/>(nx run-many -t lint)"]
    CI --> Test["Jest<br/>(nx run-many -t test)"]
    CI --> Cov["Coverage Merge<br/>(lcov-result-merger)"]
    CI --> Sonar["SonarQube Analysis<br/>(sonar-scanner)"]

    Lint --> Pass{All Pass?}
    Test --> Pass
    Cov --> Pass
    Sonar --> Pass
    Pass -->|Yes| Deploy["Deploy"]
    Pass -->|No| Fail["Block Merge"]
```

SonarQube is configured with:
- Source paths: `apps/dodokpo-core/src`, `libs/`
- Test inclusions: `**/*.spec.ts`
- Coverage report: `coverage/lcov.info`

### 10.7 Bundle Analysis

A dedicated script enables Webpack bundle analysis:

```bash
npm run build:analyze
# Runs: nx build dodokpo-core --stats-json
#        && npx webpack-bundle-analyzer dist/apps/dodokpo-core/stats.json
```

This is used to identify and address bundle size regressions, particularly important given heavy dependencies like tesseract.js (~14.9MB, lazy-loaded), face-api.js (dynamically imported), and Monaco Editor (conditionally preloaded).
