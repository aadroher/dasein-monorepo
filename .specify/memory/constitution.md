# Dasein Constitution

## Core Principles

Dasein is a web application which manages the schedule, timetables and attendance of educational institutions. The following core principles guide its development:

### I. Web app (NON-NEGOTIABLE)
Dasein is primarily a web application designed to run in modern browsers both in desktop and mobile environments.

### II. Local-first (NON-NEGOTIABLE)
Dasein prioritizes local data storage and processing on the user's device, minimizing reliance on external servers to enhance privacy, performance, and offline capabilities.
Existing frameworks can be used to facilitate local-first development (e.g. Replicache, Automerge, etc.), but their use must be carefully evaluated to ensure they align with Dasein's core principles, particularly regarding privacy and performance.

### III. Centralised authentication
Dasein uses a centralised authentication system to manage user identities and access control. This system must be secure, scalable, and support common authentication protocols (e.g. OAuth2, OpenID Connect, etc.). The authentication system should also support single sign-on (SSO) capabilities to enhance user experience across multiple services.

### IV. Privacy by design (NON-NEGOTIABLE)
Some of the users of Dasein are minors, therefore privacy is a paramount concern. Dasein adheres to the principle of privacy by design, ensuring that all features and functionalities are developed with user privacy as a core consideration. This includes:
- Minimizing data collection to only what is necessary for the functionality of the application.
- Implementing strong data encryption both in transit and at rest.
- Providing users with clear and transparent privacy policies.
- Allowing users to control their data, including options for data export and deletion.

### V. Test-first (NON-NEGOTIABLE)
Dasein adopts a Test-First approach, ensuring that tests are written before the implementation of features. This process includes user approval of tests, followed by the implementation of features only after tests fail. The Red-Green-Refactor cycle is strictly enforced.
Only public interfaces require tests as opposed to implementation details. A public interface is defined as what is exposed by a piece of software to some external agent which will consume it regardless of the underlying implementation. For example:
- The browser UI of a web app is a public interface, as it is consumed by the user.
- The backend HTTP API of a web app is a public interface, as it is consumed by the frontend.
- A reusable library is a public interface, as it is consumed by other code.
We will chose the most appropriate testing framework for the public interface in question. For example, unit tests for libraries, integration tests for backend APIs, and end-to-end tests for browser UIs.

### VI. Accessibility (NON-NEGOTIABLE)

### VII. Observability

### VIII. Vendor neutrality

### IX. Technology agnostic

### X. Separation of concerns

### XI. Functional programming style

### XII. Monorepo

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Integration Testing -->
[PRINCIPLE_4_DESCRIPTION]
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## [SECTION_2_NAME]
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

<!-- ## Governance -->
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

<!-- [GOVERNANCE_RULES] -->
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: 0.1.0 | **Ratified**: 2025-10-20 | **Last Amended**: 2025-10-20
