# PRD Validation Report - Dodokpo Assessment Platform

**Validation Date:** 2026-04-15
**PRD Author:** Thomas
**Validator:** Validation Architect (BMAD Method)
**PRD File:** `_bmad-output/planning-artifacts/prd.md`


## 1. Format Detection (Step V-02)

**Status: PASS**
**Score: 9 / 10**

### PRD Structure -- Level 2 Headers Found

1. `## Executive Summary`
2. `## Project Classification`
3. `## Success Criteria`
4. `## Product Scope`
5. `## User Journeys`
6. `## Domain-Specific Requirements`
7. `## Web Application Specific Requirements`
8. `## Project Scoping & Phased Development`
9. `## Functional Requirements`
10. `## Non-Functional Requirements`

### BMAD Core Sections Present

| Core Section | Status |
|---|---|
| Executive Summary | Present |
| Success Criteria | Present |
| Product Scope | Present |
| User Journeys | Present |
| Functional Requirements | Present |
| Non-Functional Requirements | Present |

**Format Classification:** BMAD Standard
**Core Sections Present:** 6/6

### Findings

- All 6 core BMAD sections are present.
- Proper `## Level 2` headers used for all main sections.
- Frontmatter is present with YAML metadata (stepsCompleted, classification, inputDocuments, workflowType, documentCounts, projectType).
- Document has author and date fields.

### Minor Issue

- The PRD has two scope-related sections: `## Product Scope` (line 101) and `## Project Scoping & Phased Development` (line 324). These overlap significantly -- Product Scope lists MVP/Growth/Vision, and Project Scoping repeats the same breakdown with slightly different framing. This creates redundancy and confusion about which is authoritative. **Recommendation:** Merge into a single `## Product Scope` section.


## 3. Information Density (Step V-03)

**Status: PARTIAL**
**Score: 7 / 10**

### Anti-Pattern Scan Results

**Conversational Filler Phrases:** 0 occurrences
- No instances of "The system will allow users to...", "It is important to note that...", "In order to..." found. FRs consistently use the concise "[Actor] can [capability]" or "System [verb]" patterns.

**Wordy Phrases:** 0 occurrences
- No instances of "Due to the fact that", "In the event of", "At this point in time" found.

**Redundant Phrases:** 0 occurrences
- No instances of "Future plans", "Past history", "Absolutely essential" found.

**Total Anti-Pattern Violations:** 0

**Severity Assessment:** Pass for explicit anti-patterns.

### However -- Density Concerns Found

While the PRD avoids the specific anti-patterns, it has other density issues:

1. **Duplicate content between sections (significant):**
   - Product Scope (lines 101-141) and Project Scoping & Phased Development (lines 324-374) repeat nearly identical content. The MVP feature lists, Growth features, and Vision items are stated twice with slight rewording.
   - Journey Requirements Summary table (lines 229-237) repeats what each journey already stated.
   - Risk Mitigation Strategy (lines 360-374) partially overlaps with Domain-Specific Requirements.

2. **Narrative journeys carry implementation details that reduce density:**
   - Journey 2 (Kofi, line 166) names "tesseract.js OCR" and "face-api.js" -- these are implementation details in a narrative context that should describe capabilities, not libraries.
   - Journey 3 (Ama, line 179-181) describes adaptive testing flow in detail that duplicates FR35-FR39.

3. **Executive Summary is implementation-heavy (lines 36-38):**
   - Names 10+ specific technologies: Judge0, face-api.js, tesseract.js, OpenAI GPT-4, Google Gemini, Amali AI, Server-Sent Events, Apache Kafka, Node.js/Express/NestJS, Java/Spring Boot, Python/FastAPI, Angular 20, Nx, Module Federation, NgRx, TailwindCSS.
   - An Executive Summary should communicate vision and value, not architecture stack.

### Recommendations

1. Remove the `## Project Scoping & Phased Development` section entirely -- it duplicates `## Product Scope`.
2. Strip technology names from the Executive Summary. Replace with capability descriptions (e.g., "real-time code execution engine" instead of "Judge0").
3. Remove library names from user journeys -- describe what the system does, not what library does it.


## 5. Measurability (Step V-05)

**Status: PARTIAL**
**Score: 6 / 10**

