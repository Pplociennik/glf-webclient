# Documentation Guidelines

This document provides instructions on how to write documentation for code files in this project.

## General Principles

1. **Document only functions and structures** - Add comments for functions, classes, interfaces, types, and enums
2. **Place comments above declarations** - All documentation comments should appear directly above the element being documented
3. **No inline comments** - Do NOT add any comments inside function bodies

## What to Document

### Functions and Methods

Document all functions and methods with:
- Brief description of what the function does
- Parameter descriptions (if not self-evident)
- Return value description (if not self-evident)
- Any thrown exceptions or errors

### Data Structures

Document the following structures:
- Classes
- Interfaces
- Types
- Enums

Include:
- Purpose of the structure
- Usage context (when applicable)

### Fields and Properties

Document class fields and properties when:
- The field's purpose is not immediately obvious from its name
- The field has specific constraints or valid values
- The field represents important domain concepts
- The field is a dependency injection (services, repositories)

Include:
- Brief description of what the field holds or represents
- Any constraints or valid value ranges (when applicable)

## Comment Format

### TypeScript/JavaScript

Use JSDoc-style comments:

```typescript
/**
 * Brief description of the class/interface.
 */
interface UserModel {
  /** Unique identifier for the user. */
  id: string;
  /** Display name shown in the UI. */
  name: string;
  /** Email address used for authentication. */
  email: string;
}

/**
 * Service responsible for user authentication operations.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  /** HTTP client for making API requests. */
  private readonly http: HttpClient;

  /** Router for navigation after authentication. */
  private readonly router: Router;

  /** Current authentication state of the user. */
  private isAuthenticated = false;

  /**
   * Authenticates a user with the provided credentials.
   * @param email - User's email address
   * @param password - User's password
   * @returns Observable containing the authentication response
   */
  login(email: string, password: string): Observable<AuthResponse> {
    // Implementation here - NO COMMENTS INSIDE
    const payload = { email, password };
    return this.http.post<AuthResponse>(this.loginUrl, payload);
  }

  /**
   * Logs out the current user and clears session data.
   */
  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }
}
```

### Java

Use Javadoc-style comments:

```java
/**
 * Data transfer object for user registration requests.
 */
public class RegistrationDto {
    /** Email address for the new account. */
    private String email;
    /** Password for account authentication. */
    private String password;
    /** Unique username displayed to other users. */
    private String username;
}

/**
 * Service handling user account operations.
 */
@Service
@AllArgsConstructor
public class AccountService {

    /** Repository for user persistence operations. */
    private final UserRepository userRepository;

    /** Service for sending email notifications. */
    private final EmailService emailService;

    /**
     * Creates a new user account with the provided registration data.
     * @param dto Registration data containing user details
     * @return Created user entity
     * @throws EmailAlreadyExistsException if email is already registered
     */
    public User createAccount(RegistrationDto dto) {
        User user = mapToEntity(dto);
        return userRepository.save(user);
    }
}
```

## What NOT to Document

1. **Self-explanatory code** - Simple getters/setters with obvious purpose
2. **Trivial fields** - Fields with names that clearly convey their meaning (e.g., `id`, `name`, `email`)
3. **Private helper variables** - Internal implementation details like loop counters or temporary variables
4. **Inline logic** - Never add comments explaining code inside function bodies

## Examples of Bad Documentation

```typescript
// BAD - Comment inside function body
function calculateTotal(items: Item[]): number {
  // Loop through all items and sum their prices
  let total = 0;
  for (const item of items) {
    // Add item price to total
    total += item.price;
  }
  // Return the final total
  return total;
}

// BAD - Obvious documentation
/**
 * Gets the id.
 * @returns The id
 */
getId(): string {
  return this.id;
}

// BAD - Redundant field documentation
export class User {
  /** The user's id. */
  id: string;
  /** The user's name. */
  name: string;
}
```

## Examples of Good Documentation

```typescript
/**
 * Calculates the total price of all items including applicable discounts.
 * @param items - Array of items to calculate total for
 * @returns Total price after discounts
 */
function calculateTotal(items: Item[]): number {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return applyDiscounts(total);
}

/**
 * Represents a validation requirement with its check function.
 */
interface InputRequirementModel {
  /** Human-readable description shown to the user. */
  description: string;
  /** Current validation state, updated after each check. */
  isValid: boolean;
  /** Function that validates the input and returns true if valid. */
  validator: (value: string) => boolean;
}

/**
 * Configuration for API request retry behavior.
 */
export class RetryConfig {
  /** Maximum number of retry attempts before giving up. Must be >= 0. */
  maxRetries: number;
  /** Delay in milliseconds between retry attempts. */
  retryDelayMs: number;
  /** HTTP status codes that should trigger a retry. */
  retryableStatusCodes: number[];
}
```

## Summary

| Element | Document? | Location |
|---------|-----------|----------|
| Classes | Yes | Above class declaration |
| Interfaces | Yes | Above interface declaration |
| Types | Yes | Above type declaration |
| Enums | Yes | Above enum declaration |
| Fields/Properties | Yes | Above field declaration |
| Public methods | Yes | Above method declaration |
| Private methods | Optional | Above method declaration |
| Function body | No | Never add inline comments |
| Simple getters/setters | No | Skip if self-explanatory |
| Trivial fields | No | Skip if name is self-explanatory (e.g., `id`, `name`) |
