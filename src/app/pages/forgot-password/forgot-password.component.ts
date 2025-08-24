import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ForgotPasswordRequest } from '../../core/Model/auth.models';
import { LoadingService } from '../../core/services/loader.service';
import { ForgotPasswordService } from '../../core/services/forgot-password.service';
declare var bootstrap: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  private forgotPasswordModal: any;
  private verifyCodeModal: any;
  forgotPasswordForm: FormGroup;
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
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
    this.verifyCodeModal = new bootstrap.Modal(document.getElementById('verifyCodeModal'));
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      
      const request: ForgotPasswordRequest = {
        email: this.forgotPasswordForm.value.email
      };

      this.authService.forgotPassword(request).subscribe({
        next: (response: any) => {
          if (response) {
            this.successMessage = response.message;
            this.forgotPasswordService.setEmail(this.forgotPasswordForm.value.email);
            this.forgotPasswordForm.reset();
            
            // Close forgot password modal and open verify code modal
            const forgotModal = document.getElementById('forgotPasswordModal');
            const verifyModal = document.getElementById('verifyCodeModal');
            
            if (forgotModal && verifyModal) {
              const bsForgotModal = bootstrap.Modal.getInstance(forgotModal);
              if (bsForgotModal) {
                bsForgotModal.hide();
                setTimeout(() => {
                  const bsVerifyModal = new bootstrap.Modal(verifyModal);
                  bsVerifyModal.show();
                }, 300);
              }
            }
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          console.log('Error details:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else if (error.message) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'Failed to send reset email. Please try again.';
          }
          console.error('Forgot password error:', this.errorMessage);
        }
      });
    }
  }
  
  get email() { return this.forgotPasswordForm.get('email'); }

}