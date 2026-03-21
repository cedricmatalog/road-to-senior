import asyncPromiseChain from '@/data/challenges/async-promise-chain'
import asyncRetry from '@/data/challenges/async-retry'
import closuresCounter from '@/data/challenges/closures-counter'
import errorHandlingFetch from '@/data/challenges/error-handling-fetch'
import performanceDebounce from '@/data/challenges/performance-debounce'
import performanceMemoize from '@/data/challenges/performance-memoize'
import promisesConcurrencyParallel from '@/data/challenges/promises-concurrency-parallel'
import typescriptGenerics from '@/data/challenges/typescript-generics'
import testingPureFunctions from '@/data/challenges/testing-pure-functions'
import securitySanitizeInput from '@/data/challenges/security-sanitize-input'
import domEventDelegation from '@/data/challenges/dom-event-delegation'
import architectureEventEmitter from '@/data/challenges/architecture-event-emitter'
import refactoringExtractFunction from '@/data/challenges/refactoring-extract-function'
import codeReviewPrFeedback from '@/data/challenges/code-review-pr-feedback'
import debuggingSilentBug from '@/data/challenges/debugging-silent-bug'
import systemDesignRateLimit from '@/data/challenges/system-design-rate-limit'
import communicationIncidentUpdate from '@/data/challenges/communication-incident-update'
import estimationFeatureScoping from '@/data/challenges/estimation-feature-scoping'
import mentoringJuniorStuck from '@/data/challenges/mentoring-junior-stuck'
import debuggingProductionMemoryLeak from '@/data/challenges/debugging-production-memory-leak'
import systemDesignCachingStrategy from '@/data/challenges/system-design-caching-strategy'
import codeReviewPerformanceIssue from '@/data/challenges/code-review-performance-issue'
import securityApiKeysLeaked from '@/data/challenges/security-api-keys-leaked'
import architectureBreakingMonolith from '@/data/challenges/architecture-breaking-monolith'
// New code challenges
import closuresOnce from '@/data/challenges/closures-once'
import closuresPartialApplication from '@/data/challenges/closures-partial-application'
import closuresPrivateState from '@/data/challenges/closures-private-state'
import asyncPromiseAllSettled from '@/data/challenges/async-promise-all-settled'
import asyncSerialExecution from '@/data/challenges/async-serial-execution'
import asyncTimeoutRace from '@/data/challenges/async-timeout-race'
import typescriptUtilityTypes from '@/data/challenges/typescript-utility-types'
import typescriptDiscriminatedUnion from '@/data/challenges/typescript-discriminated-union'
import typescriptTypeGuard from '@/data/challenges/typescript-type-guard'
import typescriptOverloads from '@/data/challenges/typescript-overloads'
import testingMockDependency from '@/data/challenges/testing-mock-dependency'
import testingBoundaryCases from '@/data/challenges/testing-boundary-cases'
import testingAsyncFunction from '@/data/challenges/testing-async-function'
import refactoringReplaceConditional from '@/data/challenges/refactoring-replace-conditional'
import refactoringDeepNesting from '@/data/challenges/refactoring-deep-nesting'
import refactoringPureReducer from '@/data/challenges/refactoring-pure-reducer'
import errorHandlingAsyncPipeline from '@/data/challenges/error-handling-async-pipeline'
import errorHandlingCustomError from '@/data/challenges/error-handling-custom-error'
import domVirtualList from '@/data/challenges/dom-virtual-list'
import domIntersectionObserver from '@/data/challenges/dom-intersection-observer'
import domCustomElement from '@/data/challenges/dom-custom-element'
import performanceThrottle from '@/data/challenges/performance-throttle'
import performanceLruCache from '@/data/challenges/performance-lru-cache'
import securityCsrfToken from '@/data/challenges/security-csrf-token'
import securityRateLimitImpl from '@/data/challenges/security-rate-limit-impl'
import architectureObservable from '@/data/challenges/architecture-observable'
import architectureMiddleware from '@/data/challenges/architecture-middleware'
import architecturePubSub from '@/data/challenges/architecture-pub-sub'
// New scenario challenges
import communicationTechnicalToNontechnical from '@/data/challenges/communication-technical-to-nontechnical'
import communicationDisagreeingWithLead from '@/data/challenges/communication-disagreeing-with-lead'
import communicationScopeCreep from '@/data/challenges/communication-scope-creep'
import communicationPostmortem from '@/data/challenges/communication-postmortem'
import mentoringCodeStandards from '@/data/challenges/mentoring-code-standards'
import mentoringOnboarding from '@/data/challenges/mentoring-onboarding'
import mentoringPerformanceReview from '@/data/challenges/mentoring-performance-review'
import estimationReestimate from '@/data/challenges/estimation-reestimate'
import estimationStoryPoints from '@/data/challenges/estimation-story-points'
import estimationUnknownUnknowns from '@/data/challenges/estimation-unknown-unknowns'
import systemDesignDatabaseSchema from '@/data/challenges/system-design-database-schema'
import systemDesignApiVersioning from '@/data/challenges/system-design-api-versioning'
import systemDesignBackgroundJobs from '@/data/challenges/system-design-background-jobs'
import systemDesignSearch from '@/data/challenges/system-design-search'
import codeReviewSecurityIssue from '@/data/challenges/code-review-security-issue'
import codeReviewApiDesign from '@/data/challenges/code-review-api-design'
import codeReviewTestQuality from '@/data/challenges/code-review-test-quality'
import debuggingFlakyyTests from '@/data/challenges/debugging-flaky-tests'
import debuggingWrongData from '@/data/challenges/debugging-wrong-data'
import debuggingNPlusOne from '@/data/challenges/debugging-n-plus-one'
import debuggingRaceCondition from '@/data/challenges/debugging-race-condition'
import architectureFeatureFlags from '@/data/challenges/architecture-feature-flags'
import architectureDependencyInjection from '@/data/challenges/architecture-dependency-injection'
import architectureErrorBoundaries from '@/data/challenges/architecture-error-boundaries'
import securityAuthJwt from '@/data/challenges/security-auth-jwt'
import securityDependencyAudit from '@/data/challenges/security-dependency-audit'
import securitySensitiveData from '@/data/challenges/security-sensitive-data'
import testingStrategy from '@/data/challenges/testing-strategy'
import testingTddApproach from '@/data/challenges/testing-tdd-approach'
import refactoringWhenToRefactor from '@/data/challenges/refactoring-when-to-refactor'
import refactoringStranglerFig from '@/data/challenges/refactoring-strangler-fig'
import asyncErrorBoundary from '@/data/challenges/async-error-boundary'
// Junior challenges
import jsArrayMethods from '@/data/challenges/js-array-methods'
import jsObjectDestructuring from '@/data/challenges/js-object-destructuring'
import jsPromisesBasics from '@/data/challenges/js-promises-basics'
import jsClosuresBasics from '@/data/challenges/js-closures-basics'
import jsErrorHandlingBasics from '@/data/challenges/js-error-handling-basics'
import jsThisBinding from '@/data/challenges/js-this-binding'
import jsPrototypeBasics from '@/data/challenges/js-prototype-basics'
import jsEventLoopBasics from '@/data/challenges/js-event-loop-basics'
import jsScopeHoisting from '@/data/challenges/js-scope-hoisting'
import jsImmutabilityBasics from '@/data/challenges/js-immutability-basics'
import communicationAskingForHelp from '@/data/challenges/communication-asking-for-help'
import codeReviewReceivingFeedback from '@/data/challenges/code-review-receiving-feedback'
import debuggingReadingErrors from '@/data/challenges/debugging-reading-errors'
import estimationFirstTask from '@/data/challenges/estimation-first-task'
// New skill challenges
import apiDesignRestConventions from '@/data/challenges/api-design-rest-conventions'
import apiDesignErrorContracts from '@/data/challenges/api-design-error-contracts'
import apiDesignPagination from '@/data/challenges/api-design-pagination'
import observabilityStructuredLogging from '@/data/challenges/observability-structured-logging'
import observabilityAlerting from '@/data/challenges/observability-alerting'
import observabilityMetrics from '@/data/challenges/observability-metrics'
import ciCdPipelineFailure from '@/data/challenges/ci-cd-pipeline-failure'
import ciCdDeployStrategy from '@/data/challenges/ci-cd-deploy-strategy'
import ciCdEnvConfig from '@/data/challenges/ci-cd-env-config'
import tradeoffsBuildVsBuy from '@/data/challenges/tradeoffs-build-vs-buy'
import tradeoffsTechDebt from '@/data/challenges/tradeoffs-tech-debt'
import tradeoffsConsistencyAvailability from '@/data/challenges/tradeoffs-consistency-availability'
import incidentResponseTriage from '@/data/challenges/incident-response-triage'
import incidentResponsePostmortem from '@/data/challenges/incident-response-postmortem'
import incidentResponseRunbook from '@/data/challenges/incident-response-runbook'
import webPerformanceCoreVitals from '@/data/challenges/web-performance-core-vitals'
import webPerformanceBundle from '@/data/challenges/web-performance-bundle'
import webPerformanceRendering from '@/data/challenges/web-performance-rendering'
import accessibilityAria from '@/data/challenges/accessibility-aria'
import accessibilitySemanticHtml from '@/data/challenges/accessibility-semantic-html'
import accessibilityFocusManagement from '@/data/challenges/accessibility-focus-management'
import documentationAdr from '@/data/challenges/documentation-adr'
import documentationRfc from '@/data/challenges/documentation-rfc'
import documentationOnboarding from '@/data/challenges/documentation-onboarding'
import type { Challenge } from '@/lib/types'

