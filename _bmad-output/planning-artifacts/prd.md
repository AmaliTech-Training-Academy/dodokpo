---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
classification:
  projectType: Web Application (SaaS)
  domain: EdTech / HR Tech
  complexity: medium
  projectContext: brownfield
inputDocuments:
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture-backend.md
  - docs/architecture-frontend.md
  - docs/integration-architecture.md
  - docs/api-contracts-backend.md
  - docs/data-models-backend.md
  - docs/component-inventory-frontend.md
  - docs/source-tree-analysis.md
  - docs/development-guide.md
  - docs/deployment-guide.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 11
projectType: 'brownfield'
---

# Product Requirements Document - Dodokpo

**Author:** Thomas
**Date:** 2026-04-15

## Executive Summary

Dodokpo is AmaliTech's internal technical assessment platform serving three business units — Recruitment, Training Center, and Service Center — with a unified engine for creating, delivering, proctoring, and evaluating technical assessments. The platform supports 7 question types (multiple-choice, multi-select, true/false, fill-in-the-blank, essay, matrix matching, and coding), real-time code execution (JavaScript, TypeScript, Python, Java), AI-powered marking via multiple providers, multi-level proctoring (webcam monitoring, screenshot capture, tab-switching detection, face verification, ID document OCR), and detailed analytics with AI-generated insights.

The platform is multi-tenant with granular RBAC (48 permission groups), organization management, skill-based assessment mapping, and real-time notifications. The backend is a polyglot microservices architecture (10 services) communicating via event-driven messaging (40+ topics) and proxied through an API Gateway with rate limiting and circuit breaker patterns.

The Q2 2026 roadmap targets five PI Objectives (weighted BV 39/50) to transform Dodokpo from a capable assessment delivery tool into an **intelligent assessment engine**: adaptive question bank with difficulty calibration and duplicate detection, production-grade auto-graded coding assessments, pre-test system compatibility checks, WCAG 2.1 AA accessibility baseline, and question lifecycle governance (versioning, bulk upload, archiving, global questions). An uncommitted stretch objective adds multi-language assessment capability.

### What Makes This Special

Dodokpo is purpose-built for AmaliTech's talent lifecycle — from recruitment screening through training evaluation to service center skill validation. Unlike vendor tools, it integrates directly with AmaliTech's internal CMS and workflows, eliminating per-seat licensing friction and enabling rapid customization. The three business units share a unified question bank, assessment engine, and reporting infrastructure instead of operating three separate tools. The next evolution — intelligent question management with adaptive difficulty and AI-assisted generation — will reduce manual question curation effort by an estimated 40-60% while improving assessment quality through data-driven calibration.

## Project Classification

- **Project Type:** Web Application (Internal Platform)
- **Domain:** EdTech / HR Tech (Technical Assessment & Talent Evaluation)
- **Complexity:** Medium — multi-tenancy, proctoring ethics, AI fairness, candidate data privacy
- **Project Context:** Brownfield — mature platform (10 microservices, 200+ API endpoints, 150+ frontend components) with active Q2 2026 enhancement roadmap

## Success Criteria

### User Success

**Test Managers:**
- Create assessments 40-60% faster through AI-assisted question generation and intelligent question bank reuse
- Accurately evaluate candidate capacity levels through adaptive difficulty calibration — the system surfaces true skill level, not memorization
- Spend zero time on duplicate question curation — duplicates flagged automatically before publish
- Review AI-generated questions through a governed workflow with rollback via question versioning
- Bulk upload coding questions via CSV/JSON without manual entry, with clear validation errors

**Candidates:**
- Complete pre-test compatibility check (browser, OS, network stability, hardware) with clear remediation guidance — no surprise failures during live sessions
- Take assessments stress-free once initial checks pass — system guarantees session stability
- Receive accessible experience meeting WCAG 2.1 AA baseline: keyboard navigation, contrast ratios, screen-reader support
- Experience adaptive difficulty that matches their level — neither overwhelmed nor under-challenged

### Business Success

