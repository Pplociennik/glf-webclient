import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRequirementTooltipComponent } from '../../../shared/components/input-requirement-tooltip-component/input-requirement-tooltip-component';
import { InputRequirementModel } from '../../../shared/models/input-requirement-model';
import { UsernameInputValidator } from '../../../services/auth/validation/username-input-validator';
import { EmailInputValidator } from '../../../services/auth/validation/email-input-validator';
import { PasswordInputValidator } from '../../../services/auth/validation/password-input-validator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-component',
  standalone: true,
  imports: [CommonModule, InputRequirementTooltipComponent, FormsModule],
  templateUrl: './registration-component.html',
  styleUrls: ['./registration-component.scss']
})
export class RegistrationComponent {
  @Input() username!: string;
  @Input() email!: string;
  @Input() password!: string;
  @Input() confirmPassword!: string;

  showPassword = false;
  showConfirmPassword = false;
  showUsernameTooltip = false;
  isFormValid: boolean = false;

  isUsernameValid: boolean = false;
  isEmailValid: boolean = false;
  isPasswordValid: boolean = false;
  isConfirmPasswordValid: boolean = false;

  onUsernameValidityChange(isValid: boolean) {
    this.isUsernameValid = isValid;
    this.updateFormValidity();
  }

  onEmailValidityChange(isValid: boolean) {
    this.isEmailValid = isValid;
    this.updateFormValidity();
  }

  onPasswordValidityChange(isValid: boolean) {
    this.isPasswordValid = isValid;
    this.updateFormValidity();
  }

  onConfirmPasswordValidityChange(isValid: boolean) {
    this.isConfirmPasswordValid = isValid;
    this.updateFormValidity();
  }

  private updateFormValidity() {
    this.isFormValid = this.isUsernameValid &&
      this.isEmailValid &&
      this.isPasswordValid &&
      this.isConfirmPasswordValid;
  }
  showEmailTooltip = false;
  showPasswordTooltip = false;
  showConfirmPasswordTooltip = false;

  usernameRequirements: InputRequirementModel[] = [];
  emailRequirements: InputRequirementModel[] = [];
  passwordRequirements: InputRequirementModel[] = [];
  confirmPasswordRequirements: InputRequirementModel[] = [];

  constructor(
    private usernameInputValidator: UsernameInputValidator,
    private emailInputValidator: EmailInputValidator,
    private passwordInputValidator: PasswordInputValidator
  ) {
    this.initializeRequirements();
  }

  private initializeRequirements() {
    this.usernameRequirements = [
      { description: 'At least 3 characters', validator: this.usernameInputValidator.validateUsernameMinimumLength, isValid: false },
      { description: 'At most 20 characters', validator: this.usernameInputValidator.validateUsernameMaximumLength, isValid: true },
      { description: 'Only letters, numbers, and underscores', validator: this.usernameInputValidator.validateUsernameCharacters, isValid: false },
    ];

    this.emailRequirements = [
      { description: 'Valid email address', validator: this.emailInputValidator.validateEmail, isValid: false },
    ];

    this.passwordRequirements = [
      { description: 'At least 8 characters', validator: this.passwordInputValidator.validatePasswordMinimumLength, isValid: false },
      { description: 'At most 256 characters', validator: this.passwordInputValidator.validatePasswordMaximumLength, isValid: true },
      { description: 'At least one uppercase letter', validator: this.passwordInputValidator.validateAtLeastOneUppercaseLetter, isValid: false },
      { description: 'At least one lowercase letter', validator: this.passwordInputValidator.validateAtLeastOneLowercaseLetter, isValid: false },
      { description: 'At least one number', validator: this.passwordInputValidator.validateAtLeastOneNumber, isValid: false },
      { description: 'At least one special character', validator: this.passwordInputValidator.validateAtLeastOneSpecialCharacter, isValid: false }
    ];

    this.confirmPasswordRequirements = [
      {
        description: 'Passwords must match',
        validator: (confirmPassword: string) => this.password === confirmPassword,
        isValid: this.password === this.confirmPassword
      }
    ];
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
