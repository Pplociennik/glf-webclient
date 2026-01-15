import { TestBed } from '@angular/core/testing';

import { UsernameInputValidator } from './username-input-validator';

describe('UsernameInputValidator', () => {
  let service: UsernameInputValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameInputValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
