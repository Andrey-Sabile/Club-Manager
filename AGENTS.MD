# AGENTS.MD

## Project Overview
Club-Manager is a modular, multi-layered application designed to manage clubs, members, events, tickets, and related entities. It follows best practices for maintainability, scalability, and testability, using modern .NET technologies.

## Technologies Used
- .NET (C#)
- Entity Framework Core
- ASP.NET Core Web API
- Docker (for containerization)
- Terraform (for infrastructure as code)
- xUnit, SpecFlow (for testing)

## Solution Structure
- `src/` — Main source code
  - `Application/` — Application layer (CQRS, commands, queries, business logic)
  - `Domain/` — Domain layer (entities, value objects, domain events)
  - `Infrastructure/` — Infrastructure layer (data access, email, identity, payments)
  - `Web/` — ASP.NET Core Web API (entry point, endpoints, configuration)
- `tests/` — Automated tests
  - Unit, functional, integration, and acceptance tests
- `terraform/` — Infrastructure as code
- `docker-compose.yml` — Multi-container orchestration

## Key Concepts
- **CQRS Pattern:** Commands and queries are separated for scalability and clarity.
- **Dependency Injection:** Used throughout for loose coupling and testability.
- **Modular Design:** Each feature (Clubs, Members, Tickets, etc.) is organized in its own folder.
- **Exception Handling:** Centralized in the Common module.
- **Security:** Managed in `Common/Security` and `Infrastructure/Identity`.

## Testing
- Unit tests for business logic
- Functional tests for application layer
- Integration tests for infrastructure
- Acceptance tests for end-to-end scenarios

## Conventions
- Folders are named by feature and layer.
- Use of `GlobalUsings.cs` for shared usings.
- Configuration via `appsettings.*.json` files.
- All code follows .NET naming conventions.

## How to Extend
- Add new features by creating modules in `src/Application`, `src/Domain`, and `src/Infrastructure`.
- Register dependencies in respective `DependencyInjection.cs` files.
- Add tests in the appropriate `tests/` subfolder.

## Contact
For questions, refer to the README.md or contact the repository owner.
