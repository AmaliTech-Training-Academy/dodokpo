---
project_name: Dodokpo
date: '2026-04-15'
sprintDuration: '2 weeks'
totalSprints: 5
teams:
  - name: Team Alpha
    profile: Experienced developers with deep product knowledge
    focus: Complex backend, data model, AI integration, calibration
  - name: Team Delta
    profile: New members (+ 3 senior devs), ramping up
    focus: Frontend-heavy features, candidate experience, gradual complexity increase
---

# Dodokpo Q2 2026 — Sprint Plan

**Framework:** Nexus (2 Scrum Teams, 2-week sprints, 1 Product Owner)
**Duration:** 5 sprints (10 weeks)
**Teams:** Team Alpha (experienced) + Team Delta (ramping up)

---

## Team Profiles & Assignment Strategy

### Team Alpha (Experienced)
- Deep knowledge of the codebase, especially backend services (test-creation, ai, reporting)
- Takes the most architecturally complex and high-risk work
- Owns foundational schemas that unblock other work
- Mentors Team Delta through shared PRs and joint sprint planning

### Team Delta (Ramping Up)
- New members with 3 experienced devs as anchors
- **Sprint 1:** Eased in with well-scoped, independent frontend work (no cross-team dependencies)
- **Sprint 2+:** Gradually takes on more backend integration and complex stories
- By Sprint 3, operating at full velocity on both frontend and backend

```mermaid
flowchart LR
    subgraph "Team Alpha 🔵"
        direction TB
        A_S1["Sprint 1\n🔴 Hard\nE1: Versioning Schema\nE2: Difficulty + Bloom's Schema"]
        A_S2["Sprint 2\n🔴 Hard\nE3: Duplicate Detection\nE3: AI Generation"]
        A_S3["Sprint 3\n🟡 Medium\nE4: Bulk Upload\nE7: Calibration Pipeline"]
        A_S4["Sprint 4\n🟡 Medium\nE7: Calibration Completion\nE9: Reporting Enrichment"]
        A_S5["Sprint 5\n🟢 Polish\nE9: Webhooks + API\nIntegration Testing"]
    end

    subgraph "Team Delta 🟢"
        direction TB
        D_S1["Sprint 1\n🟢 Easy\nE5: Multi-File IDE\nE8: Compat Check (frontend)"]
        D_S2["Sprint 2\n🟢→🟡\nE6: Auto-Grading\nE8: Compat Check (backend)"]
        D_S3["Sprint 3\n🟡 Medium\nE8: Accessibility\nE8: Rejection Analytics"]
        D_S4["Sprint 4\n🟡→🔴\nE10: Adaptive Testing\nE9: Notifications"]
        D_S5["Sprint 5\n🟡 Medium\nE10: Skill Profiles\nE9: Assessment Lifecycle"]
    end

    A_S1 -->|"Versioning schema ready"| A_S2
    A_S2 -->|"Duplicate detection + AI gen"| A_S3
    A_S3 -->|"Difficulty data exists"| A_S4
    A_S4 -->|"Calibration + reporting"| A_S5

    D_S1 -->|"IDE ready"| D_S2
    D_S2 -->|"Auto-grading ready"| D_S3
    D_S3 -->|"Compat + a11y done"| D_S4
    D_S4 -->|"Adaptive engine"| D_S5

    A_S1 -.->|"Versioning schema\nunblocks AI gen"| A_S2
    A_S3 -.->|"Calibrated tiers\nunblock adaptive"| D_S4
    D_S2 -.->|"Auto-grading results\nenrich reporting"| A_S4
    D_S3 -.->|"Compat check data\nenriches reporting"| A_S4
```

---

## Sprint-by-Sprint Breakdown

### Sprint 1: Foundations

**Sprint Goal:** Lay the foundational schemas and deliver independent frontend features.