- **Assessment rejection rate reduction:** Measurably lower assessment invalidations caused by network instability or technical issues outside candidate control
- **Manual review effort:** 80%+ reduction in manual grading for coding assessments through auto-grading with public/hidden test cases
- **Question curation efficiency:** 40-60% reduction in manual question curation time through AI-assisted generation and duplicate detection
- **Support ticket reduction:** ~30% fewer candidate-reported technical issues through pre-test compatibility checks
- **Assessment throughput:** All three business units (Recruitment, Training Center, Service Center) can scale assessment volume without proportional increase in manual effort
- **Measurement accuracy:** Adaptive difficulty provides more precise candidate skill-level evaluation, reducing false positives/negatives in hiring and training decisions

### Technical Success

- Auto-grading execution: p99 < 10s under load; results deterministic and auditable
- Difficulty calibration: tiers auto-calibrated from historical performance data
- Duplicate detection: near-duplicates flagged with review workflow before publish
- Question versioning: all edits versioned with rollback; existing tests remain intact
- Compatibility check: validates browser, OS, network, and hardware pre-test
- Accessibility: UI meets WCAG 2.1 AA baseline for keyboard nav, contrast, screen-reader support
- Bulk upload: CSV/JSON ingestion with validation and clear error reporting
- Multi-file coding: candidates work across multiple files in project-style IDE

### Measurable Outcomes

| Metric | Target | Measurement |
|--------|--------|-------------|
| Manual question curation time | 40-60% reduction | Time tracking before/after AI-assisted generation |
| Manual coding review effort | 80%+ reduction | Reviews requiring human intervention vs auto-graded |
| Candidate technical support tickets | ~30% reduction | Support ticket volume pre/post compatibility check |
| Assessment rejection rate | Measurable decrease | Invalidated assessments due to technical issues |
| Auto-grading latency | p99 < 10s | APM monitoring under load |
| Candidate skill-level accuracy | Improved | Correlation between adaptive test scores and on-job performance |

## Product Scope

### MVP — Q2 2026 Committed (BV 32/40)

**Intelligent Question Bank (BV 9):**
- Q2-4.1: Difficulty calibration from historical data
- Q2-4.2: Duplicate question detection
- Q2-4.3: AI-assisted question generation with human review workflow
- Q2-4.4: Question versioning with history and rollback

**Frictionless Candidate Experience (BV 8):**
- Q2-5.1: Pre-test system compatibility check (browser, OS, network, hardware)
- Q2-5.2: Accessibility features — WCAG 2.1 AA baseline

**Production-Grade Auto-Graded Coding (BV 9):**
- Q2-6.1: Auto-grading with public/hidden test cases, limits, and logs
- Q2-6.2: Multi-file project support — candidates work across multiple files in a project-style IDE; results deterministic and auditable

**Question Lifecycle & Governance (BV 6):**
- Q2-4.5: Bulk upload for coding questions
- Q2-4.6: Question archiving
- Q2-4.7: Global questions across orgs

### Growth Features (Post-MVP / Q2 Uncommitted)

**Multi-Language Assessment Capability (BV 7):**
- Q2-5.3: Multi-language support for coding
- Q2-5.4: Test-creator multi-language setup
- Q2-5.5: Test manager enable multi-language choice

**Adaptive Testing:**
- Real-time difficulty scaling based on candidate performance (increase on correct, decrease on incorrect)
- Random question selection from difficulty-matched pools

### Vision (Future)

- Framework-specific assessments (React, Angular, Spring Boot project templates)
- Integration with AmaliTech CMS for automated skill-to-training pipeline
- Predictive analytics: candidate performance forecasting from assessment patterns
- Cross-org question marketplace with quality scoring

## User Journeys

### Journey 1: Akua — Test Manager

**Situation:** Akua manages technical assessments for AmaliTech's Recruitment unit. She creates questions across multiple domains (JavaScript, Python, algorithms) and builds tests for different role levels. She currently spends hours curating questions manually and worries about duplicate content across the growing question bank.

**Today's Journey:**
Akua logs into the dashboard, navigates to Test Management > Questions, and manually creates each question — selecting type, writing content, setting difficulty based on her own judgment, adding answer options. For coding questions, she writes test cases one by one. When building a test, she scrolls through hundreds of questions, manually selecting ones she thinks match the right difficulty. She has no way to know if a nearly identical question already exists. When she needs 50 coding questions uploaded, she does it one at a time.

