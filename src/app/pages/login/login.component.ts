import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/Model/auth.models';
import { LoadingService } from '../../core/services/loader.service';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: ModalService
  ) {
    this.isLoading = this.loadingService.loading;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    this.modalService.initializeModal('loginModal');
  }

  onSwitchToForgotPassword(event: Event) {
    //* prevent browser from following the href in anchor tag which can change URL
    event.preventDefault();
    this.modalService.switchModal('loginModal', 'forgotPasswordModal');
  }

  onSwitchToSignup(event: Event) {
    event.preventDefault();
    this.modalService.switchModal('loginModal', 'signupModal');
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
            
            setTimeout(() => {
              this.modalService.closeAllModals();
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