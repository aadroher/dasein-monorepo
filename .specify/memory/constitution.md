# Dasein Constitution

## Core Principles

Dasein is a web application which manages the schedule, timetables and attendance of educational institutions. The following core principles guide its development:

### I. Web app (NON-NEGOTIABLE)
Dasein is primarily a web application designed to run in modern browsers both in desktop and mobile environments.

### II. Local-first (NON-NEGOTIABLE)
Dasein prioritizes local data storage and processing on the user's device, minimizing reliance on external servers to enhance privacy, performance, and offline capabilities.
Existing frameworks can be used to facilitate local-first development (e.g. Replicache, Automerge, etc.), but their use must be carefully evaluated to ensure they align with Dasein's core principles, particularly regarding privacy and performance.

### III. Centralized authentication
Dasein uses a centralized authentication system to manage user identities and access control. This system must be secure, scalable, and support common authentication protocols (e.g. OAuth2, OpenID Connect, etc.). The authentication system should also support single sign-on (SSO) capabilities to enhance user experience across multiple services.

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
We will choose the most appropriate testing framework for the public interface in question. For example, unit tests for libraries, integration tests for backend APIs, and end-to-end tests for browser UIs.

### VI. Accessibility (NON-NEGOTIABLE)
All user interfaces in Dasein must comply with WCAG 2.1 AA standards to ensure accessibility for users with disabilities. This includes considerations for color contrast, keyboard navigation, screen reader compatibility, and other accessibility best practices.
In addition to that, the accessibility features of the user interface will be such that they can be easily used by test frameworks to search for elements, interact with them, and verify their state.

### VII. Observability
The design of the system needs to be ready by default to support observability practices such as logging, monitoring, and tracing. It will implement the client side of the OpenTelemetry standard to facilitate this.

### VIII. Vendor neutrality
The codebase of Dasein must avoid lock-in to specific cloud providers, third-party services, or proprietary technologies. Every time a third-party service or technology is considered for use it will need to be wrapped by an adapter which will always present the same local interface, so that the rest of the code can remain agnostic to its implementation. This will allow for easier replacement of said services or technologies in the future if needed.

### IX. Technology agnostic
Even though in some other places this constitution may give examples of specific technologies to be used, these are not mandatory. The only mandatory aspects are the principles themselves. The specific technologies used to implement them can be changed as long as they are the best fit for the purpose at the time of implementation.

### X. Separation of concerns
Dasein's architecture must follow the principle of separation of concerns, ensuring that different functionalities and components are modular and independent. This facilitates easier maintenance, testing, and scalability of the application.

### XI. Functional programming style
Dasein's codebase should adhere to functional programming principles where feasible. This includes:
- Immutability: Data structures should be immutable wherever possible to prevent unintended side effects.
- Pure functions: Functions should avoid side effects and return consistent outputs for the same inputs.
- First-class functions: Functions should be treated as first-class citizens, allowing them to be passed as arguments, returned from other functions, and assigned to variables.
- Referential transparency: Expressions should be replaceable with their corresponding values without changing the program's behavior.
Using a functional programming style can enhance code readability, maintainability, and testability, aligning with Dasein's overall architectural principles.
However, this does not mean that we can shoehorn the functional style into every part of the codebase regardless of the technology used.
For example, while in Rust it is possible to keep cloning values around to maintain immutability, this would be too big of a performance penalty to indiscriminately apply this principle everywhere. In such cases, we will use functional programming principles where they make sense, while balancing performance and practicality.
#### Javascript specific style
- Prefer arrow functions as they better represent the fact that functions are a value just as any other (they are first class citizens). If possible, use expression body functions instead of using curly braces and the `return` keyboard.

### XII. Monorepo
Dasein's codebase will be organized as a monorepo, consolidating all related projects, services, and libraries into a single repository. This approach facilitates easier code sharing, dependency management, and coordinated releases across the entire codebase.

**Version**: 0.2.0 | **Ratified**: 2025-10-30 | **Last Amended**: 2026-01-09
