import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loader.service';
import { ForgotPasswordService } from '../../core/services/forgot-password.service';
import { ResetPasswordRequest } from '../../core/Model/auth.models';
import { confirmPasswordValidator } from '../../core/CustomValidations/passwordConfirmation';

declare var bootstrap: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.isLoading = this.loadingService.loading;
    
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required]]
    }, { validators: confirmPasswordValidator });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      
      const email = this.forgotPasswordService.getEmail();
      
      if (!email) {
        this.errorMessage = 'Email not found. Please try the forgot password flow again.';
        return;
      }
      
      const request: ResetPasswordRequest = {
        email: email,
        newPassword: this.resetPasswordForm.value.password
      };

      this.authService.resetPassword(request).subscribe({
        next: (response) => {
          if (response) {
            this.successMessage = response.message || 'Password reset successfully!';
            this.resetPasswordForm.reset();
            this.forgotPasswordService.clearEmail();
            
            setTimeout(() => {
              let resetPasswordPopup: HTMLDivElement | any = document.querySelector('#resetPasswordModal');
              resetPasswordPopup.classList.add('hide');
              resetPasswordPopup.classList.remove('show');
              
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }, 1000);
          } else {
            this.errorMessage = 'Failed to reset password';
          }
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Invalid request. Please check your input.';
          } else if (error.status === 404) {
            this.errorMessage = 'Reset code not found or expired';
          } else {
            this.errorMessage = 'Failed to reset password. Please try again.';
          }
        }
      });
    }
  }

  get password() { return this.resetPasswordForm.get('password'); }
  get rePassword() { return this.resetPasswordForm.get('rePassword'); }

}
