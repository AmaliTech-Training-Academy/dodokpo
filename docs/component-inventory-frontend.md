# Dodokpo Frontend Component Inventory

Complete inventory of all UI components in the Dodokpo Angular frontend application, organized by feature area.

---

## Shared / Reusable Components (`components/`)

### Layout & Navigation

| Component Name | Purpose |
|---|---|
| NavbarComponent | Top-level application navigation bar |
| SideBarComponent | Main sidebar navigation panel |
| SidebarCollapseComponent | Collapsible sidebar toggle control |

### Feedback & Overlays

| Component Name | Purpose |
|---|---|
| CustomToastComponent | Toast notification messages |
| CustomModalComponent | Standard modal dialog |
| CustomMiniModalComponent | Compact modal dialog for lightweight prompts |

### Form Controls

| Component Name | Purpose |
|---|---|
| CustomInputComponent | Reusable text input field |
| CustomTextareaComponent | Multi-line text area input |
| CustomTextEditorComponent | Rich text editor powered by Quill |
| CustomDropdownComponent | Dropdown select control |
| CustomButtonComponent | Styled button component |
| CustomCheckBoxComponent | Checkbox input control |
| CustomSearchInputComponent | Search input with built-in filtering behavior |
| EmailChipInputComponent | Email entry field with chip/tag display |
| ToggleSwitchComponent | Boolean toggle switch control |

### Data Display

| Component Name | Purpose |
|---|---|
| CustomTableComponent | Standard data table |
| EditableTableComponent | Table with inline editing capabilities |
| CustomPaginationComponent | Pagination control for data lists |
| CustomGraphComponent | Line/bar graph visualization using Chart.js |
| CustomDoughnutChartComponent | Doughnut chart visualization |
| CustomStackedBarGraphComponent | Stacked bar graph visualization |
| CircleProgressComponent | Circular progress indicator |
| BadgeComponent | Status or count badge label |
| CardWrapperComponent | Generic card container |
| GridViewComponent | Grid layout display for items |
| ListViewComponent | List layout display for items |

### Utilities & Interactions

| Component Name | Purpose |
|---|---|
| StepperComponent | Multi-step workflow progress indicator |
| TooltipComponent | Contextual tooltip popover |
| ThemeToggleComponent | Light/dark theme switcher |
| LoadingProgressComponent | Determinate loading progress bar |
| RefreshLoaderComponent | Refresh/reload spinner indicator |
| DodokpoLoaderComponent | Branded full-page loading animation |
| LottieAnimationComponent | Lottie JSON animation renderer |

### Bulk Operations & Data Upload

| Component Name | Purpose |
|---|---|
| BulkCsvUploadComponent | CSV file upload with parsing support |
| PreviewDataComponent | Preview uploaded/imported data before confirmation |
| CodeEditorComponent | Code editor powered by Monaco Editor |

### Action & Context Controls

| Component Name | Purpose |
|---|---|
| ActionButtonComponent | Contextual action trigger button |
| ActionItemsPopUpComponent | Pop-up list of available actions for an item |
| AddTagModalComponent | Modal for adding tags to entities |
| BasicButtonDropdownComponent | Button with dropdown menu |
| ExpandableInstructionCardComponent | Collapsible card with instructional content |

### Placeholder & Error Pages

| Component Name | Purpose |
|---|---|
| ReroutePageComponent | Redirect/reroute intermediate page |
| NoResultFoundComponent | Empty state when no results match a query |
| NotFoundPageComponent | 404 not-found page |

---

## Question Options Components

| Component Name | Purpose |
|---|---|
| MultiChoiceOptionsComponent | Renders multiple-choice answer options |
| MultiSelectOptionsComponent | Renders multi-select answer options |
| TrueOrFalseOptionsComponent | Renders true/false answer options |
| FillInOptionsComponent | Renders fill-in-the-blank answer options |
| MatrixOptionsComponent | Renders matrix-style answer options |
| AnswerOptionsComponent | Generic answer option display wrapper |

---

## SVG Icon Components

| Component Name | Purpose |
|---|---|
| AiSparkleSvgComponent | AI sparkle icon |
| AlarmSvgComponent | Alarm/timer icon |
| DispatchSvgComponent | Dispatch/send icon |
| FileSvgComponent | File document icon |
| FolderIconSvgComponent | Folder icon |
| InsightSvgComponent | Insight/analytics icon |
| RequiredSvgComponent | Required field indicator icon |
| UserWithPadlockComponent | User with security padlock icon |

---

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

---

## Dashboard

| Component Name | Purpose |
|---|---|
| DashboardHomePageComponent | Main dashboard landing page |
| DashboardCardComponent | Summary metric card on the dashboard |
| DashboardNavbarComponent | Dashboard-specific navigation bar |
| DashboardSmallCardComponent | Compact metric card variant |
| MainAppComponent | Root application shell with sidebar and content area |
| DomainAdminDashboardComponent | Dashboard view for domain administrators |
| RecruitersDashboardComponent | Dashboard view for recruiters |
| ReportsManagerDashboardComponent | Dashboard view for report managers |
| ReportDashboardCardComponent | Report-specific summary card |

---

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

---

## Test Management -- Questions

### Top-Level Pages