#### Team Alpha — Sprint 1

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 1.1 | E1 | FR16 | 🔴 Hard | Question Version Creation and History — new QuestionVersion Prisma model, append-only versioning, rollback, audit trail |
| 1.2 | E1 | FR17 | 🟡 Medium | Version Comparison (Side-by-Side Diff) — diff UI for question versions |
| 1.3 | E1 | FR18 | 🟡 Medium | Question Archiving — archive status, exclusion from pools, restore capability |
| 2.1 | E2 | FR1 | 🔴 Hard | Difficulty Tier + Bloom's Taxonomy Schema — Prisma migration, new enums, calibration fields |

**Alpha Sprint 1 Output:** Versioning schema live, archiving functional, difficulty/Bloom's schema deployed.

#### Team Delta — Sprint 1

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 5.1 | E5 | FR26 | 🟡 Medium | Multi-File Project Editor (Frontend) — file tree, Monaco tabs, project submission |
| 8.1 | E8 | FR33 | 🟢 Easy | Pre-Test Compatibility Check (Frontend) — browser, OS, network, camera, mic, screen sharing checks |
| 8.2 | E8 | FR34, FR35 | 🟢 Easy | Remediation Guidance UI — clear guidance when issues detected, re-run check |

**Delta Sprint 1 Output:** Multi-file IDE functional, compatibility check frontend complete. *No backend dependencies — fully independent work.*

#### Dependencies — Sprint 1
```mermaid
flowchart LR
    subgraph "Sprint 1"
        A11["Alpha: 1.1 Versioning Schema"] 
        A12["Alpha: 1.2 Version Diff"]
        A13["Alpha: 1.3 Archiving"]
        A21["Alpha: 2.1 Difficulty Schema"]
        D51["Delta: 5.1 Multi-File IDE"]
        D81["Delta: 8.1 Compat Check FE"]
        D82["Delta: 8.2 Remediation UI"]
    end

    A11 -->|"Schema must be\nmerged first"| A12
    A11 -->|"Schema must be\nmerged first"| A13

    style A11 fill:#e74c3c,color:#fff
    style A21 fill:#e74c3c,color:#fff
    style D51 fill:#2ecc71,color:#fff
    style D81 fill:#2ecc71,color:#fff
    style D82 fill:#2ecc71,color:#fff
    style A12 fill:#f39c12,color:#fff
    style A13 fill:#f39c12,color:#fff
```
**No cross-team dependencies in Sprint 1.** Teams work fully independently.

---

### Sprint 2: Intelligence & Grading

**Sprint Goal:** Deliver duplicate detection, AI generation, and auto-grading.

#### Team Alpha — Sprint 2

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 1.4 | E1 | FR19 | 🟡 Medium | Global Questions Across Organizations — cross-org sharing with permission governance |
| 3.1 | E3 | FR14 | 🔴 Hard | Duplicate Detection Engine (Backend) — embedding generation, similarity comparison, configurable threshold |
| 3.2 | E3 | FR15 | 🟡 Medium | Duplicate Detection Threshold & Blocking — admin config, warning vs blocking modes |
| 3.3 | E3 | FR11 | 🔴 Hard | AI Question Generation Trigger — AI service integration, domain/difficulty/Bloom's parameters |

**Alpha Sprint 2 Output:** Duplicate detection live, AI generation triggering functional, global questions enabled.

#### Team Delta — Sprint 2

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 6.1 | E6 | FR27, FR29, FR31 | 🟡 Medium | Auto-Grading Engine (Backend) — Judge0 multi-file submission, public/hidden test cases, resource constraints |
| 6.2 | E6 | FR28 | 🟢 Easy | Test Case Execution Logs UI — pass/fail display, execution time, memory usage per test case |
| 8.3 | E8 | FR41 | 🟡 Medium | Compatibility Check Backend + Analytics — backend service, pass/fail rate tracking per browser/OS/network |

**Delta Sprint 2 Output:** Auto-grading functional with multi-file support, compat check has backend + analytics.

**Dependency:** Story 6.1 depends on Story 5.1 (Sprint 1) — multi-file IDE must be merged.

