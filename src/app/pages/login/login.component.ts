import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/Model/auth.models';
import { LoadingService } from '../../core/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() switchToSignup = new EventEmitter<void>();
  
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.isLoading = this.loadingService.loading;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  openSignupModal() {
    this.switchToSignup.emit();
  }

  onSubmit(form:FormGroup) {
    
    if (form.valid) {
      this.errorMessage = '';
      const credentials: LoginRequest = {
        email: form.value.email,
        password: form.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.token) {
            this.successMessage = 'Login successful!';
            this.loginForm.reset();
            this.errorMessage = '';
            
            // Close modal and refresh page after a delay
            setTimeout(() => {
              let loginPopup: HTMLDivElement | any = document.querySelector('#loginModal');
              loginPopup.classList.add('hide');
              loginPopup.classList.remove('show');
              
              // Refresh the page to remove any lingering backdrop shadows
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }, 1000);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          if (error.status === 404) {
            this.errorMessage = 'Login endpoint not found. Please check API configuration.';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid email or password.';
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
          this.loginForm.reset();
        }
      });
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }
}