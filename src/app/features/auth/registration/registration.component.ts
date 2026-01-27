import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputRequirementTooltipComponent } from '../../../shared/components/input-requirement-tooltip-component/input-requirement-tooltip.component';
import { InputRequirementModel } from '../../../shared/models/input-requirement-model';
import { UsernameInputValidator } from '../../../services/features/auth/validation/registration.component/username-input-validator';
import { EmailInputValidator } from '../../../services/features/auth/validation/registration.component/email-input-validator';
import { PasswordInputValidator } from '../../../services/features/auth/validation/registration.component/password-input-validator';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../../services/features/auth/auth-service';
import {
  CredentialsModel,
  RegistrationModel,
} from '../../../shared/models/auth/registration-model';
import { ConfirmationLinkRequest } from '../../../shared/models/auth/confirmation-link-request';
import { ErrorInfoComponent } from '../../../shared/components/info/operation-info-bar/error-info/error-info.component';
import { ConfirmationLinkRequestComponent } from '../confirmation-link-request/confirmation-link-request/confirmation-link-request';

/**
 * Component for new user registration.
 * Provides form with real-time validation feedback for all input fields.
 */
@Component({
  selector: 'app-registration-component',
  standalone: true,
  imports: [
    CommonModule,
    InputRequirementTooltipComponent,
    FormsModule,
    TranslocoModule,
    RouterLink,
    ErrorInfoComponent,
    ConfirmationLinkRequestComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
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

  showError: boolean = false;
  errorMessage: string = '';

  registrationFinished: boolean = false;
  loading: boolean = false;

  /**
   * Handles username field validity change events.
   * @param isValid - Whether the username field is valid
   */
  onUsernameValidityChange(isValid: boolean) {
    this.isUsernameValid = isValid;
    this.updateFormValidity();
  }

  /**
   * Handles email field validity change events.
   * @param isValid - Whether the email field is valid
   */
  onEmailValidityChange(isValid: boolean) {
    this.isEmailValid = isValid;
    this.updateFormValidity();
  }

  /**
   * Handles password field validity change events.
   * @param isValid - Whether the password field is valid
   */
  onPasswordValidityChange(isValid: boolean) {
    this.isPasswordValid = isValid;
    this.updateFormValidity();
  }

  /**
   * Handles confirm password field validity change events.
   * @param isValid - Whether the confirm password field is valid
   */
  onConfirmPasswordValidityChange(isValid: boolean) {
    this.isConfirmPasswordValid = isValid;
    this.updateFormValidity();
  }

  /**
   * Updates overall form validity based on all field validations.
   */
  private updateFormValidity() {
    this.isFormValid =
      this.isUsernameValid &&
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
    private translocoService: TranslocoService,
    private authService: AuthService,
  ) {
    this.initializeRequirements();
  }

  /**
   * Initializes validation requirements for all form fields.
   * Sets up validators with translation keys for requirement descriptions.
   */
  private initializeRequirements() {
    this.usernameRequirements = [
      {
        description: 'registrationRequirements.username.minimumLength',
        validator: this.usernameInputValidator.validateUsernameMinimumLength,
        isValid: false,
      },
      {
        description: 'registrationRequirements.username.maximumLength',
        validator: this.usernameInputValidator.validateUsernameMaximumLength,
        isValid: true,
      },
      {
        description: 'registrationRequirements.username.characters',
        validator: this.usernameInputValidator.validateUsernameCharacters,
        isValid: false,
      },
    ];

    this.emailRequirements = [
      {
        description: 'registrationRequirements.email.validEmail',
        validator: this.emailInputValidator.validateEmail,
        isValid: false,
      },
    ];

    this.passwordRequirements = [
      {
        description: 'registrationRequirements.password.minimumLength',
        validator: this.passwordInputValidator.validatePasswordMinimumLength,
        isValid: false,
      },
      {
        description: 'registrationRequirements.password.maximumLength',
        validator: this.passwordInputValidator.validatePasswordMaximumLength,
        isValid: true,
      },
      {
        description: 'registrationRequirements.password.uppercaseLetter',
        validator: this.passwordInputValidator.validateAtLeastOneUppercaseLetter,
        isValid: false,
      },
      {
        description: 'registrationRequirements.password.lowercaseLetter',
        validator: this.passwordInputValidator.validateAtLeastOneLowercaseLetter,
        isValid: false,
      },
      {
        description: 'registrationRequirements.password.number',
        validator: this.passwordInputValidator.validateAtLeastOneNumber,
        isValid: false,
      },
      {
        description: 'registrationRequirements.password.specialCharacter',
        validator: this.passwordInputValidator.validateAtLeastOneSpecialCharacter,
        isValid: false,
      },
    ];

    this.confirmPasswordRequirements = [
      {
        description: 'registrationRequirements.confirmPassword.match',
        validator: (confirmPassword: string) => this.password === confirmPassword,
        isValid: this.password === this.confirmPassword,
      },
    ];
  }

  /**
   * Toggles password field visibility.
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggles confirm password field visibility.
   */
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Submits the registration form if all fields are valid.
   * Sends registration data to the backend service.
   */
  onSubmit() {
    if (!this.isFormValid) {
      return;
    }

    this.loading = true;
    const registrationData: RegistrationModel = {
      email: this.email,
      username: this.username,
      enabled: true,
      credentials: [
        {
          temporary: false,
          value: this.password,
        },
      ],
    };

    this.authService.register(registrationData).subscribe({
      next: (response) => {
        this.registrationFinished = true;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.errorMessage || error.error.errorMessage;
        this.showError = true;
      },
    });
  }
}