#### Dependencies — Sprint 2
```mermaid
flowchart LR
    subgraph "Sprint 1 (Done)"
        A11_done["✅ Alpha: Versioning Schema"]
        D51_done["✅ Delta: Multi-File IDE"]
    end

    subgraph "Sprint 2"
        A14["Alpha: 1.4 Global Questions"]
        A31["Alpha: 3.1 Duplicate Detection"]
        A32["Alpha: 3.2 Threshold Config"]
        A33["Alpha: 3.3 AI Generation"]
        D61["Delta: 6.1 Auto-Grading"]
        D62["Delta: 6.2 Execution Logs UI"]
        D83["Delta: 8.3 Compat Backend"]
    end

    A11_done -->|"Versioning unblocks\nAI generation edit flow"| A33
    D51_done -->|"IDE must be merged\nfor multi-file grading"| D61
    D61 -->|"Grading must work\nfor logs to display"| D62

    style A31 fill:#e74c3c,color:#fff
    style A33 fill:#e74c3c,color:#fff
    style A14 fill:#f39c12,color:#fff
    style A32 fill:#f39c12,color:#fff
    style D61 fill:#f39c12,color:#fff
    style D62 fill:#2ecc71,color:#fff
    style D83 fill:#f39c12,color:#fff
```
**One cross-team dependency:** Delta's auto-grading (6.1) needs Delta's own Sprint 1 IDE (5.1). No Alpha→Delta blockers.

---

### Sprint 3: Governance & A11y

**Sprint Goal:** Complete AI review workflow, bulk upload, and accessibility baseline.

#### Team Alpha — Sprint 3

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 3.4 | E3 | FR12 | 🟡 Medium | AI-Generated Question Review Workflow — pending_review status, review queue |
| 3.5 | E3 | FR13 | 🟡 Medium | AI Question Approve/Edit/Reject Actions — bulk review, version tracking on edits |
| 4.1 | E4 | FR20 | 🟡 Medium | Coding Question Bulk Upload via CSV/JSON — template, validation, ingestion with optional duplicate check |
| 4.2 | E4 | FR21 | 🟢 Easy | Bulk Upload Progress & Error Reporting — progress bar, success/failure counts, error download |

**Alpha Sprint 3 Output:** Full AI generation-to-review pipeline complete, bulk upload operational.

#### Team Delta — Sprint 3

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 6.3 | E6 | FR30 | 🟢 Easy | Public vs Hidden Test Case Configuration — test manager UI for defining visible/hidden test cases |
| 6.4 | E6 | FR32 | 🟡 Medium | AI Code Review Integration — AI reviews candidate code for quality and patterns |
| 8.4 | E8 | FR42 | 🟡 Medium | Assessment Rejection Rate Tracking — track rejections from technical issues, surface trends to admins |
| 8.5 | E8 | FR36-39 | 🟡 Medium | Accessibility Baseline — keyboard nav, contrast audit, ARIA labels, screen-reader support (WCAG 2.1 AA) |

**Delta Sprint 3 Output:** Auto-grading complete with AI review, accessibility baseline achieved, rejection analytics live.

#### Dependencies — Sprint 3
```mermaid
flowchart LR
    subgraph "Sprint 2 (Done)"
        A31_done["✅ Alpha: Duplicate Detection"]
        D61_done["✅ Delta: Auto-Grading"]
    end

    subgraph "Sprint 3"
        A34["Alpha: 3.4 Review Workflow"]
        A35["Alpha: 3.5 Approve/Reject"]
        A41["Alpha: 4.1 Bulk Upload"]
        A42["Alpha: 4.2 Upload Progress"]
        D63["Delta: 6.3 Test Case Config"]
        D64["Delta: 6.4 AI Code Review"]
        D84["Delta: 8.4 Rejection Analytics"]
        D85["Delta: 8.5 Accessibility"]
    end

    A31_done -.->|"Optional: duplicate\ncheck on bulk upload"| A41
    D61_done -->|"Grading engine needed\nfor test case config"| D63

    style A34 fill:#f39c12,color:#fff
    style A35 fill:#f39c12,color:#fff
    style A41 fill:#f39c12,color:#fff
    style A42 fill:#2ecc71,color:#fff
    style D63 fill:#2ecc71,color:#fff
    style D64 fill:#f39c12,color:#fff
    style D84 fill:#f39c12,color:#fff
    style D85 fill:#f39c12,color:#fff
```
**No hard cross-team dependencies.** Alpha's bulk upload optionally uses duplicate detection (Alpha's own). Delta works independently.

