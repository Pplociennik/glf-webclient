# API URLs Documentation

## Purpose

This document defines the rules and process for adding API URLs to the Angular web client project. Following these guidelines ensures consistency, maintainability, and proper integration with the backend microservices.

## Core Principles

### ✅ What to Add

**ONLY add URLs from REST Controllers (`@RestController`)**

- Backend REST API endpoints from `glf-accounts`, `glf-communities`, and other business services
- URLs that are consumed directly by the Angular application
- Endpoints that handle business logic and data operations

### ❌ What NOT to Add

**DO NOT add infrastructure/tool URLs:**

- ❌ Keycloak URLs (managed internally by backend)
- ❌ Config Server URLs
- ❌ Service Discovery URLs
- ❌ Database URLs
- ❌ Message broker URLs
- ❌ Observability stack URLs (Grafana, Prometheus, Loki, Tempo)
- ❌ Any other infrastructure/operational tool URLs

**Why?** These services are backend concerns and should never be accessed directly from the frontend. All authentication, configuration, and service communication is handled through the API Gateway and backend services.

## Directory Structure

```
src/
├── app/
│   └── enums/
│       └── ApiPaths.ts         # Enum with REST controller paths
└── environments/
    ├── environment.ts          # Development configuration
    └── environment.prod.ts     # Production configuration
```

## Architecture Overview

The API URL structure uses three components:

1. **environment.baseUrl** - API Gateway URL
2. **ApiPaths enum** - Paths to REST controllers (@RequestMapping)
3. **environment.endpoints** - Paths to controller methods (@GetMapping, @PostMapping, etc.)

**Full URL Pattern:**
```typescript
${environment.baseUrl}${ApiPaths.ControllerName}${environment.endpoints.methodName}
```

**Example:**
```typescript
const url = `${environment.baseUrl}${ApiPaths.Auth}${environment.endpoints.login}`;
// Result: http://localhost:8072/glf-accounts/api/auth/login
```

## File Structures

### ApiPaths Enum (`src/app/enums/ApiPaths.ts`)

```typescript
export enum ApiPaths {
  // Controller paths from @RequestMapping
  Auth = '/glf-accounts/api/auth',
  Accounts = '/glf-accounts/api/accounts',
  Users = '/glf-accounts/api/users',
  Communities = '/glf-communities/api/communities',
}
```

### Environment Configuration

```typescript
export const environment = {
  production: boolean,
  baseUrl: string,             // API Gateway base URL
  endpoints: {
    [methodName]: string,      // Method paths from @GetMapping, @PostMapping, etc.
  },
};
```

**Important**:
- **baseUrl**: API Gateway URL (no trailing slash)
- **ApiPaths**: Full controller paths including service prefix
- **endpoints**: Only method-specific paths (must start with `/`)

## Process for Adding New API URLs

### Step 1: Identify REST Controller

Navigate to the backend service and locate the `@RestController` class:

```java
@RestController
@RequestMapping(path = "/api/resource")
class ResourceController {
    @PostMapping(path = "/create")
    @GetMapping(path = "/fetch")
}
```

### Step 2: Extract Controller Path and Method Endpoints

From the controller, identify:
- **Service name**: From the project (e.g., `glf-accounts`, `glf-communities`)
- **Controller path**: Value in `@RequestMapping(path = "...")`
- **Method endpoints**: Paths in `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`

**Example:**

```java
// File: glf-communities/src/.../CommunityController.java
@RestController
@RequestMapping(path = "/api/communities")
class CommunityController {
    @PostMapping(path = "/create")
    @GetMapping("/community")
    @PutMapping(path = "/update")
    @DeleteMapping(path = "/delete")
}
```

Extracted:
- Service: `glf-communities`
- Controller path: `/api/communities`
- Full path: `/glf-communities/api/communities`
- Method endpoints: `/create`, `/community`, `/update`, `/delete`

### Step 3: Add to ApiPaths Enum

Add the controller path to `src/app/enums/ApiPaths.ts`:

```typescript
export enum ApiPaths {
  Auth = '/glf-accounts/api/auth',
  Accounts = '/glf-accounts/api/accounts',
  Users = '/glf-accounts/api/users',
  Communities = '/glf-communities/api/communities',
  // Add new controller path here
  Resource = '/glf-service/api/resource',  // NEW
}
```

### Step 4: Add Method Endpoints to Environment Configuration

Add method endpoints to `environment.ts` and `environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8072',
  endpoints: {
    // Existing endpoints...

    // ResourceController (/glf-service/api/resource)
    resourceCreate: '/create',     // NEW
    resourceFetch: '/fetch',       // NEW
  },
};
```

