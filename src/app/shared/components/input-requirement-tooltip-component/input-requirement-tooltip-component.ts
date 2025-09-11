import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InputRequirementModel } from '../../models/input-requirement-model';

@Component({
  selector: 'app-input-requirement-tooltip-component',
  standalone: true,
  imports: [],
  templateUrl: './input-requirement-tooltip-component.html',
  styleUrl: './input-requirement-tooltip-component.scss'
})
export class InputRequirementTooltipComponent {
  @Input() showTooltip!: boolean;
  @Output() validityChange = new EventEmitter<boolean>();
  
  private _requirements: InputRequirementModel[] = [];
  private _value: string = '';

  @Input() set requirements(value: InputRequirementModel[]) {
    this._requirements = value || [];
    this.validateRequirements(this._value);
    this.emitValidity();
  }

  get requirements(): InputRequirementModel[] {
    return this._requirements;
  }

  @Input() set value(value: string) {
    this._value = value || '';
    this.validateRequirements(this._value);
    this.emitValidity();
  }

  get value(): string {
    return this._value;
  }

  isValid: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.validateRequirements(this._value);
    }
  }

  private emitValidity() {
    this.validityChange.emit(this.isValid);
  }

  private validateRequirements(value: string) {
    if (!this._requirements?.length) return;

    this._requirements.forEach((requirement) => {
      const isValid = requirement.validator(value);
      requirement.isValid = isValid;
      this.isValid = isValid;
    });

    this.emitValidity();
  }
}

