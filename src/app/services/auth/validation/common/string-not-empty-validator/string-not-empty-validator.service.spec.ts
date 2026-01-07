import { StringNotEmptyValidatorService } from './value-not-empty-validator.service';
import { TestBed } from '@angular/core/testing';

describe('NotEmptyValidatorService', () => {
  let service: StringNotEmptyValidatorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringNotEmptyValidatorService],
    });
    service = TestBed.get(StringNotEmptyValidatorService);
  });

  it('should be able to create service instance', () => {
    expect(service).toBeDefined();
  });
});