**Q2 Transformed Journey:**
Akua opens Question Management and clicks "AI Generate." She provides a domain (JavaScript), difficulty target (Intermediate), and count. The system generates candidate questions that enter a human review workflow — she approves, edits, or rejects each. When she creates a question manually, the system flags "Similar question detected: Q-4821 (87% match)" before she publishes. Every edit she makes is versioned — she can compare v3 to v1 and rollback if needed. For coding questions, she uses bulk upload with a CSV template — 50 questions with test cases ingested in one operation, with clear validation errors for any malformed entries. When building a test, she selects "Auto-assign by difficulty" — the system randomly pulls from calibrated difficulty pools, ensuring balanced coverage. The difficulty tiers are auto-calibrated from historical candidate performance data, not her subjective judgment.

**Capabilities Revealed:** AI-assisted question generation, duplicate detection, question versioning, bulk upload (coding), difficulty calibration, auto-assignment by difficulty pool

---

### Journey 2: Kofi — Candidate

**Situation:** Kofi is a junior developer applying to AmaliTech's Service Center. He received an assessment link via email for a JavaScript + algorithmic thinking evaluation. He's nervous — last time he took an online assessment elsewhere, his browser crashed mid-test and his submission was lost.

**Today's Journey:**
Kofi clicks the assessment link, enters his email, reads the honour code, grants camera/screen permissions, goes through ID verification and face capture, then starts the test. Partway through, his WiFi drops for 3 seconds — the proctoring system logs a violation. His screen goes blank momentarily. He panics, refreshes, and loses his draft answers for the current question. He finishes the assessment stressed, unsure if the violations will invalidate his results. His assessment gets flagged for review, adding manual work for the test manager.

**Q2 Transformed Journey:**
Before Kofi even starts, the system runs a compatibility check: browser version, OS, network stability (latency + bandwidth test), camera/microphone hardware, screen sharing capability. His WiFi shows intermittent drops — the system warns: "Your network connection is unstable. We recommend switching to a wired connection or moving closer to your router." Kofi switches to ethernet, re-runs the check — all green. He proceeds through the honour code, ID verification (OCR confirms his name and ID in seconds), face capture (face detection validates a single clear face), and starts the assessment confidently. The experience is accessible — keyboard navigable, proper contrast ratios, screen-reader compatible. He completes the assessment stress-free, knowing the system validated his setup before he started. No false violations, no lost submissions, no manual review required.

**Capabilities Revealed:** System compatibility check (browser, OS, network, hardware), accessibility (WCAG 2.1 AA), reduced assessment rejection rate, candidate confidence

---

### Journey 3: Ama — Adaptive Coding

**Situation:** Ama is a mid-level Python developer being evaluated for a senior backend role at AmaliTech's Training Center. She's strong in algorithms but hasn't worked much with system design patterns.

**Today's Journey:**
Ama receives a coding assessment with 5 questions — all at the same difficulty level. She breezes through the first 3 algorithm questions, finding them too easy. The last 2 are system design questions she struggles with. Her final score (60%) doesn't reflect that she's excellent at algorithms but needs training on system design. The test manager has to manually interpret her results to understand her actual skill profile.

**Q2 Transformed Journey (Growth — Adaptive Testing):**
Ama starts the coding assessment. The first question is Intermediate-level Python algorithms. She solves it correctly and quickly. The system increases difficulty — the next question is Advanced. She nails it. The system pushes to Expert-level — she solves it but takes longer. The system now shifts to system design: starts at Intermediate. She struggles, gets a partial score. The system scales back to Beginner system design — she handles it. Her result isn't a flat 60% — it's a skill profile: Algorithms: Expert, System Design: Beginner-Intermediate. The training manager sees exactly where Ama needs development, without manual interpretation. During the coding portion, she works in a multi-file project IDE — main.py, utils.py, test_solution.py — mimicking real development work. Auto-grading runs public and hidden test cases with execution logs, and her code is reviewed by AI for quality and patterns.

**Capabilities Revealed:** Adaptive difficulty scaling, multi-file project coding, auto-grading with test cases, AI code review, skill-level profiling

---

### Journey 4: Kwame — Org Admin

**Situation:** Kwame is the Organization Admin for AmaliTech's Recruitment unit. He manages 15 test managers, configures roles and permissions, and ensures assessment quality across the org.

**Today's Journey:**
Kwame logs in, navigates to User Management, invites new test managers with appropriate roles, configures organization settings. When a test manager creates a questionable question, he has no systematic way to review quality. Questions pile up with no lifecycle management — stale questions sit alongside active ones. When another org creates a great question set, there's no way to share it.