**Naming Convention for Endpoint Keys:**
- Format: `{resourceName}{Action}`
- Examples: `login`, `communityCreate`, `passwordReset`, `emailConfirm`
- Use camelCase

### Step 5: Use in Angular Service

Import and use the configuration in your Angular service:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiPaths } from '../enums/ApiPaths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthenticationRequestDto) {
    const url = `${environment.baseUrl}${ApiPaths.Auth}${environment.endpoints.login}`;
    return this.http.post(url, credentials);
  }

  register(data: RegistrationRequestDto) {
    const url = `${environment.baseUrl}${ApiPaths.Auth}${environment.endpoints.register}`;
    return this.http.post(url, data);
  }
}
```

**Pattern with Base URL Variable:**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiPaths } from '../enums/ApiPaths';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private readonly baseUrl = `${environment.baseUrl}${ApiPaths.Communities}`;

  constructor(private http: HttpClient) {}

  createCommunity(data: CreateCommunityDto) {
    return this.http.post(`${this.baseUrl}${environment.endpoints.communityCreate}`, data);
  }

  getCommunity(identifier: string) {
    return this.http.get(`${this.baseUrl}${environment.endpoints.communityFetch}`, {
      params: { aIdentifier: identifier }
    });
  }

  updateCommunity(data: CommunityDto) {
    return this.http.put(`${this.baseUrl}${environment.endpoints.communityUpdate}`, data);
  }

  deleteCommunity(identifier: string) {
    return this.http.delete(`${this.baseUrl}${environment.endpoints.communityDelete}`, {
      params: { aIdentifier: identifier }
    });
  }
}
```

## Current API Endpoints

### glf-accounts Service

#### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user account |
| POST | `/login` | Authenticate user |
| POST | `/session/refresh` | Refresh user access token |
| POST | `/logout/all` | Terminate all user sessions |
| DELETE | `/logout` | Terminate current session |
| DELETE | `/logout-session` | Terminate specific session by ID |

#### Account Management (`/api/accounts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/email-confirmation/request` | Request email verification |
| POST | `/confirm` | Verify email address |
| POST | `/password/reset` | Request password reset |
| POST | `/password/change` | Change account password |

#### User Details (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| - | - | (No endpoints implemented yet) |

### glf-communities Service

#### Community Management (`/api/communities`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create new community |
| GET | `/community` | Fetch community by identifier |
| PUT | `/update` | Update existing community |
| DELETE | `/delete` | Delete community by identifier |

## Naming Conventions

### ApiPaths Enum Keys

Use PascalCase matching the controller resource:
- ✅ `Auth`, `Accounts`, `Users`, `Communities` (PascalCase, matches controllers)
- ❌ `auth`, `Authentication`, `account` (wrong case or naming)

**Rule**: Key should use PascalCase and match the resource from `@RequestMapping`

### Environment Endpoints Keys

Use camelCase with pattern `{resourceName}{Action}`:
- ✅ `login`, `register`, `communityCreate`, `passwordReset` (camelCase with action)
- ❌ `Login`, `community_create`, `reset-password` (wrong case or separators)

**For single-word actions**: Just use the action name (e.g., `login`, `register`)
**For multi-word actions**: Prefix with resource (e.g., `communityCreate`, `emailConfirm`)

### ApiPaths Values

