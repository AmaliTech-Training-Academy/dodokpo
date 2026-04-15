# Dodokpo Frontend Component Inventory

Complete inventory of all UI components in the Dodokpo Angular frontend application, organized by feature area.


## Question Options Components

| Component Name | Purpose |
|---|---|
| MultiChoiceOptionsComponent | Renders multiple-choice answer options |
| MultiSelectOptionsComponent | Renders multi-select answer options |
| TrueOrFalseOptionsComponent | Renders true/false answer options |
| FillInOptionsComponent | Renders fill-in-the-blank answer options |
| MatrixOptionsComponent | Renders matrix-style answer options |
| AnswerOptionsComponent | Generic answer option display wrapper |


## Authentication

### Pages

| Component Name | Purpose |
|---|---|
| LoginPageComponent | User login page |
| ChangePasswordComponent | Change current password page |
| CreatePasswordComponent | Create new password page (first-time setup) |
| ForgotPasswordComponent | Forgot password request page |
| ResetLinkSentComponent | Confirmation page after reset link is sent |
| InvalidLinkPageComponent | Error page for invalid authentication links |
| LinkExpiredPageComponent | Error page for expired authentication links |
| LinkUsedPageComponent | Error page for already-used authentication links |
| UnauthorizedComponent | Unauthorized access page |

### Organization Selection

| Component Name | Purpose |
|---|---|
| UserOrganizationListComponent | List of organizations available to the user |
| OrganizationTileComponent | Individual organization selection tile |

### Layout & Shared

| Component Name | Purpose |
|---|---|
| AuthGlassWrapperComponent | Glassmorphism wrapper for auth UI |
| AuthLayoutComponent | Overall layout shell for authentication pages |
| AuthenticationCustomInputComponent | Styled input specific to authentication forms |
| FormTitleComponent | Title/heading for authentication forms |
| PasswordFormLayoutComponent | Layout wrapper for password-related forms |
| PasswordStrengthMeterComponent | Visual indicator of password strength |


## Report Management

### Top-Level Pages

| Component Name | Purpose |
|---|---|
| ReportManagementComponent | Report management root/container page |
| ReportDispatchedAssessmentsComponent | List of dispatched assessments for reporting |
| ReportAssessmentCandidatesComponent | Candidates list for a specific assessment report |
| ReportAssessmentMetricsComponent | Assessment-level metrics overview |
| ReportMetricsStatisticsComponent | Detailed statistical metrics view |
| ReportMetricsProctoringComponent | Proctoring metrics and violation summaries |
| ReportMetricsAnalysisReportComponent | Full analysis report for assessment metrics |
| AnalysisReportPdfComponent | PDF-exportable version of the analysis report |
| ReportProctoringImagesPageComponent | Gallery of proctoring images for review |
| QuestionLevelAnalyticsComponent | Per-question analytics breakdown |
| CandidatesReportComponent | Aggregated candidates report view |
| CandidateReportDetailsComponent | Detailed report for an individual candidate |
| FeedbackComponent | Feedback display and submission |
| ReportDownloadComponent | Report export and download functionality |

### Sub-Components

| Component Name | Purpose |
|---|---|
| AnalyticsReportEmptyStateComponent | Empty state for analytics when no data is available |
| AssessmentViolationsAlertComponent | Alert banner for assessment proctoring violations |
| BreadcrumbComponent | Breadcrumb navigation for report hierarchy |
| CategoryPerformanceBarComponent | Horizontal bar showing category-level performance |
| CircularProgressIndicatorComponent | Circular progress ring for score visualization |
| CustomFilterButtonComponent | Filter toggle button for report views |
| CustomSortTableComponent | Sortable table for report data |
| ImageCarouselComponent | Image carousel for proctoring screenshots |
| InfoBoxComponent | Informational callout box |
| InformationMetricDetailComponent | Detailed metric information panel |
| LearningPathTimelineComponent | Timeline visualization of learning path progress |
| MetricCardComponent | Individual metric display card |
| ReportCustomTableComponent | Custom table tailored for report data |
| ReportSkeletonComponent | Skeleton loading placeholder for reports |
| StatsMetricDetailComponent | Statistical metric detail panel |
| StrengthsAreasCardComponent | Card showing strengths and areas for improvement |
| QuestionAnalyticsSkeletonComponent | Skeleton loading placeholder for question analytics |