**Q2 Transformed Journey:**
Kwame's workflow gains governance tools. He configures question archiving rules — questions unused for 6 months get flagged for review; archived questions are excluded from active test pools but retain full audit history. He enables global questions — marking high-quality questions as reusable across designated orgs, governed by permission rules. When the Training Center creates excellent Python questions, Kwame can pull them into Recruitment's pool without duplication. He monitors the AI-generated question review workflow — ensuring every AI-proposed question passes human review before entering the active bank. Question versioning gives him audit trails for compliance: who changed what, when, and why, with rollback capability.

**Capabilities Revealed:** Question archiving, global questions across orgs, question governance, version audit trails, AI review workflow oversight

---

### Journey 5: Yaa — System Admin

**Situation:** Yaa is the System Admin managing the entire Dodokpo platform across all three business units. She handles organization creation, application approvals, system-wide configuration, and monitoring.

**Today's Journey:**
Yaa reviews new organization applications, approves or rejects them, creates org admin accounts, monitors feature flags, and handles escalations. When candidates report technical issues during assessments, she investigates manually — checking logs, browser details, and network conditions after the fact.

**Q2 Transformed Journey:**
With the pre-test compatibility check, Yaa sees a dramatic drop in technical support escalations. The system catches browser/OS/network issues before assessments start, not after they fail. She monitors compatibility check pass rates in the dashboard — if a particular browser version is causing widespread failures, she can proactively add it to the remediation guidance. She manages global question governance at the system level — approving cross-org question sharing requests, monitoring AI question generation quality metrics, and ensuring difficulty calibration data is accurate across the platform. Feature flags let her roll out Q2 features gradually — enabling adaptive testing for Training Center first, then Recruitment, before Service Center.

**Capabilities Revealed:** Compatibility check monitoring, reduced support escalations, global question governance, feature flag rollout, platform-wide quality monitoring

---

### Journey 6: API Consumer

**Situation:** AmaliTech's internal CMS team needs to programmatically trigger assessments for new hires, pull candidate results into their HR dashboard, and sync skill-level data with the training pipeline.

**Today's Journey:**
The CMS team registers an API account, generates API keys via the External API Integration service, and makes REST calls to dispatch assessments and retrieve results. They authenticate via x-api-key header, hitting endpoints through the API Gateway.

**Q2 Transformed Journey:**
The API surface expands. The CMS team can now query candidate skill profiles generated by adaptive testing — not just pass/fail scores, but granular skill-level breakdowns (e.g., "Python Algorithms: Expert, System Design: Beginner"). They receive webhook callbacks when assessments complete, with richer payload data including auto-graded coding results, AI analysis summaries, and compatibility check outcomes. The integration enables an automated pipeline: new hire to assessment dispatch to adaptive evaluation to skill profile to targeted training assignment — all without manual intervention.

**Capabilities Revealed:** Enhanced API payloads with skill profiles, webhook enrichment, automated assessment-to-training pipeline

---

### Journey Requirements Summary

| Journey | Key Capabilities Revealed |
|---------|--------------------------|
| Akua (Test Manager) | AI question generation, duplicate detection, versioning, bulk upload, difficulty calibration, auto-assignment |
| Kofi (Candidate - Compat) | System compatibility check, accessibility (WCAG 2.1 AA), reduced rejections |
| Ama (Candidate - Adaptive) | Adaptive difficulty, multi-file coding, auto-grading, AI code review, skill profiling |
| Kwame (Org Admin) | Question archiving, global questions, governance, version audit trails |
| Yaa (System Admin) | Compat monitoring, reduced escalations, global governance, feature flags |
| API Consumer | Skill profile API, webhook enrichment, automated pipeline |

## Domain-Specific Requirements

### AI Fairness

- AI-generated questions must pass human review workflow before entering active question bank — no auto-publish
- AI essay marking and code review must provide transparent scoring rationale (score breakdown, rubric alignment)
- Difficulty calibration algorithms must be auditable — calibration data, methodology, and tier assignments visible to administrators
- AI-generated content must be reviewed for cultural, gender, and language bias before approval
- Multiple AI providers (OpenAI, Gemini, Amali AI) must produce consistent scoring for the same submission within acceptable variance thresholds
- Adaptive difficulty scaling must not disadvantage candidates based on initial question selection randomization

