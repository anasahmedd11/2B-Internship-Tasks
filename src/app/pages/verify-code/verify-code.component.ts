import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loader.service';
import { ForgotPasswordService } from '../../core/services/forgot-password.service';
import { VerifyCodeRequest, ResendCodeRequest } from '../../core/Model/auth.models';

declare var bootstrap: any;

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  verifyCodeForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading;
  userEmail: string = ''; // Email stored

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.isLoading = this.loadingService.loading;
    this.verifyCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.verifyCodeForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      
      const code = this.verifyCodeForm.value.code;
      
      if (!code) {
        this.errorMessage = 'Please enter the verification code';
        return;
      }
      
      const request: VerifyCodeRequest = {
        resetCode: code
      };

      this.authService.verifyCode(request).subscribe({
                next: (response) => {
          if (response && response.status === 'Success') {
            this.successMessage = response.message || 'Code verified successfully!';
            // Storing the verification code for the reset password component
            this.forgotPasswordService.setVerificationCode(this.verifyCodeForm.value.code);
            this.verifyCodeForm.reset();
            
            const verifyModal = document.getElementById('verifyCodeModal');
            const resetModal = document.getElementById('resetPasswordModal');
            
            if (verifyModal && resetModal) {
              const bsVerifyModal = bootstrap.Modal.getInstance(verifyModal);
              if (bsVerifyModal) {
                bsVerifyModal.hide();
                setTimeout(() => {
                  const bsResetModal = new bootstrap.Modal(resetModal);
                  bsResetModal.show();
                }, 300);
              }
            }
          } else {
            this.errorMessage = response?.message || 'Invalid verification code';
          }
        },
        error: (error) => {
          console.error('Verify code error:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            error: error.error,
            url: error.url
          });
          
          if (error.status === 400) {
            this.errorMessage = 'Invalid verification code';
          } else if (error.status === 404) {
            this.errorMessage = 'Verification code not found';
          } else if (error.status === 500) {
            this.errorMessage = 'Server error. Please try again later.';
          } else {
            this.errorMessage = 'Failed to verify code. Please try again.';
          }
        }
      });
    }
  }

  resendCode() {
    this.errorMessage = '';
    this.successMessage = '';
    
    const request: ResendCodeRequest = {
      email: this.forgotPasswordService.getEmail()
    };

          this.authService.resendCode(request).subscribe({
        next: (response) => {
          if (response && response.status === 'Success') {
            this.successMessage = response.message || 'Code resent successfully!';
          } else {
            this.errorMessage = response?.message || 'Failed to resend code';
          }
        },
      error: (error) => {
        console.error('Resend code error:', error);
        if (error.status === 404) {
          this.errorMessage = 'Email not found';
        } else {
          this.errorMessage = 'Failed to resend code. Please try again.';
        }
      }
    });
  }

  get code() { return this.verifyCodeForm.get('code'); }
}