export const ALL_CHALLENGES: Challenge[] = [
  // Code challenges
  asyncPromiseChain,
  asyncRetry,
  asyncPromiseAllSettled,
  asyncSerialExecution,
  asyncTimeoutRace,
  closuresCounter,
  closuresOnce,
  closuresPartialApplication,
  closuresPrivateState,
  errorHandlingFetch,
  errorHandlingAsyncPipeline,
  errorHandlingCustomError,
  performanceDebounce,
  performanceMemoize,
  performanceThrottle,
  performanceLruCache,
  promisesConcurrencyParallel,
  typescriptGenerics,
  typescriptUtilityTypes,
  typescriptDiscriminatedUnion,
  typescriptTypeGuard,
  typescriptOverloads,
  testingPureFunctions,
  testingMockDependency,
  testingBoundaryCases,
  testingAsyncFunction,
  securitySanitizeInput,
  securityCsrfToken,
  securityRateLimitImpl,
  domEventDelegation,
  domVirtualList,
  domIntersectionObserver,
  domCustomElement,
  architectureEventEmitter,
  architectureObservable,
  architectureMiddleware,
  architecturePubSub,
  refactoringExtractFunction,
  refactoringReplaceConditional,
  refactoringDeepNesting,
  refactoringPureReducer,
  // Junior code challenges
  jsArrayMethods,
  jsObjectDestructuring,
  jsPromisesBasics,
  jsClosuresBasics,
  jsErrorHandlingBasics,
  jsThisBinding,
  jsPrototypeBasics,
  jsEventLoopBasics,
  jsScopeHoisting,
  jsImmutabilityBasics,
  // Scenario challenges
  codeReviewPrFeedback,
  codeReviewPerformanceIssue,
  codeReviewSecurityIssue,
  codeReviewApiDesign,
  codeReviewTestQuality,
  debuggingSilentBug,
  debuggingProductionMemoryLeak,
  debuggingFlakyyTests,
  debuggingWrongData,
  debuggingNPlusOne,
  debuggingRaceCondition,
  systemDesignRateLimit,
  systemDesignCachingStrategy,
  systemDesignDatabaseSchema,
  systemDesignApiVersioning,
  systemDesignBackgroundJobs,
  systemDesignSearch,
  communicationIncidentUpdate,
  communicationTechnicalToNontechnical,
  communicationDisagreeingWithLead,
  communicationScopeCreep,
  communicationPostmortem,
  estimationFeatureScoping,
  estimationReestimate,
  estimationStoryPoints,
  estimationUnknownUnknowns,
  mentoringJuniorStuck,
  mentoringCodeStandards,
  mentoringOnboarding,
  mentoringPerformanceReview,
  securityApiKeysLeaked,
  securityAuthJwt,
  securityDependencyAudit,
  securitySensitiveData,
  architectureBreakingMonolith,
  architectureFeatureFlags,
  architectureDependencyInjection,
  architectureErrorBoundaries,
  testingStrategy,
  testingTddApproach,
  refactoringWhenToRefactor,
  refactoringStranglerFig,
  asyncErrorBoundary,
  // Junior scenario challenges
  communicationAskingForHelp,
  codeReviewReceivingFeedback,
  debuggingReadingErrors,
  estimationFirstTask,
  // New skill challenges
  apiDesignRestConventions,
  apiDesignErrorContracts,
  apiDesignPagination,
  observabilityStructuredLogging,
  observabilityAlerting,
  observabilityMetrics,
  ciCdPipelineFailure,
  ciCdDeployStrategy,
  ciCdEnvConfig,
  tradeoffsBuildVsBuy,
  tradeoffsTechDebt,
  tradeoffsConsistencyAvailability,
  incidentResponseTriage,
  incidentResponsePostmortem,
  incidentResponseRunbook,
  webPerformanceCoreVitals,
  webPerformanceBundle,
  webPerformanceRendering,
  accessibilityAria,
  accessibilitySemanticHtml,
  accessibilityFocusManagement,
  documentationAdr,
  documentationRfc,
  documentationOnboarding,
]

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return ALL_CHALLENGES.find(c => c.slug === slug)
}