### Proctoring Ethics

- Candidates must provide explicit informed consent for webcam monitoring, screenshot capture, and screen recording before assessment begins
- Proctoring data (face captures, screenshots, webcam recordings) must have defined retention periods and automatic purging after retention window
- Proctoring violation flags must distinguish between genuine violations and false positives (e.g., momentary tab switch < 1s, browser notification popups)
- Only authorized personnel (test managers with appropriate RBAC permissions) can access candidate proctoring data
- Face detection must not be used for identity scoring or demographic profiling — limited to presence verification only
- Candidates must be informed of all monitoring methods active during their assessment

### Assessment Integrity

- Difficulty calibration must be statistically validated against historical performance data — not subjective assignment
- Adaptive testing algorithms must produce reliable skill-level profiles — validated through correlation with subsequent on-job performance where data is available
- Question versioning must ensure that modifying a question does not retroactively alter historical assessment results
- Duplicate detection must achieve acceptable precision (minimize false positives that block legitimate similar-but-distinct questions) and recall (catch actual duplicates)
- Auto-grading for coding assessments must be deterministic — identical code must always produce identical results
- Test case execution must be sandboxed with resource limits (time, memory) to prevent exploitation

### Candidate Data Privacy

- Candidate PII (name, email, ID document images, face captures) must be encrypted at rest and in transit
- ID verification images (OCR-processed documents) must be purged after verification — not retained permanently
- Assessment results and personal data must be accessible only within the candidate's organization scope (multi-tenant isolation)
- Data export capabilities must respect organizational boundaries — no cross-org data leakage
- Candidates must have the right to request deletion of their proctoring data after assessment completion
- Audit logs must track all access to candidate PII (who accessed what, when)

### Accessibility Compliance

- UI must meet WCAG 2.1 AA baseline: keyboard navigation, minimum contrast ratios (4.5:1 for text), screen-reader support via ARIA labels
- Assessment-taking experience must be fully keyboard-navigable — no mouse-only interactions required
- Color must not be the sole means of conveying information (e.g., pass/fail status must include text labels, not just red/green)
- Monaco code editor must support screen-reader announcements for code completion and error diagnostics
- Compatibility check must validate assistive technology support (screen readers, magnification) alongside browser/OS/network checks
- All timed assessments must provide configurable time extensions for candidates requiring accommodations

## Web Application Requirements

### Multi-Tenancy

- Strict data isolation between organizations — no cross-tenant data access
- Organization-specific configuration: branding (logo, theme colour), allowed email domains, assessment settings, proctoring levels
- Shared question bank with governed global question sharing across organizations
- Per-organization RBAC with 48 granular permissions and custom role creation

### Real-Time Communication

- Live push notifications for assessment events, feature flag updates, test status changes, and AI analytics streaming
- Asynchronous event bus for inter-service communication (40+ topics)
- Background job processing for email dispatch, bulk upload, and scheduled tasks

### Authentication & Authorization

- Token-based authentication with encrypted payloads shared across all services
- Multi-organization support — users can belong to multiple orgs and switch between them
- API key authentication for external integrations with industry-standard hashing
- Session management with temporal and permanent account blocking after failed authentication attempts
- Device fingerprinting for candidate session integrity during assessments

### Frontend Experience

- Responsive design across desktop and tablet viewports
- Light/dark theming support
- Lazy-loading and conditional preloading for heavy editor components
- Background processing for CSV/file parsing during bulk uploads

### API Gateway & Resilience

- Centralized API Gateway with rate limiting (60 req/30s per client+service) and circuit breaker (3 failures = open, 30s timeout)
- Metrics exposure for request counts, latency, error rates, and circuit breaker state
- Path sanitization to prevent traversal attacks
- Distributed tracing across all services

### Browser Support

- Chrome 100+, Firefox 100+, Safari 16+, Edge 100+
- Screen sharing and webcam access required for proctored assessments

## Functional Requirements

### Question Bank Intelligence

