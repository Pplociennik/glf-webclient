import { TestBed } from '@angular/core/testing';

import { EmailInputValidator } from './email-input-validator';

describe('EmailInputValidator', () => {
  let service: EmailInputValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailInputValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