### Functional Requirements Analysis

**Total FRs Analyzed:** 64

**Format Compliance:**
- 62/64 FRs follow the "[Actor] can [capability]" or "System [verb]" pattern. Good compliance.
- FR30 and FR31 include implementation details within their format (see Implementation Leakage below).

**Subjective Adjectives Found:** 1
- Line 177: "easy" appears in Journey 3 narrative context ("finding them too easy") -- this is narrative, not a requirement, so it is acceptable.
- No subjective adjectives found in FRs or NFRs themselves.

**Vague Quantifiers Found:** 3
- FR40 (line 437): "granular RBAC (48 permissions)" -- 48 is specific, but "granular" is subjective. Minor.
- FR14 (line 396): "e.g., 30% beginner, 50% intermediate, 20% advanced" -- the example is good but the FR itself is "specify difficulty distribution" which is vague about what distributions are valid.
- FR26 (line 413): "AI reviews candidate code for quality, patterns, and best practices" -- "quality" and "best practices" are subjective without defined rubrics or metrics.

**FRs Lacking Measurability (not testable as-is):**

| FR | Issue |
|---|---|
| FR3 | "auto-calibrates question difficulty tiers from historical data" -- no threshold for what constitutes correct calibration; no minimum sample size |
| FR4 | "flags near-duplicate questions with similarity score" -- no minimum similarity threshold defined |
| FR26 | "AI reviews candidate code for quality, patterns, and best practices" -- subjective criteria without defined rubric |
| FR33 | "distinguishes genuine proctoring violations from false positives using debounce and minimum-duration thresholds" -- "debounce" is implementation; thresholds not specified |
| FR35-FR39 | Adaptive testing FRs are capability descriptions but lack measurement criteria for accuracy of difficulty adjustment |
| FR38 | "generates granular skill-level profiles" -- "granular" is subjective |

### Non-Functional Requirements Analysis

**Total NFRs Analyzed:** 27

**NFRs with Specific Metrics:** 22/27 (good)

**NFRs Missing Metrics or Context:**

| NFR | Issue |
|---|---|
| NFR17 | "Assessment submissions must not be lost due to transient network failures" -- no definition of "transient" or recovery time target |
| NFR19 | "Database migrations must be backward-compatible" -- how is backward-compatibility measured/verified? |
| NFR23 | "All images and icons must have descriptive alt text or ARIA labels" -- "descriptive" is subjective |
| NFR24 | Names specific tools (Winston/Spring Boot logging) -- implementation leakage, not measurability issue per se |
| NFR26 | Names specific tool (Sentry) -- implementation leakage |

**NFRs with Good Measurability (examples):**
- NFR1: "200ms (p95) under normal load" -- specific
- NFR2: "10s (p99) under concurrent load" -- specific
- NFR7: "100 concurrent assessment-takers per organization" -- specific
- NFR10: "AES-256 at rest, TLS 1.2+ in transit" -- specific (though prescriptive)
- NFR22: "4.5:1 minimum for normal text, 3:1 for large text" -- specific

### Overall Assessment

**Total Requirements:** 91 (64 FRs + 27 NFRs)
**Total Measurability Violations:** 11
**Severity:** Warning

**Recommendation:** Refine the 11 flagged requirements to include specific, measurable acceptance criteria. Focus on FR3, FR4, FR26, and FR33 as priorities.


## 7. Implementation Leakage (Step V-07)

**Status: FAIL**
**Score: 3 / 10**

This is the most significant issue in the PRD. A PRD should specify capabilities (WHAT), not implementation (HOW). Technology choices belong in the Architecture document.

### Leakage in Functional Requirements (Critical)

| FR | Leakage | Recommendation |
|---|---|---|
| FR23 (line 409) | "System supports JavaScript, TypeScript, Python, and Java for code execution" | Acceptable -- these are supported languages, a capability. **Not a violation.** |
| FR30 (line 417) | "System performs ID verification via document OCR **(tesseract.js)** with confidence scoring" | Remove "(tesseract.js)" -- say "via document OCR" |
| FR31 (line 418) | "System performs face capture verification via face detection **(face-api.js)** with quality validation" | Remove "(face-api.js)" -- say "via face detection" |
| FR52 (line 470) | "System streams AI analytics insights in real-time **via SSE**" | Remove "via SSE" -- say "in real-time" |
| FR55 (line 476) | "System sends in-app notifications **via SSE** for assessment events..." | Remove "via SSE" -- say "in real-time" |
| FR59 (line 483) | "System admins can manage feature flags with real-time propagation to all services **via Kafka + SSE**" | Remove "via Kafka + SSE" -- say "with real-time propagation to all services" |