---

### Sprint 4: Calibration & Adaptive

**Sprint Goal:** Launch calibration pipeline and begin adaptive testing engine.

#### Team Alpha — Sprint 4

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 2.2 | E2 | FR4 | 🟢 Easy | Bloom's Taxonomy Assignment by Test Managers — dropdown selector, version tracking |
| 2.3 | E2 | FR5 | 🟡 Medium | Manual Difficulty Override with Audit Trail — view system tier, override, sticky overrides |
| 7.1 | E7 | FR2, FR3 | 🔴 Hard | Calibration Pipeline (Backend) — Kafka consumer, BullMQ queue, score aggregation, tier recalculation |
| 7.2 | E7 | FR6 | 🟡 Medium | Under-Calibrated Question Flagging — flag questions with insufficient sample size, admin dashboard |

**Alpha Sprint 4 Output:** Calibration pipeline running, difficulty tiers auto-updating from real data. Bloom's assignment UI live.

#### Team Delta — Sprint 4

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 10.1 | E10 | FR43-45 | 🔴 Hard | Adaptive Difficulty Engine — real-time difficulty adjustment during assessment based on candidate performance |
| 10.3 | E10 | FR47 | 🟢 Easy | Adaptive Mode Toggle — test managers enable/disable adaptive mode per assessment |
| 8.6 | E8 | FR40 | 🟢 Easy | Candidate Results View — candidates view results after completion (when configured) |
| 9.10 | E9 | FR63-66 | 🟡 Medium | Notification Enhancements — enriched notifications for Q2 events (calibration changes, AI generation, compat outcomes) |

**Delta Sprint 4 Output:** Adaptive testing engine functional, candidate results view, enriched notifications.

**Critical Dependency:** Story 10.1 (adaptive engine) requires calibrated difficulty tiers from Alpha's Story 7.1. **Alpha must merge 7.1 by mid-Sprint 4 at latest.**

#### Dependencies — Sprint 4
```mermaid
flowchart LR
    subgraph "Sprint 3 (Done)"
        A_E3_done["✅ Alpha: AI Gen Complete"]
        D_E6_done["✅ Delta: Auto-Grading Complete"]
        D_E8_compat["✅ Delta: Compat + A11y"]
    end

    subgraph "Sprint 4"
        A22["Alpha: 2.2 Bloom's UI"]
        A23["Alpha: 2.3 Difficulty Override"]
        A71["Alpha: 7.1 Calibration Pipeline"]
        A72["Alpha: 7.2 Under-Calibrated Flags"]
        D101["Delta: 10.1 Adaptive Engine"]
        D103["Delta: 10.3 Adaptive Toggle"]
        D86["Delta: 8.6 Results View"]
        D910["Delta: 9.10 Notifications"]
    end

    A71 ==>|"🔴 CRITICAL\nCalibrated tiers\nmust exist"| D101
    A71 -->|"Calibration data"| A72
    D_E6_done -.->|"Auto-grading results\nfeed calibration"| A71
    D_E8_compat -.->|"Compat data\nfor notifications"| D910

    style A71 fill:#e74c3c,color:#fff
    style D101 fill:#e74c3c,color:#fff
    style A22 fill:#2ecc71,color:#fff
    style A23 fill:#f39c12,color:#fff
    style A72 fill:#f39c12,color:#fff
    style D103 fill:#2ecc71,color:#fff
    style D86 fill:#2ecc71,color:#fff
    style D910 fill:#f39c12,color:#fff
```
**CRITICAL cross-team dependency:** Alpha's calibration pipeline (7.1) must be merged before Delta's adaptive engine (10.1) can function. Plan for Alpha to merge 7.1 in week 7 so Delta can integrate in week 8.

---

### Sprint 5: Integration & Polish

**Sprint Goal:** Complete reporting enrichment, skill profiles, assessment lifecycle, and end-to-end integration testing.

