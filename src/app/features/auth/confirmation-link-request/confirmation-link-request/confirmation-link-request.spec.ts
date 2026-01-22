import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationLinkRequest } from './confirmation-link-request';

describe('ConfirmationLinkRequest', () => {
  let component: ConfirmationLinkRequest;
  let fixture: ComponentFixture<ConfirmationLinkRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationLinkRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationLinkRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