**FR Leakage Count:** 5 violations (FR30, FR31, FR52, FR55, FR59)

### Leakage in Non-Functional Requirements (Critical)

| NFR | Leakage | Recommendation |
|---|---|---|
| NFR9 (line 489) | "**Kafka** consumers must process assessment lifecycle events..." | Rewrite: "Event consumers must process assessment lifecycle events with < 5s end-to-end latency" |
| NFR10 (line 493) | "encrypted at rest **(AES-256)** and in transit **(TLS 1.2+)**" | Borderline -- AES-256 and TLS 1.2+ are industry standards that can serve as measurable NFR targets. **Acceptable for a brownfield PRD.** |
| NFR11 (line 494) | "**JWT** payloads must be **AES-encrypted** between all microservices" | Rewrite: "Authentication payloads must be encrypted between all services" |
| NFR12 (line 495) | "API keys must be hashed using **PBKDF2** with configurable salt, iterations, and key length" | Rewrite: "API keys must be hashed using industry-standard key derivation with configurable parameters" |
| NFR14 (line 498) | "Circuit breaker must open after 3 consecutive downstream failures with 30s recovery timeout" | Acceptable -- specifies behavior, not implementation tool |
| NFR18 (line 504) | "**Kafka** message delivery must guarantee at-least-once processing..." | Rewrite: "Event bus must guarantee at-least-once processing for all assessment lifecycle events" |
| NFR24 (line 516) | "All services must emit structured logs to centralized logging **(Winston/Spring Boot logging)**" | Remove "(Winston/Spring Boot logging)" |
| NFR25 (line 517) | "Distributed tracing must span all service-to-service calls **via OpenTelemetry**" | Remove "via OpenTelemetry" -- say "via distributed tracing" |
| NFR26 (line 518) | "**Sentry** must capture and alert on unhandled exceptions across all services" | Rewrite: "Error monitoring must capture and alert on unhandled exceptions across all services" |
| NFR27 (line 519) | "API Gateway must expose **Prometheus** metrics for request volume..." | Rewrite: "API Gateway must expose metrics for request volume, latency, error rate, and circuit breaker state" |

**NFR Leakage Count:** 8 violations (NFR9, NFR11, NFR12, NFR18, NFR24, NFR25, NFR26, NFR27)

### Leakage in Non-Requirements Sections (Informational)

These are less critical since they appear in contextual/descriptive sections, but they still violate BMAD density principles:

| Section | Line(s) | Technologies Named |
|---|---|---|
| Executive Summary | 36-38 | Judge0, face-api.js, tesseract.js, OpenAI GPT-4, Google Gemini, Amali AI, SSE, Apache Kafka, Node.js/Express/NestJS, Java/Spring Boot, Python/FastAPI, Angular 20, Nx, Module Federation, NgRx, TailwindCSS |
| User Journey 2 (Kofi) | 166 | tesseract.js, face-api.js |
| Web App Requirements | 297-322 | SSE, Kafka, BullMQ, JWT, AES, PBKDF2, Angular 20, Nx, Module Federation, NgRx, TailwindCSS, Monaco, Web Workers, Prometheus, OpenTelemetry |
| Risk Mitigation | 365 | Judge0 |
| Domain Requirements | 247 | OpenAI, Gemini, Amali AI |
| Domain Requirements | 282 | Monaco code editor |

**Non-Requirements Leakage Count:** 20+ technology references in descriptive sections

### Summary

**Total Implementation Leakage Violations (in FRs/NFRs):** 13
**Severity:** CRITICAL