Follow the pattern: `/{service-name}/api/{resource}`
- ✅ `/glf-accounts/api/auth` (AuthenticationController)
- ✅ `/glf-accounts/api/accounts` (AccountManagementController)
- ✅ `/glf-accounts/api/users` (UserDetailsController)
- ✅ `/glf-communities/api/communities` (CommunityController)
- ❌ `/accounts/api/auth` (missing service prefix)
- ❌ `/glf-accounts/authentication` (wrong path, doesn't match controller)

### Environment Endpoints Values

Exact paths from controller method annotations:
- ✅ `/login`, `/create`, `/email-confirmation/request` (matches @PostMapping, @GetMapping, etc.)
- ❌ `login`, `create` (missing leading slash)
- ❌ `/api/login` (includes controller path, should be method-only)

## API Gateway Routing

All API requests from the frontend MUST go through the API Gateway:

```
Frontend → API Gateway (port 8072) → Backend Service
```

**Development:**
```
Frontend: http://localhost:4200
Request: ${baseUrl}${ApiPaths.Auth}${endpoints.login}
Result: http://localhost:8072/glf-accounts/api/auth/login
Gateway routes to: http://localhost:8080/api/auth/login (accounts service)
```

**Production:**
```
Frontend: https://goaleaf.com
Request: ${baseUrl}${ApiPaths.Auth}${endpoints.login}
Result: https://api.goaleaf.com/glf-accounts/api/auth/login
Gateway routes to: Backend Service
```

**Path Breakdown:**
- `baseUrl`: `http://localhost:8072` (API Gateway)
- `ApiPaths.Auth`: `/glf-accounts/api/auth` (controller path)
- `endpoints.login`: `/login` (method path)
- **Full URL**: `http://localhost:8072/glf-accounts/api/auth/login`

## Security Considerations

- All requests through API Gateway are authenticated via OAuth2/JWT
- Never expose internal service URLs to the frontend
- API Gateway handles:
  - Token validation
  - Rate limiting
  - Request routing
  - Load balancing

## Checklist for Adding New Endpoints

### When Adding a New Controller

- [ ] Controller is a `@RestController` (not infrastructure)
- [ ] Extracted full controller path: `/{service-name}/api/{resource}`
- [ ] Added to `ApiPaths` enum with PascalCase key
- [ ] Value includes service prefix (e.g., `/glf-accounts/api/auth`)

### When Adding Controller Methods

- [ ] Extracted method paths from `@GetMapping`, `@PostMapping`, etc.
- [ ] Added to `environment.endpoints` with camelCase keys
- [ ] Keys follow pattern: `{resourceName}{Action}` or just action name
- [ ] Values start with `/` and match controller annotations exactly
- [ ] Added to both `environment.ts` and `environment.prod.ts`

### When Creating Angular Service

- [ ] Service imports both `environment` and `ApiPaths`
- [ ] URLs built using: `${environment.baseUrl}${ApiPaths.X}${environment.endpoints.y}`
- [ ] Optional: Service has `baseUrl` property for repeated controller access
- [ ] Service methods use correct HTTP verbs matching backend

### Documentation

- [ ] Updated this document's "Current API Endpoints" section
- [ ] Added controller and method descriptions
- [ ] Verified all examples follow the three-component pattern

## Quick Reference

### URL Building Pattern

```typescript
const url = `${environment.baseUrl}${ApiPaths.ControllerName}${environment.endpoints.methodName}`;
```

### Example: Login Request

```typescript
// Components
environment.baseUrl = 'http://localhost:8072'
ApiPaths.Auth = '/glf-accounts/api/auth'
environment.endpoints.login = '/login'

// Combined
const url = `${environment.baseUrl}${ApiPaths.Auth}${environment.endpoints.login}`;
// Result: http://localhost:8072/glf-accounts/api/auth/login
```

### Files to Update

| Action | File | What to Add |
|--------|------|-------------|
| New Controller | `src/app/enums/ApiPaths.ts` | `ControllerName = '/service/api/resource'` |
| New Method | `src/environments/environment.ts` | `methodName: '/path'` |
| New Method | `src/environments/environment.prod.ts` | `methodName: '/path'` |
| Use in Service | `src/app/services/**.service.ts` | Import and build URLs |

### Common Mistakes to Avoid

❌ Missing service prefix in ApiPaths
```typescript
Auth = '/api/auth'  // WRONG - missing glf-accounts
```

✅ Include full path with service prefix
```typescript
Auth = '/glf-accounts/api/auth'  // CORRECT
```

❌ Missing leading slash in endpoints
```typescript
login: 'login'  // WRONG - no leading slash
```

✅ Always start with slash
```typescript
login: '/login'  // CORRECT
```

❌ Including controller path in endpoint
```typescript
login: '/api/auth/login'  // WRONG - too much path
```

✅ Only method path
```typescript
login: '/login'  // CORRECT
```

## Maintenance

- **When adding a new backend controller**: Follow steps 1-5
- **When modifying existing endpoints**: Update environment files and this documentation
- **When removing endpoints**: Remove from environment files, ApiPaths (if controller removed), and update this documentation
- **Review quarterly**: Ensure all documented endpoints are still active and accurate

## References

- Backend Controllers:
  - `glf-accounts/src/main/java/com/goaleaf/accounts/controller/`
  - `glf-communities/src/main/java/com/goaleaf/communities/controller/`
- API Gateway Configuration: `glf-api-gateway/src/main/resources/application.yml`
- Frontend Configuration:
  - `src/app/enums/ApiPaths.ts`
  - `src/environments/environment.ts`
  - `src/environments/environment.prod.ts`
- Main Project Documentation: `../../CLAUDE.md`
