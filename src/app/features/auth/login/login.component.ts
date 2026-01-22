import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../../services/features/auth/auth-service';
import { LoginModel } from '../../../shared/models/auth/authentication-request-model';
import { FormsModule } from '@angular/forms';
import { OperationInfoBarComponent } from '../../../shared/components/info/operation-info-bar/operation-info-bar.component';
import { StringNotEmptyValidatorService } from '../../../services/features/auth/validation/common/string-not-empty-validator/string-not-empty-validator.service';
import { InputRequirementModel } from '../../../shared/models/input-requirement-model';
import { InputRequirementTooltipComponent } from '../../../shared/components/input-requirement-tooltip-component/input-requirement-tooltip.component';
import { GeolocationService } from '../../../services/system/geolocation/geolocation.service';
import { DeviceInfoService } from '../../../services/system/device/device-info.service';
import { EmailInputValidator } from '../../../services/features/auth/validation/registration.component/email-input-validator';

/**
 * Component for user login functionality.
 * Handles user authentication and redirects to dashboard on success.
 */
@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    FormsModule,
    OperationInfoBarComponent,
    InputRequirementTooltipComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Input() email!: string;
  @Input() password!: string;
  showPassword: boolean = false;

  showError: boolean = false;
  errorMessage: string = '';

  operationSuccess: boolean = false;

  buttonActive: boolean = false;

  isFormValid: boolean = false;

  emailRequirements: InputRequirementModel[] = [];
  passwordRequirements: InputRequirementModel[] = [];
  isEmailNotEmpty: boolean = false;
  isEmailCorrect: boolean = false;
  isPasswordNotEmpty: boolean = false;
  showEmailTooltip: boolean = false;
  showPasswordTooltip: boolean = false;

  private userLocation: string = '';

  constructor(
    private router: Router,
    private translocoService: TranslocoService,
    private authService: AuthService,
    private stringNotEmptyValidator: StringNotEmptyValidatorService,
    private geolocationService: GeolocationService,
    private deviceInfoService: DeviceInfoService,
    private emailCorrectValidator: EmailInputValidator,
  ) {
    this.initializeRequirements();
  }

  ngOnInit(): void {
    this.geolocationService.getLocationString().subscribe((location) => {
      this.userLocation = location;
    });
  }

  /**
   * Navigates to the registration page.
   */
  goToRegister() {
    this.router.navigate(['/register']);
  }

  /**
   * Toggles password field visibility between hidden and visible.
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onEmailInputChange(isValid: boolean) {
    this.isEmailNotEmpty = isValid;
    this.isEmailCorrect = isValid;
    this.updateFormValidity();
  }
  onPasswordInputChange(isValid: boolean) {
    this.isPasswordNotEmpty = isValid;
    this.updateFormValidity();
  }

  updateFormValidity() {
    this.isFormValid = this.isEmailNotEmpty && this.isPasswordNotEmpty;
    this.buttonActive = this.isFormValid;
  }

  private initializeRequirements() {
    this.emailRequirements = [
      {
        description: 'loginRequirements.email.notEmpty',
        validator: this.stringNotEmptyValidator.validate,
        isValid: false,
      },
      {
        description: 'loginRequirements.email.isCorrect',
        validator: this.emailCorrectValidator.validateEmail,
        isValid: false,
      },
    ];

    this.passwordRequirements = [
      {
        description: 'loginRequirements.password.notEmpty',
        validator: this.stringNotEmptyValidator.validate,
        isValid: false,
      },
    ];
  }

  /**
   * Submits the login form and authenticates the user.
   * On success, stores the token and navigates to the dashboard.
   */
  onSubmit() {
    if (!this.isFormValid) {
      return;
    }

    this.buttonActive = false;
    const loginData: LoginModel = {
      email: this.email,
      password: this.password,
      details: {
        location: this.userLocation,
        deviceName: this.deviceInfoService.getDeviceName(),
      },
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.buttonActive = true;
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.errorMessage ?? 'An error occurred';
        this.showError = true;
        this.email = '';
        this.password = '';
        this.buttonActive = true;
      },
    });
  }
}