### Answer View Components

| Component Name | Purpose |
|---|---|
| BasicTypeAnswerViewComponent | Displays basic question type answers |
| CodingTypeAnswerViewComponent | Displays coding question answers with code formatting |
| ComprehensionPassageComponent | Renders comprehension passage text |
| EssayTypeAnswerViewComponent | Displays essay-type answers |
| FillInTypeViewComponent | Displays fill-in-the-blank answers |
| MatrixTypeAnswerViewComponent | Displays matrix-type answers |
| QuestionViewComponent | Generic question display wrapper |
| StatsCardComponent | Compact statistics card |
| StatusBadgeComponent | Status indicator badge (pass/fail/pending) |


## Test Management -- Tests

| Component Name | Purpose |
|---|---|
| AllTestsComponent | Test bank listing page |
| TestsComponent | Tests module root/container |
| RegularTestComponent | Create/manage a standard test |
| TestBasicInformationComponent | Test metadata and basic information form |
| TestQuestionAssignmentComponent | Assign questions to a test |
| TestDistributionComponent | Configure question distribution within a test |
| RegularTestPreviewComponent | Preview a regular test before finalizing |
| PreviewTestPageComponent | Full-page test preview |
| ComprehensionTestComponent | Create/manage a comprehension-based test |
| ComprehensionInputComponent | Input fields for comprehension test passages |
| ComprehensionQuestionPreviewComponent | Preview comprehension questions |
| ComprehensionQuestionTileComponent | Tile display for comprehension questions |
| AddToTestComponent | Add questions to an existing test |


## Test Management -- Domains

| Component Name | Purpose |
|---|---|
| DomainComponent | Domains module root/container |
| AllDomainsComponent | Domain listing page |
| CreateDomainComponent | Create a new domain |


## Test-Taker Flow

| Component Name | Purpose |
|---|---|
| TestTakerComponent | Test-taker module root/container |
| EnterEmailComponent | Candidate email entry page |
| SystemInstructionsComponent | System requirements and instructions page |
| HonorCodePageComponent | Honor code agreement page |
| MediaConsentComponent | Camera/microphone consent page |
| InterceptionWithIdComponent | ID verification interception step |
| FaceCaptureComponent | Facial image capture for proctoring |
| AssessmentInstructionsComponent | Assessment-specific instructions page |
| FirstWarmUpPageComponent | Initial warm-up/practice page |
| StepPageComponent | Step-by-step progress page in the flow |
| CompletePageComponent | Assessment completion confirmation page |
| AssessmentResultsComponent | Results display after assessment completion |
| FeedbackPageComponent | Post-assessment feedback collection page |
| AssessmentNotDueComponent | Page shown when assessment is not yet available |
| RetakeDelayNotDueComponent | Page shown when retake delay period has not elapsed |
| RetakeMaximumAttemptComponent | Page shown when maximum retake attempts are reached |


## User Management

| Component Name | Purpose |
|---|---|
| UserManagementComponent | User management module root/container |
| UsersComponent | User listing and management page |
| OrganisationsComponent | Organization listing and management page |
| RoleComponent | Individual role detail view |
| RolesComponent | Role listing page |
| CreateNewRoleComponent | Create a new role with permissions |
| RoleDetailsComponent | Detailed role configuration and permissions |
| ApplicationsComponent | Application management page |


## Other

| Component Name | Purpose |
|---|---|
| ArchivesComponent | Archived items listing and management |
| FeatureFlagsComponent | Feature flag management interface |
| ComingSoonPageComponent | Placeholder page for upcoming features |
| NotificationsComponent | Notifications management page |
| NotificationsDropDownComponent | Notification dropdown in the navbar |


## Web Workers

| Worker File | Purpose |
|---|---|
| csv.worker.ts | Offloads CSV file parsing to a background thread |
| file-parse.worker.ts | Offloads general file parsing to a background thread |
