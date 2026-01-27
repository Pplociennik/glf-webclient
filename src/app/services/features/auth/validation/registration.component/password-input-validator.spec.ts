import { TestBed } from '@angular/core/testing';

import { PasswordInputValidator } from './password-input-validator';

describe('PasswordInputValidator', () => {
  let service: PasswordInputValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordInputValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