**Recommendation:** This PRD reads partly as an architecture document. The `## Web Application Specific Requirements` section (lines 288-322) is almost entirely implementation architecture -- it names Angular 20, Nx, Module Federation, NgRx, TailwindCSS, JWT, AES, PBKDF2, Kafka, BullMQ, Prometheus, OpenTelemetry. This section should be rewritten to describe WHAT capabilities are required for a web application (multi-tenancy, real-time updates, authentication, responsive design, API resilience) without prescribing HOW.

For a brownfield project, it is understandable that the team knows the stack, but the PRD should remain implementation-agnostic so that:
1. Architecture decisions are explicitly documented in the architecture artifact.
2. Downstream AI agents don't treat implementation choices as immutable requirements.
3. The traceability chain remains clean (requirement --> architecture decision --> implementation).


## 9. Project Type Compliance (Step V-09)

**Status: PARTIAL**
**Score: 7 / 10**

**Project Type:** Web Application (SaaS) -- maps to `web_app` and `saas_b2b` in project-types.csv.

### Required Sections for web_app

Per project-types.csv:
- `browser_matrix` -- Browser support specifications
- `responsive_design` -- Responsive design requirements
- `performance_targets` -- Performance targets
- `seo_strategy` -- SEO strategy (can be N/A for internal platform)
- `accessibility_level` -- Accessibility level

### Required Sections for saas_b2b

Per project-types.csv:
- `tenant_model` -- Multi-tenancy model
- `rbac_matrix` -- RBAC model
- `subscription_tiers` -- Subscription/licensing tiers
- `integration_list` -- Integration list
- `compliance_reqs` -- Compliance requirements

### Compliance Check

| Requirement | Status | Notes |
|---|---|---|
| Browser Support Matrix | Missing | No browser support matrix specified. Journey 2 mentions "browser version" in compatibility check, but no FRs or NFRs define minimum browser versions or supported browsers. |
| Responsive Design | Present | Line 313: "Responsive design with light/dark theming" (though this is in the implementation-heavy Web App section). No FR specifies responsive behavior. |
| Performance Targets | Present | NFR1-NFR6 provide specific performance targets. |
| SEO Strategy | N/A | Internal platform -- SEO not applicable. |
| Accessibility Level | Present | WCAG 2.1 AA specified throughout (Domain Requirements, NFR20-NFR23). |
| Multi-Tenancy Model | Present | Lines 289-292 describe multi-tenancy. |
| RBAC Matrix | Present | "48 granular permissions" referenced in FR40. |
| Subscription Tiers | N/A | Internal platform -- no subscription model. |
| Integration List | Partial | Journey 6 and FR62-FR64 cover external API, but no comprehensive integration list exists. |
| Compliance Requirements | Present | Domain-Specific Requirements section covers compliance thoroughly. |

### Findings

- **Missing:** Browser support matrix. For a web application, supported browsers and minimum versions should be specified (e.g., "Chrome 100+, Firefox 100+, Safari 16+, Edge 100+").
- **Missing:** No FR for responsive design behavior. The Web App Requirements section mentions it but only as an implementation note ("Responsive design with light/dark theming via CSS custom properties").
- **Partially Present:** Integration list is limited to the CMS team API integration (Journey 6). If other integrations exist or are planned, they should be listed.

### Recommendation

1. Add a browser support matrix to NFRs or Web Application Requirements (as a capability requirement, not implementation).
2. Add an FR for responsive/adaptive layout behavior across device sizes.
3. Expand integration list if additional integrations are known.


## 11. Holistic Quality Assessment (Step V-11)

**Status: PARTIAL**
**Score: 7 / 10**

### Document Flow and Coherence

**Assessment:** Good

**Strengths:**
- Strong narrative arc from Executive Summary through User Journeys -- the document tells a compelling story about transforming Dodokpo from a capable tool into an intelligent engine.
- User journeys are vivid, concrete, and grounded in real scenarios with named personas (Akua, Kofi, Ama, Kwame, Yaa).
- The "Today's Journey" vs "Q2 Transformed Journey" structure effectively communicates the value proposition.
- FRs are logically grouped into coherent capability areas.
- Domain-Specific Requirements section is thorough and well-organized.

**Areas for Improvement:**
- The document is 520 lines, which is substantial. The redundancy between Product Scope and Project Scoping sections inflates this unnecessarily.
- The Web Application Specific Requirements section breaks document flow by injecting architecture details into a requirements document.
- Transition from User Journeys to Domain Requirements is abrupt -- a brief bridging sentence would help.

