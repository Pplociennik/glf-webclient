import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';
import { UserTokenManagementService } from '../../user-token-management-service';

describe('JwtService', () => {
  let service: JwtService;
  let userTokenManagementServiceMock: jasmine.SpyObj<UserTokenManagementService>;

  // Sample valid JWT token for testing (created with jwt.io)
  // Header: {"alg":"HS256","typ":"JWT"}
  // Payload: {
  //   "sub": "user-uuid-123",
  //   "email": "test@example.com",
  //   "email_verified": true,
  //   "sid": "session-id-456",
  //   "preferred_username": "testuser",
  //   "name": "Test User",
  //   "given_name": "Test",
  //   "family_name": "User",
  //   "realm_access": { "roles": ["user", "admin"] },
  //   "exp": 9999999999,
  //   "iat": 1700000000
  // }
  const validToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiJ1c2VyLXV1aWQtMTIzIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInNpZCI6InNlc3Npb24taWQtNDU2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHVzZXIiLCJuYW1lIjoiVGVzdCBVc2VyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJmYW1pbHlfbmFtZSI6IlVzZXIiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidXNlciIsImFkbWluIl19LCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTcwMDAwMDAwMH0.' +
    'signature';

  // Expired token (exp: 1000000000 - in the past)
  const expiredToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiJ1c2VyLXV1aWQtMTIzIiwiZXhwIjoxMDAwMDAwMDAwfQ.' +
    'signature';

  beforeEach(() => {
    userTokenManagementServiceMock = jasmine.createSpyObj('UserTokenManagementService', [
      'getStoredAccessToken',
    ]);

    TestBed.configureTestingModule({
      providers: [
        JwtService,
        { provide: UserTokenManagementService, useValue: userTokenManagementServiceMock },
      ],
    });
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('decodeToken', () => {
    it('should decode a valid JWT token', () => {
      const result = service.decodeToken(validToken);

      expect(result).toBeTruthy();
      expect(result?.sub).toBe('user-uuid-123');
      expect(result?.email).toBe('test@example.com');
    });

    it('should return null for empty token', () => {
      expect(service.decodeToken('')).toBeNull();
    });

    it('should return null for whitespace-only token', () => {
      expect(service.decodeToken('   ')).toBeNull();
    });

    it('should return null for invalid token', () => {
      expect(service.decodeToken('not-a-valid-token')).toBeNull();
    });

    it('should return null for null-like input', () => {
      expect(service.decodeToken(null as unknown as string)).toBeNull();
      expect(service.decodeToken(undefined as unknown as string)).toBeNull();
    });
  });

  describe('decodeStoredToken', () => {
    it('should decode the stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      const result = service.decodeStoredToken();

      expect(result).toBeTruthy();
      expect(result?.email).toBe('test@example.com');
    });

    it('should return null when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      const result = service.decodeStoredToken();

      expect(result).toBeNull();
    });
  });

  describe('getUserEmail', () => {
    it('should return email from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.getUserEmail()).toBe('test@example.com');
    });

    it('should return null when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      expect(service.getUserEmail()).toBeNull();
    });
  });

  describe('getSessionId', () => {
    it('should return session ID from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.getSessionId()).toBe('session-id-456');
    });

    it('should return null when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      expect(service.getSessionId()).toBeNull();
    });
  });

  describe('getPreferredUsername', () => {
    it('should return preferred username from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.getPreferredUsername()).toBe('testuser');
    });
  });

  describe('getUserFullName', () => {
    it('should return full name from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.getUserFullName()).toBe('Test User');
    });
  });

  describe('getUserId', () => {
    it('should return user ID (sub claim) from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.getUserId()).toBe('user-uuid-123');
    });
  });

  describe('getUserRoles', () => {
    it('should return roles array from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      const roles = service.getUserRoles();

      expect(roles).toEqual(['user', 'admin']);
    });

    it('should return empty array when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      expect(service.getUserRoles()).toEqual([]);
    });
  });

  describe('hasRole', () => {
    beforeEach(() => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);
    });

    it('should return true when user has the role', () => {
      expect(service.hasRole('admin')).toBeTrue();
      expect(service.hasRole('user')).toBeTrue();
    });

    it('should return false when user does not have the role', () => {
      expect(service.hasRole('superadmin')).toBeFalse();
    });
  });

  describe('getTokenExpiration', () => {
    it('should return expiration timestamp from stored token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.getTokenExpiration()).toBe(9999999999);
    });

    it('should return null when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      expect(service.getTokenExpiration()).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('should return false for valid non-expired token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.isTokenExpired()).toBeFalse();
    });

    it('should return true for expired token', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(expiredToken);

      expect(service.isTokenExpired()).toBeTrue();
    });

    it('should return true when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      expect(service.isTokenExpired()).toBeTrue();
    });
  });

  describe('isEmailVerified', () => {
    it('should return true when email is verified', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue(validToken);

      expect(service.isEmailVerified()).toBeTrue();
    });

    it('should return false when no token is stored', () => {
      userTokenManagementServiceMock.getStoredAccessToken.and.returnValue('');

      expect(service.isEmailVerified()).toBeFalse();
    });
  });

  describe('decodeTokenFull', () => {
    it('should decode token with header, payload, and signature', () => {
      const result = service.decodeTokenFull(validToken);

      expect(result).toBeTruthy();
      expect(result?.header.alg).toBe('HS256');
      expect(result?.header.typ).toBe('JWT');
      expect(result?.payload.email).toBe('test@example.com');
      expect(result?.signature).toBe('signature');
    });

    it('should return null for empty token', () => {
      expect(service.decodeTokenFull('')).toBeNull();
    });

    it('should return null for token with wrong number of parts', () => {
      expect(service.decodeTokenFull('only.two')).toBeNull();
      expect(service.decodeTokenFull('too.many.parts.here')).toBeNull();
    });

    it('should return null for invalid token', () => {
      expect(service.decodeTokenFull('invalid.token.here')).toBeNull();
    });
  });
});