| Component Name | Purpose |
|---|---|
| AllQuestionsComponent | Question bank listing page |
| MainQuestionsPageComponent | Main container for question management |
| EditQuestionsComponent | Question editing page |
| BulkQuestionUploadComponent | Bulk upload of questions via CSV/file |
| BasicQuestionContainerComponent | Shared container for question creation forms |
| QuestionTitleComponent | Question title input and display |
| LayoutWrapperComponent | Layout wrapper for question pages |

### Question Type Creation

| Component Name | Purpose |
|---|---|
| MultiChoiceQuestionsComponent | Create multiple-choice questions |
| MultiSelectQuestionsComponent | Create multi-select questions |
| TrueOrFalseQuestionsComponent | Create true/false questions |
| EssayQuestionsComponent | Create essay questions |
| AddRubricEssayQuestionComponent | Add grading rubric to essay questions |
| MatrixQuestionsComponent | Create matrix-type questions |
| AddColumnAndRowInformationComponent | Define columns and rows for matrix questions |
| MatrixTableComponent | Matrix question table layout |
| FillInTheBlanksQuestionsComponent | Create fill-in-the-blank questions |
| CodingQuestionsComponent | Create coding questions |
| CodingParentComponent | Parent container for coding question setup |
| PreviewCodingQuestionsComponent | Preview coding questions with test cases |
| TestCaseRowComponent | Individual test case row for coding questions |

### Question Type Editing

| Component Name | Purpose |
|---|---|
| EditMultiChoiceQuestionComponent | Edit existing multiple-choice questions |
| EditMultiSelectQuestionComponent | Edit existing multi-select questions |
| EditTrueOrFalseComponent | Edit existing true/false questions |
| EditEssayQuestionComponent | Edit existing essay questions |
| EditMatrixQuestionComponent | Edit existing matrix questions |
| EditFillInTheBlanksComponent | Edit existing fill-in-the-blank questions |

---

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

---

## Test Management -- Assessments

| Component Name | Purpose |
|---|---|
| AssessmentsComponent | Assessments module root/container |
| MainAssessmentComponent | Main assessment management page |
| CreateAssessmentComponent | Assessment creation wizard |
| BasicAndConfigComponent | Assessment basic information and configuration |
| SelectTestPageComponent | Select tests to include in an assessment |
| AssessmemtPreviewCreationComponent | Preview assessment before creation |
| DispatchAssessmentComponent | Dispatch/send assessment to candidates |
| AssessmentPreviewComponent | Read-only assessment preview |
| AssessmentHistoryComponent | Assessment dispatch and status history |
| AssessmentHistoryCardComponent | Individual history entry card |

---

## Test Management -- Domains

| Component Name | Purpose |
|---|---|
| DomainComponent | Domains module root/container |
| AllDomainsComponent | Domain listing page |
| CreateDomainComponent | Create a new domain |

---

## Test Management -- Skills

| Component Name | Purpose |
|---|---|
| SkillsComponent | Skills module root/container |
| AllSkillsComponent | Skills listing page |
| CreateSkillComponent | Create a new skill |
| BasicInformationComponent | Skill basic information form |
| AssessmentAssignmentPageComponent | Assign assessments to a skill |
| AssessmentPageWithLevelsComponent | Assessment assignment with proficiency levels |
| AssessmentPageWithNoLevelComponent | Assessment assignment without proficiency levels |
| PreviewSkillsWithAssessmentComponent | Preview skill with assigned assessments |
| CreateLevelComponent | Create proficiency level for a skill |
| BulkSkillsUploadComponent | Bulk upload skills via CSV/file |

---

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

---

## Test-Taking

| Component Name | Purpose |
|---|---|
| TestTakingComponent | Test-taking module root/container |
| TestTakingMainPageComponent | Main test-taking interface with questions and timer |
| WaitingPageComponent | Waiting/loading page during test transitions |

---

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

---

## Workspace / Settings

| Component Name | Purpose |
|---|---|
| UpdateUserProfileComponent | User profile update form |
| WorkspaceConfigurationComponent | Workspace-level configuration settings |
| OrganizationSettingsComponent | Organization settings management |
| ApiSettingsComponent | API key and integration settings |
| TestSourceCheckboxComponent | Checkbox control for toggling test sources |
| UserInputComponent | User input field for settings forms |

---

## Other

| Component Name | Purpose |
|---|---|
| ArchivesComponent | Archived items listing and management |
| FeatureFlagsComponent | Feature flag management interface |
| ComingSoonPageComponent | Placeholder page for upcoming features |
| NotificationsComponent | Notifications management page |
| NotificationsDropDownComponent | Notification dropdown in the navbar |

---

## Pipes

| Pipe Name | Purpose |
|---|---|
| DisplayValuePipe | Formats raw values for display |
| FilterNullPipe | Filters out null/undefined values from collections |
| SearchPipe | Filters collections based on a search term |
| TimeAgoPipe | Converts timestamps to relative time strings (e.g., "5 minutes ago") |
| TruncateLongTextPipe | Truncates long text with ellipsis |

---

## Web Workers

| Worker File | Purpose |
|---|---|
| csv.worker.ts | Offloads CSV file parsing to a background thread |
| file-parse.worker.ts | Offloads general file parsing to a background thread |