**Difficulty Classification & Calibration:**
- FR1: System classifies every question using two complementary taxonomies: a difficulty tier (Beginner, Intermediate, Advanced, Expert) and a Bloom's Taxonomy cognitive level (Remember, Understand, Apply, Analyze, Evaluate, Create)
- FR2: System continuously recalibrates difficulty tiers as new assessment results are collected — the question bank is self-maintaining, not manually curated
- FR3: System computes difficulty scores from candidate pass/fail rates, average time-to-answer, and score distributions per question
- FR4: Test managers can assign or override Bloom's Taxonomy levels per question to classify cognitive demand independently of statistical difficulty
- FR5: Test managers can view and override system-assigned difficulty tiers with manual adjustments (overrides are tracked in version history)
- FR6: System flags questions with insufficient performance data for calibration review

**Intelligent Test Assembly:**
- FR7: Test managers can specify question distribution by difficulty tier, by Bloom's Taxonomy level, or by a combination of both when building a test
- FR8: System randomly selects questions from matching classified pools to fill the specified distribution
- FR9: System ensures no candidate receives the same question set — randomization produces unique combinations per assessment taker
- FR10: Test managers can preview the difficulty and Bloom's distribution of an assembled test before dispatching

**AI-Assisted Question Generation:**
- FR11: Test managers can trigger AI-assisted question generation by specifying domain, difficulty target, Bloom's level, and count
- FR12: System generates candidate questions that enter a human review workflow before entering active bank
- FR13: Test managers can review, approve, edit, or reject AI-generated questions

**Duplicate Detection & Quality:**
- FR14: System detects and flags near-duplicate questions with similarity score before publish
- FR15: System prevents publishing questions that exceed a configurable similarity threshold against existing bank

**Question Versioning & Lifecycle:**
- FR16: System versions all question edits with full history and rollback capability
- FR17: Test managers can compare any two versions of a question side-by-side
- FR18: Organization admins can archive questions, excluding them from active pools while retaining audit history and historical assessment results
- FR19: System admins can mark questions as global, making them reusable across designated organizations governed by permission rules

**Bulk Operations:**
- FR20: Test managers can bulk upload coding questions via CSV/JSON template with validation
- FR21: System reports bulk upload progress, success/failure counts, and downloadable error details

### Assessment & Dispatch

- FR22: Test managers can create, configure, and dispatch assessments with proctor levels, duration, and pass marks
- FR23: Test managers can dispatch assessments via email, generic link, or bulk batch operations
- FR24: Test managers can add, manage, and filter assessments by tags
- FR25: Test managers can view assessment dispatch history and recall active dispatches

### Coding Assessment Engine

- FR26: Candidates can write and execute code in a multi-file project-style IDE during assessments
- FR27: System auto-grades coding submissions using public and hidden test cases with execution limits
- FR28: System displays clear pass/fail logs per test case with execution time and memory usage
- FR29: System supports JavaScript, TypeScript, Python, and Java for code execution
- FR30: Test managers can define public test cases (visible to candidates) and hidden test cases (grading only)
- FR31: System enforces resource constraints (time limit, memory limit) per test case execution
- FR32: AI reviews candidate code for quality, patterns, and best practices (supplementing auto-grading)

### Candidate & Proctoring

- FR33: System runs pre-test compatibility check validating browser, OS, network stability, camera, microphone, and screen sharing
- FR34: System provides clear remediation guidance when compatibility issues are detected
- FR35: Candidates can re-run compatibility check after resolving issues
- FR36: System performs ID verification via document OCR with confidence scoring
- FR37: System performs face capture verification via face detection with quality validation
- FR38: System monitors candidates during assessments via webcam capture, screenshot capture, and tab-switching detection
- FR39: System distinguishes genuine proctoring violations from false positives using debounce and minimum-duration thresholds
- FR40: Candidates can view their assessment results after completion (when configured by test manager)
- FR41: System tracks and reports compatibility check pass/fail rates per browser, OS, and network condition
- FR42: System tracks assessment rejection rates caused by technical issues and surfaces trends to administrators

### Adaptive Testing (Growth)

- FR43: System dynamically adjusts question difficulty based on candidate performance during assessment
- FR44: System increases difficulty for subsequent questions when candidate scores correctly
- FR45: System decreases difficulty for subsequent questions when candidate fails
- FR46: System generates skill-level profiles from adaptive assessment results (e.g., "Algorithms: Expert, System Design: Beginner")
- FR47: Test managers can enable/disable adaptive mode per assessment

### User & Organization Management

