import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRequirementTooltipComponent } from './input-requirement-tooltip.component';

describe('InputRequirementTooltipComponent', () => {
  let component: InputRequirementTooltipComponent;
  let fixture: ComponentFixture<InputRequirementTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRequirementTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRequirementTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