### Dual Audience Effectiveness

**For Humans:**
- Executive-friendly: Good -- the Executive Summary and "What Makes This Special" section provide clear, accessible context. However, the technology name-dropping in the Executive Summary may confuse non-technical executives.
- Developer clarity: Strong -- FRs are clear and actionable for developers.
- Designer clarity: Adequate -- User Journeys provide design context, but no explicit UX requirements or design constraints are stated.
- Stakeholder decision-making: Good -- Success Criteria with measurable outcomes table enables decision-making.

**For LLMs:**
- Machine-readable structure: Strong -- ## Level 2 headers, consistent FR/NFR numbering, YAML frontmatter.
- UX readiness: Adequate -- Journeys provide flow context, but lack explicit screen-level or interaction-level requirements.
- Architecture readiness: Strong (arguably too strong) -- the implementation details provide explicit architecture guidance, though this violates BMAD principles.
- Epic/Story readiness: Strong -- FR groupings map naturally to epics; individual FRs are story-sized.

**Dual Audience Score:** 4/5

### BMAD PRD Principles Compliance

| Principle | Status | Notes |
|---|---|---|
| Information Density | Partial | No filler phrases, but significant content redundancy between sections |
| Measurability | Partial | Most requirements measurable; 11 violations across FRs and NFRs |
| Traceability | Partial | Strong chain but 4 orphan FRs and 1 unsupported journey capability |
| Domain Awareness | Met | Comprehensive domain coverage for EdTech/HR Tech with 5 subsections |
| Zero Anti-Patterns | Partial | No filler anti-patterns, but implementation leakage is a significant anti-pattern |
| Dual Audience | Met | Works well for both humans and LLMs |
| Markdown Format | Met | Proper structure, headers, tables, consistent formatting |

**Principles Met:** 3/7 fully met, 4/7 partially met

### Overall Quality Rating

**Rating:** 3.5/5 -- Good with significant improvements needed

**Scale Reference:**
- 5/5 -- Excellent: Exemplary, ready for production use
- 4/5 -- Good: Strong with minor improvements needed
- 3/5 -- Adequate: Acceptable but needs refinement
- 2/5 -- Needs Work: Significant gaps or issues
- 1/5 -- Problematic: Major flaws, needs substantial revision

### Top 3 Improvements

1. **Remove all implementation leakage from FRs and NFRs.**
   This is the single highest-impact change. Rewrite FR30, FR31, FR52, FR55, FR59, NFR9, NFR11, NFR12, NFR18, NFR24, NFR25, NFR26, NFR27 to specify capabilities without naming specific technologies. Move the Web Application Specific Requirements section content to the architecture document.

2. **Eliminate content redundancy.**
   Merge `## Product Scope` and `## Project Scoping & Phased Development` into a single section. Remove the Journey Requirements Summary table (it adds no information not already in the journeys). This will reduce document length by approximately 50 lines while improving density.

3. **Add measurability to the 7 flagged FRs.**
   FR3, FR4, FR26, FR33, FR38 need specific thresholds and acceptance criteria. FR30, FR31 need implementation references removed. This ensures every FR is testable for acceptance.

### Summary

**This PRD is:** A thorough brownfield documentation effort with strong product thinking and comprehensive domain coverage, undermined by systematic implementation leakage that blurs the line between requirements and architecture.

**To make it great:** Strip all technology names from requirements, eliminate section redundancy, and add measurability to the 7 flagged FRs.


## Critical Issues (Must Fix)

These issues must be resolved before the PRD can reliably feed downstream BMAD artifacts:

### C1: Implementation Leakage in Functional Requirements (5 FRs)

**FRs affected:** FR30, FR31, FR52, FR55, FR59

FRs must specify WHAT the system does, not HOW. Remove all technology/library names:
- FR30: Remove "(tesseract.js)"
- FR31: Remove "(face-api.js)"
- FR52: Remove "via SSE"
- FR55: Remove "via SSE"
- FR59: Remove "via Kafka + SSE"

### C2: Implementation Leakage in Non-Functional Requirements (8 NFRs)