#### Team Alpha — Sprint 5

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 2.4 | E2 | FR7 | 🟡 Medium | Difficulty & Bloom's Distribution Specification — configuration UI for test assembly |
| 2.5 | E2 | FR8, FR9 | 🟡 Medium | Intelligent Question Selection from Classified Pools — auto-fill from difficulty/Bloom's pools, unique per candidate |
| 2.6 | E2 | FR10 | 🟢 Easy | Test Distribution Preview Before Dispatch — breakdown chart, cross-tabulation matrix |
| 9.7 | E9 | FR57, FR59, FR62 | 🟡 Medium | Reporting Enrichment — difficulty profiles, calibration data, compat outcomes in reports |
| 9.9 | E9 | FR61, FR70, FR72 | 🟡 Medium | Webhook & API Enrichment — enriched payloads with auto-grading results, AI analysis, skill profiles |

**Alpha Sprint 5 Output:** Intelligent test assembly fully operational, reporting enriched with Q2 data, webhooks deliver enriched payloads.

#### Team Delta — Sprint 5

| Story | Epic | FRs | Complexity | Description |
|-------|------|-----|-----------|-------------|
| 10.2 | E10 | FR46 | 🟡 Medium | Skill-Level Profile Generation — granular profiles from adaptive results (e.g., "Algorithms: Expert") |
| 10.4 | E10 | FR71 | 🟡 Medium | Skill Profile API for External Consumers — API endpoint for CMS integration |
| 9.8 | E9 | FR58, FR60 | 🟡 Medium | AI Analytics Streaming — real-time AI insights delivery |
| 9.3 | E9 | FR48-50 | 🟢 Easy | User/Org Management Enhancements — new `manage_global_questions` permission, multi-org improvements |
| 9.11 | E9 | FR67-69 | 🟢 Easy | Feature Flag Administration — flag management UI, org-by-org targeting |

**Delta Sprint 5 Output:** Adaptive testing complete with skill profiles, AI analytics streaming, feature flag admin.

#### Dependencies — Sprint 5
```mermaid
flowchart LR
    subgraph "Sprint 4 (Done)"
        A71_done["✅ Alpha: Calibration Pipeline"]
        D101_done["✅ Delta: Adaptive Engine"]
    end

    subgraph "Sprint 5"
        A24["Alpha: 2.4 Distribution Config"]
        A25["Alpha: 2.5 Auto-Fill Selection"]
        A26["Alpha: 2.6 Distribution Preview"]
        A97["Alpha: 9.7 Reporting Enrichment"]
        A99["Alpha: 9.9 Webhook Enrichment"]
        D102["Delta: 10.2 Skill Profiles"]
        D104["Delta: 10.4 Skill Profile API"]
        D98["Delta: 9.8 AI Analytics"]
        D93["Delta: 9.3 User/Org Enhancements"]
        D911["Delta: 9.11 Feature Flags"]
    end

    A71_done -->|"Calibrated tiers\nfor auto-fill"| A25
    D101_done -->|"Adaptive results\nfor skill profiles"| D102
    D102 -->|"Profiles must exist\nfor API"| D104
    D102 -.->|"Skill data\nenriches webhooks"| A99
    D_compat -.->|"Compat data\nenriches reports"| A97

    style A24 fill:#f39c12,color:#fff
    style A25 fill:#f39c12,color:#fff
    style A26 fill:#2ecc71,color:#fff
    style A97 fill:#f39c12,color:#fff
    style A99 fill:#f39c12,color:#fff
    style D102 fill:#f39c12,color:#fff
    style D104 fill:#f39c12,color:#fff
    style D98 fill:#f39c12,color:#fff
    style D93 fill:#2ecc71,color:#fff
    style D911 fill:#2ecc71,color:#fff
```
**Dependency:** Delta's skill profiles (10.2) feed into Alpha's webhook enrichment (9.9). Plan for Delta to merge 10.2 in week 9 so Alpha can integrate in week 10.

---

## Complete Story Allocation Summary

### Team Alpha — 21 Stories