- FR48: Organization admins can invite, activate, deactivate, and delete users with RBAC (48 permissions)
- FR49: Organization admins can create custom roles with specific permission combinations
- FR50: Users can belong to multiple organizations and switch between them
- FR51: System admins can create, activate, deactivate, and remove organizations
- FR52: System admins can review and approve/reject new organization applications

### Skills Management

- FR53: Test managers can create skills with hierarchical levels and assign assessments to each level
- FR54: Test managers can dispatch assessments via skill-level assignment
- FR55: Test managers can bulk upload skills via CSV
- FR56: Test managers can map skills to external systems for CMS integration

### Reporting & Analytics

- FR57: Test managers can view assessment reports with candidate metrics, comparative analysis, and score distributions
- FR58: System provides AI-powered candidate performance analysis and question analytics
- FR59: Test managers can view proctoring data (screenshots, webcam captures, violation logs) per candidate
- FR60: System streams AI analytics insights to users in real-time
- FR61: System supports webhook callbacks to external systems with enriched assessment result payloads
- FR62: Test managers can export candidate results and assessment data

### Notifications

- FR63: System delivers in-app notifications in real-time for assessment events, user lifecycle events, and administrative actions
- FR64: System sends email notifications for assessment dispatch, completion, password management, and account events
- FR65: Users can configure notification preferences and toggle notification categories on/off
- FR66: Users can mark notifications as read, unread, and bulk-manage notifications

### Feature Flags

- FR67: System admins can manage feature flags with real-time propagation to all services
- FR68: Organization admins can configure organization-specific settings (branding, assessment defaults, allowed email domains)
- FR69: System admins can roll out features gradually by organization via feature flag targeting

### External API

- FR70: External systems can authenticate via API keys to dispatch assessments and retrieve results programmatically
- FR71: API consumers can query candidate skill profiles generated by adaptive testing
- FR72: System provides webhook callbacks with enriched payloads (auto-graded results, AI analysis, compatibility outcomes)

## Non-Functional Requirements

### Performance

- NFR1: API Gateway must respond to proxied requests within 200ms (p95) under normal load
- NFR2: Auto-grading for coding assessments must complete within 10s (p99) under concurrent load
- NFR3: AI essay marking must return results within 15s (p95) per submission
- NFR4: Frontend dashboard must achieve Largest Contentful Paint (LCP) < 2.5s on standard broadband
- NFR5: Bulk upload processing must handle 500 questions per batch without timeout
- NFR6: Real-time notification delivery must occur within 2s of triggering event

### Scalability

- NFR7: System must support 100 concurrent assessment-takers per organization without performance degradation
- NFR8: Question bank must scale to 100,000+ questions per organization with sub-second search
- NFR9: Event consumers must process assessment lifecycle events with < 5s end-to-end latency

### Security

- NFR10: All candidate PII must be encrypted at rest (AES-256) and in transit (TLS 1.2+)
- NFR11: Authentication payloads must be encrypted between all services
- NFR12: API keys must be hashed using industry-standard key derivation with configurable parameters
- NFR13: Rate limiting must enforce 60 requests per 30-second window per client+service combination
- NFR14: Circuit breaker must open after 3 consecutive downstream failures with 30s recovery timeout
- NFR15: All access to candidate PII must be audit-logged with actor, action, and timestamp

### Reliability

- NFR16: System must maintain 99.5% uptime during business hours (Mon-Fri, 8am-6pm GMT)
- NFR17: Assessment submissions must not be lost due to transient network failures — draft auto-save with recovery
- NFR18: Event bus must guarantee at-least-once processing for all assessment lifecycle events
- NFR19: Database migrations must be backward-compatible — zero-downtime deployments

### Accessibility

- NFR20: UI must meet WCAG 2.1 AA compliance for all assessment-taking and management interfaces
- NFR21: All interactive elements must be keyboard-navigable with visible focus indicators
- NFR22: Color contrast ratios must meet 4.5:1 minimum for normal text, 3:1 for large text
- NFR23: All images and icons must have descriptive alt text or ARIA labels

### Observability

- NFR24: All services must emit structured logs to centralized logging
- NFR25: Distributed tracing must span all service-to-service calls
- NFR26: Error monitoring must capture and alert on unhandled exceptions across all services
- NFR27: API Gateway must expose metrics for request volume, latency, error rate, and circuit breaker state
