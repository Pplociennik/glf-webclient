import { Component, Input, OnInit } from '@angular/core';
import { InputRequirementTooltipComponent } from '../../../../../shared/components/input-requirement-tooltip-component/input-requirement-tooltip.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { InputRequirementModel } from '../../../../../shared/models/input-requirement-model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordInputValidator } from '../../../../../services/features/auth/validation/registration.component/password-input-validator';
import { StringNotEmptyValidatorService } from '../../../../../services/features/auth/validation/common/string-not-empty-validator/string-not-empty-validator.service';
import { PasswordChangeRequestMomdel as PasswordChangeRequestModel } from '../../../../../shared/models/accounts/change-password-request.model';
import { AccountsService } from '../../../../../services/features/accounts/accounts-service';
import { AlertService } from '../../../../../services/gui/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [InputRequirementTooltipComponent, TranslocoModule, FormsModule],
})
export class ChangePasswordComponent implements OnInit {
  @Input() currentPassword!: string;
  @Input() newPassword!: string;
  @Input() confirmNewPassword!: string;

  showCurrentPassword: boolean = false;
  showCurrentPasswordTooltip: boolean = false;

  showNewPassword: boolean = false;
  showNewPasswordTooltip: boolean = false;

  showConfirmNewPassword: boolean = false;
  showConfirmNewPasswordTooltip: boolean = false;

  currentPasswordRequirements: InputRequirementModel[] = [];
  newPasswordRequirements: InputRequirementModel[] = [];
  confirmNewPasswordRequirements!: InputRequirementModel[];

  isCurrentPasswordValid: boolean = false;
  isNewPasswordValid: boolean = false;
  isConfirmNewPasswordValid: boolean = false;
  isFormValid: boolean = false;
  loading: boolean = false;

  constructor(
    private passwordInputValidator: PasswordInputValidator,
    private stringNotEmptyValidator: StringNotEmptyValidatorService,
    private accountsService: AccountsService,
    private alertService: AlertService,
    private translocoService: TranslocoService,
  ) {
    this.initializeRequirements();
  }

  ngOnInit() {}

  onConfirmNewPasswordValidityChange(isValid: boolean) {
    this.isConfirmNewPasswordValid = isValid;
    this.updateFormValidity();
  }

  toggleConfirmNewPasswordVisibility() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
  }

  onNewPasswordValidityChange(isValid: boolean) {
    this.isNewPasswordValid = isValid;
    this.updateFormValidity();
  }

  togglePasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  onCurrentPasswordValidityChange(isValid: boolean) {
    this.isCurrentPasswordValid = isValid;
    this.updateFormValidity();
  }

  /**
   * Initializes validation requirements for all form fields.
   * Sets up validators with translation keys for requirement descriptions.
   */
  private initializeRequirements() {
    this.currentPasswordRequirements = [
      {
        description: 'accountManagement.accountSecurity.changePassword.currentPassword.requirement',
        validator: this.stringNotEmptyValidator.validate,
        isValid: false,
      },
    ];

    this.newPasswordRequirements = [
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
      {
        description:
          'accountManagement.accountSecurity.changePassword.newPassword.requirements.differentThatCurrent',
        validator: (newPassword: string) => this.currentPassword != newPassword,
        isValid: this.currentPassword != this.newPassword,
      },
    ];

    this.confirmNewPasswordRequirements = [
      {
        description: 'registrationRequirements.confirmPassword.match',
        validator: (confirmPassword: string) => this.newPassword === confirmPassword,
        isValid: this.newPassword === this.confirmNewPassword,
      },
    ];
  }

  /**
   * Updates overall form validity based on all field validations.
   */
  private updateFormValidity() {
    this.isFormValid =
      this.isCurrentPasswordValid &&
      this.isNewPasswordValid &&
      this.confirmNewPassword !== null &&
      this.confirmNewPassword !== '' &&
      this.isConfirmNewPasswordValid;
  }

  onButtonClick() {
    const requestData: PasswordChangeRequestModel = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmation: this.confirmNewPassword,
    };

    this.accountsService.changePassword(requestData).subscribe({
      next: (req) => {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';

        this.alertService.openSuccessAlert(
          this.translocoService.translate(
            'accountManagement.accountSecurity.changePassword.alerts.success',
          ),
        );
      },
      error: (err) => {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';

        this.alertService.openErrorAlert('Error');
      },
    });
  }
}