| Sprint | Stories | Epics | Complexity |
|--------|---------|-------|-----------|
| Sprint 1 | 1.1, 1.2, 1.3, 2.1 | E1, E2 | 🔴🔴🟡🟡 |
| Sprint 2 | 1.4, 3.1, 3.2, 3.3 | E1, E3 | 🔴🔴🟡🟡 |
| Sprint 3 | 3.4, 3.5, 4.1, 4.2 | E3, E4 | 🟡🟡🟡🟢 |
| Sprint 4 | 2.2, 2.3, 7.1, 7.2 | E2, E7 | 🔴🟡🟢🟡 |
| Sprint 5 | 2.4, 2.5, 2.6, 9.7, 9.9 | E2, E9 | 🟡🟡🟢🟡🟡 |

### Team Delta — 19 Stories

| Sprint | Stories | Epics | Complexity |
|--------|---------|-------|-----------|
| Sprint 1 | 5.1, 8.1, 8.2 | E5, E8 | 🟡🟢🟢 |
| Sprint 2 | 6.1, 6.2, 8.3 | E6, E8 | 🟡🟢🟡 |
| Sprint 3 | 6.3, 6.4, 8.4, 8.5 | E6, E8 | 🟢🟡🟡🟡 |
| Sprint 4 | 10.1, 10.3, 8.6, 9.10 | E10, E8, E9 | 🔴🟢🟢🟡 |
| Sprint 5 | 10.2, 10.4, 9.8, 9.3, 9.11 | E10, E9 | 🟡🟡🟡🟢🟢 |

---

## Delta Ramp-Up Progression

```mermaid
flowchart LR
    S1["Sprint 1\n🟢 Easy-In\nIndependent frontend\nNo backend\nNo cross-team deps"]
    S2["Sprint 2\n🟢→🟡\nBackend integration\nJudge0 + service calls\nOwn Sprint 1 deps only"]
    S3["Sprint 3\n🟡 Medium\nAI integration\nAccessibility (cross-cutting)\nAnalytics backend"]
    S4["Sprint 4\n🟡→🔴\nAdaptive testing engine\n⚠️ First Alpha dependency\nReal-time algorithms"]
    S5["Sprint 5\n🟡 Medium\nSkill profiles\nAPI endpoints\nIntegration polish"]

    S1 --> S2 --> S3 --> S4 --> S5

    style S1 fill:#2ecc71,color:#fff
    style S2 fill:#a8d08d,color:#000
    style S3 fill:#f39c12,color:#fff
    style S4 fill:#e67e22,color:#fff
    style S5 fill:#f39c12,color:#fff
```

---

## All Cross-Team Dependencies (Complete Map)

```mermaid
flowchart TB
    subgraph "Sprint 1"
        A_S1["Alpha: Versioning + Difficulty Schema"]
        D_S1["Delta: Multi-File IDE + Compat FE"]
    end

    subgraph "Sprint 2"
        A_S2["Alpha: Duplicate Detection + AI Gen"]
        D_S2["Delta: Auto-Grading + Compat Backend"]
    end

    subgraph "Sprint 3"
        A_S3["Alpha: Review Workflow + Bulk Upload"]
        D_S3["Delta: AI Code Review + Accessibility"]
    end

    subgraph "Sprint 4"
        A_S4["Alpha: Calibration Pipeline"]
        D_S4["Delta: Adaptive Testing Engine"]
    end

    subgraph "Sprint 5"
        A_S5["Alpha: Intelligent Assembly + Reporting"]
        D_S5["Delta: Skill Profiles + API + Flags"]
    end

    %% Within-team sequential
    A_S1 --> A_S2 --> A_S3 --> A_S4 --> A_S5
    D_S1 --> D_S2 --> D_S3 --> D_S4 --> D_S5

    %% Cross-team dependencies
    A_S4 ==>|"🔴 CRITICAL\nCalibrated tiers → Adaptive engine"| D_S4
    D_S2 -.->|"Auto-grading results → Calibration input"| A_S4
    D_S3 -.->|"Compat data → Reporting enrichment"| A_S5
    D_S5 -.->|"Skill profiles → Webhook enrichment"| A_S5

    style A_S1 fill:#4a90d9,color:#fff
    style A_S2 fill:#4a90d9,color:#fff
    style A_S3 fill:#4a90d9,color:#fff
    style A_S4 fill:#4a90d9,color:#fff
    style A_S5 fill:#4a90d9,color:#fff
    style D_S1 fill:#2ecc71,color:#fff
    style D_S2 fill:#2ecc71,color:#fff
    style D_S3 fill:#2ecc71,color:#fff
    style D_S4 fill:#2ecc71,color:#fff
    style D_S5 fill:#2ecc71,color:#fff
```