**NFRs affected:** NFR9, NFR11, NFR12, NFR18, NFR24, NFR25, NFR26, NFR27

Rewrite to specify quality attributes without naming implementation tools:
- NFR9: "Kafka consumers" --> "Event consumers"
- NFR11: "JWT payloads must be AES-encrypted" --> "Authentication payloads must be encrypted"
- NFR12: "PBKDF2" --> "industry-standard key derivation"
- NFR18: "Kafka message delivery" --> "Event bus message delivery"
- NFR24: Remove "(Winston/Spring Boot logging)"
- NFR25: Remove "via OpenTelemetry"
- NFR26: "Sentry" --> "Error monitoring service"
- NFR27: "Prometheus" --> remove tool name; keep metric requirements

### C3: Executive Summary Contains Architecture Stack Details

**Lines affected:** 36-38

The Executive Summary names 16+ specific technologies. Replace with capability descriptions:
- "real-time code execution via Judge0" --> "real-time code execution engine"
- "AI-powered marking (OpenAI GPT-4, Google Gemini, Amali AI)" --> "AI-powered marking with multiple provider support"
- "face verification via face-api.js, ID document OCR via tesseract.js" --> "face verification and ID document OCR"
- "real-time notifications via Server-Sent Events" --> "real-time notifications"
- "polyglot microservices architecture (10 services: Node.js/Express/NestJS, Java/Spring Boot, Python/FastAPI)" --> "polyglot microservices architecture (10 services)"
- "Angular 20 Nx monorepo using Module Federation, NgRx Component Store, and TailwindCSS" --> "modern frontend monorepo with micro-frontend architecture"

### C4: Web Application Specific Requirements is an Architecture Document

**Lines affected:** 288-322

This entire section describes implementation architecture, not product requirements. Rewrite to specify capabilities:
- "Angular 20 Nx monorepo with Module Federation" --> "Frontend must support modular deployment of independent application segments"
- "NgRx Component Store for state management across 7 domain stores" --> "State management must support domain-specific isolation"
- "JWT-based authentication with AES-encrypted payloads" --> "Authentication must use encrypted tokens shared across all services"
- "BullMQ job queues" --> "Background job processing for async operations"

### C5: Non-Specific Success Criteria Metrics

**Lines affected:** 97-99

Two metrics in the Measurable Outcomes table are not measurable:
- "Assessment rejection rate: Measurable decrease" --> specify a target (e.g., "50% reduction")
- "Candidate skill-level accuracy: Improved" --> specify a correlation target (e.g., "r >= 0.7 between adaptive test scores and 90-day performance reviews")

### C6: Content Redundancy Between Product Scope and Project Scoping

**Lines affected:** 101-141 and 324-374

These two sections contain largely duplicated content. Merge into a single `## Product Scope` section. Remove `## Project Scoping & Phased Development` entirely after consolidating any unique content (Risk Mitigation Strategy can be retained as a subsection).

### C7: Orphan Skills Management FRs

**FRs affected:** FR45-FR48

Four FRs for Skills Management have no supporting user journey or success criterion. Either:
- Add a user journey for skills management, OR
- Trace these FRs explicitly to an existing business objective, OR
- Move to a "Carried Forward" section acknowledging these are existing capabilities not part of Q2 scope


## Recommendations Summary

### Priority 1 -- Critical (Block Downstream Use)

1. Remove all implementation leakage from FRs (C1) and NFRs (C2).
2. Rewrite Executive Summary without technology names (C3).
3. Rewrite Web Application Specific Requirements as capability requirements (C4).
4. Add specific targets to the two vague success criteria metrics (C5).

### Priority 2 -- Important (Before Architecture)

5. Eliminate content redundancy by merging scope sections (C6).
6. Resolve orphan Skills Management FRs with journey or traceability (C7).
7. Add measurability to flagged FRs: FR3, FR4, FR26, FR33, FR38 (M3-M6).

### Priority 3 -- Housekeeping (Before Epics)

8. Remove library names from user journeys (M1).
9. Add browser support matrix (M7).
10. Add responsive design FR (M8).
11. Add FRs for compatibility monitoring and rejection rate tracking (M9, M10).
12. Specify proctoring data retention periods and AI bias review methodology (M11, M12).

