import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputRequirementTooltipComponent } from '../../../shared/components/input-requirement-tooltip-component/input-requirement-tooltip-component';
import { InputRequirementModel } from '../../../shared/models/input-requirement-model';
import { UsernameInputValidator } from '../../../services/auth/validation/username-input-validator';
import { EmailInputValidator } from '../../../services/auth/validation/email-input-validator';
import { PasswordInputValidator } from '../../../services/auth/validation/password-input-validator';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-registration-component',
  standalone: true,
  imports: [CommonModule, InputRequirementTooltipComponent, FormsModule, TranslocoModule, RouterLink],
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

  activeLang: string = '';

  usernameRequirements: InputRequirementModel[] = [];
  emailRequirements: InputRequirementModel[] = [];
  passwordRequirements: InputRequirementModel[] = [];
  confirmPasswordRequirements: InputRequirementModel[] = [];

  constructor(
    private usernameInputValidator: UsernameInputValidator,
    private emailInputValidator: EmailInputValidator,
    private passwordInputValidator: PasswordInputValidator,
    private translocoService: TranslocoService
  ) {
    this.initializeRequirements();
  }

  private initializeRequirements() {
    this.usernameRequirements = [
      { description: 'registrationRequirements.username.minimumLength', validator: this.usernameInputValidator.validateUsernameMinimumLength, isValid: false },
      { description: 'registrationRequirements.username.maximumLength', validator: this.usernameInputValidator.validateUsernameMaximumLength, isValid: true },
      { description: 'registrationRequirements.username.characters', validator: this.usernameInputValidator.validateUsernameCharacters, isValid: false },
    ];

    this.emailRequirements = [
      { description: 'registrationRequirements.email.validEmail', validator: this.emailInputValidator.validateEmail, isValid: false },
    ];

    this.passwordRequirements = [
      { description: 'registrationRequirements.password.minimumLength', validator: this.passwordInputValidator.validatePasswordMinimumLength, isValid: false },
      { description: 'registrationRequirements.password.maximumLength', validator: this.passwordInputValidator.validatePasswordMaximumLength, isValid: true },
      { description: 'registrationRequirements.password.uppercaseLetter', validator: this.passwordInputValidator.validateAtLeastOneUppercaseLetter, isValid: false },
      { description: 'registrationRequirements.password.lowercaseLetter', validator: this.passwordInputValidator.validateAtLeastOneLowercaseLetter, isValid: false },
      { description: 'registrationRequirements.password.number', validator: this.passwordInputValidator.validateAtLeastOneNumber, isValid: false },
      { description: 'registrationRequirements.password.specialCharacter', validator: this.passwordInputValidator.validateAtLeastOneSpecialCharacter, isValid: false }
    ];

    this.confirmPasswordRequirements = [
      {
        description: 'registrationRequirements.confirmPassword.match',
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