### Dependency Legend

| Type | Symbol | Description |
|------|--------|-------------|
| 🔴 CRITICAL | `==>` thick arrow | Blocks work — must be merged before dependent story starts |
| 🟡 SOFT | `-.->` dashed arrow | Data flows between teams — can integrate mid-sprint or at sprint end |
| ✅ WITHIN-TEAM | `-->` solid arrow | Sequential within same team — normal story ordering |

### Critical Path

The only **hard cross-team blocker** is:

> **Alpha Sprint 4 (Story 7.1: Calibration Pipeline) → Delta Sprint 4 (Story 10.1: Adaptive Engine)**

**Mitigation:** Alpha prioritizes Story 7.1 in the first week of Sprint 4. Delta starts Sprint 4 with Story 10.3 (Adaptive Toggle — no calibration dependency) and Story 8.6 (Results View), then picks up 10.1 once Alpha's 7.1 is merged.

---

## Integration Points (Nexus Coordination)

### Joint Planning (Per Sprint)

| Sprint | Key Alignment Topics |
|--------|---------------------|
| Sprint 1 | Confirm no cross-team deps. Agree on Prisma schema migration strategy (Alpha owns migrations). |
| Sprint 2 | Confirm Delta's IDE is merged. Agree on Kafka topic naming for new events. |
| Sprint 3 | No cross-team deps. Review accessibility checklist alignment. |
| Sprint 4 | **CRITICAL:** Agree on calibration pipeline merge timing (Alpha week 7, Delta integrates week 8). |
| Sprint 5 | Agree on skill profile data contract for webhook enrichment. Plan integration testing. |

### Shared Artifacts

| Artifact | Owner | Consumed By |
|----------|-------|-------------|
| Prisma schema (test-creation) | Alpha | Both (Delta reads for test-execution queries) |
| Kafka topic schemas | Alpha (new topics) | Delta (consumers) |
| Frontend shared components (libs/shared) | Both | Both |
| Feature flag definitions | Alpha (defines) | Both (gate features) |
| API contracts (new endpoints) | Both (own service) | Both (consumers) |

### CI Rules

- Both teams merge to `develop` branch continuously
- Prisma migrations: Alpha runs `prisma migrate deploy` — Delta must pull latest schema before backend work
- Feature flags: All Q2 features disabled by default — enable per-org after merge
- Integration test suite: Run jointly at Sprint 4 and Sprint 5 end

---

## Feature Flag Rollout Plan

| Flag | Enabled In | Rollout Order |
|------|-----------|---------------|
| `q2_question_versioning` | Sprint 1 | Training → Recruitment → Service Center |
| `q2_difficulty_calibration` | Sprint 4 | Training → Recruitment → Service Center |
| `q2_blooms_taxonomy` | Sprint 4 | Training → Recruitment → Service Center |
| `q2_duplicate_detection` | Sprint 2 | All orgs simultaneously |
| `q2_ai_question_gen` | Sprint 3 | Training → Recruitment → Service Center |
| `q2_multifile_coding` | Sprint 2 | All orgs simultaneously |
| `q2_bulk_upload_coding` | Sprint 3 | All orgs simultaneously |
| `q2_compatibility_check` | Sprint 2 | All orgs simultaneously |
| `q2_accessibility` | Sprint 3 | All orgs simultaneously |
| `q2_adaptive_testing` | Sprint 5 | Training only (validate before wider rollout) |
