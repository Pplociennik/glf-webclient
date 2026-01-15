# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Always Check Documentation

**CRITICAL**: Before working on any task, ALWAYS check the `docs/` directory for relevant documentation:

- **docs/api-urls.md** - Rules for adding API URLs, current endpoints, naming conventions
- **docs/documentation.md** - Guidelines for writing code documentation (comments for functions and structures)

The documentation in `docs/` contains critical information about:
- Development standards and conventions
- Integration patterns with backend services
- Current system state and available APIs
- Constraints and requirements for the project

Always read and follow the guidelines in these documents to ensure consistency and avoid mistakes.

## Project Overview

Angular 20 web client for the Goaleaf microservices system. Uses standalone components, Angular Material, and Transloco for internationalization.

## Development Commands

### Running the Application

```bash
# Development server (http://localhost:4200)
ng serve

# Development server with watch mode
npm run watch
```

### Building

```bash
# Production build (output in dist/)
ng build

# Development build
ng build --configuration development
```

### Testing

```bash
# Run unit tests (Karma)
ng test

# Run e2e tests
ng e2e
```

### Code Generation

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# See all available schematics
ng generate --help
```

### Docker

```bash
# Build Docker image
docker build -t glf-webclient .

# Run container
docker run -p 4200:4200 glf-webclient
```

## Project Architecture

### Directory Structure

- **docs/** - Project documentation (API URLs, conventions, guidelines)
- **src/app/features/** - Feature modules and components (auth, home-page)
- **src/app/services/** - Application services (auth validation, language)
- **src/app/shared/** - Shared components, models, and utilities
- **src/assets/i18n/** - Translation files (en, pl, de, szl)
- **src/environments/** - Environment configuration files (API URLs, settings)

### Component Pattern

All components use the standalone API (no NgModules):

```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [TranslocoModule, RouterLink, /* other imports */],
  templateUrl: './component-name.html',
  styleUrl: './component-name.scss'
})
export class ComponentName { }
```

### Component Organization

Each component lives in its own directory with naming pattern:
- `component-name.ts` - Component class
- `component-name.html` - Template
- `component-name.scss` - Styles
- `component-name.spec.ts` - Tests

**IMPORTANT**: Do not use `-component` suffix in directory or file names. For example:
- **Correct**: `login/login.ts`
- **Incorrect**: `login-component/login-component.ts` (current pattern to be migrated)

### Service Pattern

Services use `providedIn: 'root'` for automatic dependency injection:

```typescript
@Injectable({
  providedIn: 'root'
})
export class ServiceName {
  constructor(private dependency: Dependency) { }
}
```

### Internationalization (i18n)

Uses **Transloco** for multi-language support (en, pl, de, szl):

- Translation files: `src/assets/i18n/{lang}.json`
- Inject `TranslocoService` in components for programmatic access
- Use `TranslocoModule` in component imports for template directives
- Language detection: Automatic browser language detection with fallback to English
- Language switching: Via `LanguageService.switchLanguage(lang)`

Supported languages are defined in:
- `app.config.ts`: `availableLangs: ['en', 'pl', 'de', 'szl']`
- `LanguageService`: `supportedLanguages` array

### Routing

Routes defined in `app.routes.ts`:
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/password-reset` - Password reset page

Use `RouterLink` directive for navigation or inject `Router` for programmatic navigation.

### Styling

- **SCSS** is the default style language
- Global styles: `src/styles.scss`
- Component-specific styles: Use `styleUrl` (singular) property
- Angular Material theme configured globally

### TypeScript Configuration

Strict mode enabled with:
- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictTemplates: true` (Angular templates)

Always handle all code paths and avoid implicit any types.

### Validation Pattern

Input validators are services in `services/auth/validation/`:

```typescript
@Injectable({ providedIn: 'root' })
export class EmailInputValidator {
  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
```

Validators follow the `InputRequirementModel` interface:
```typescript
interface InputRequirementModel {
  description: string;
  isValid: boolean;
  validator: (value: string) => boolean;
}
```

## Integration with Backend

This web client integrates with the Goaleaf Spring Boot microservices:

- **API Gateway**: `http://localhost:8072` (routes to backend services)
- **Authentication**: Keycloak OAuth2/JWT via API Gateway
- **Services**: Communities (8081), Accounts (8080)

When developing features that interact with backend APIs:
- ALWAYS use the API Gateway as the entry point (never call services directly)
- Ensure proper JWT token handling
- **See docs/api-urls.md for detailed rules on adding API URLs and current endpoint documentation**
- ONLY add URLs from REST controllers - NEVER add infrastructure URLs (Keycloak, Config Server, etc.)

## Code Formatting

Prettier is configured in `package.json`:
- Print width: 100 characters
- Single quotes: Enabled
- Angular parser for HTML templates

## Important Notes

- All components are **standalone** - no NgModules
- Use **inject()** function or constructor injection for dependencies
- Translation keys must exist in all 4 language files (en, pl, de, szl)
- Material components require importing from `@angular/material` and `@angular/cdk`
- Build budgets: Initial bundle max 1MB, component styles max 8kB
