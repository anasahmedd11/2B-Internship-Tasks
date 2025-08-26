import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SignupRequest } from '../../core/Model/auth.models';
import { LoadingService } from '../../core/services/loader.service';
import { confirmPasswordValidator } from '../../core/CustomValidations/passwordConfirmation';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
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
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', [Validators.required]], // Default to male, hidden from user
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required]]
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.modalService.initializeModal('signupModal');
  }

  onSwitchToLogin(event: Event) {
    event.preventDefault();
    this.modalService.switchModal('signupModal', 'loginModal');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.errorMessage = '';
      const userData: SignupRequest = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        gender: this.signupForm.value.gender,
        phone: this.signupForm.value.phone,
        password: this.signupForm.value.password,
        rePassword: this.signupForm.value.rePassword
      };

      this.authService.signup(userData).subscribe({
        next: (response) => {
          if (response.token) {
            this.successMessage = 'Account created successfully!';
            this.signupForm.reset();
            this.errorMessage = '';
            
            setTimeout(() => {
              this.modalService.closeAllModals();
            }, 1000);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Signup failed. Please try again.';
          this.signupForm.reset();
        }
      });
    }
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get gender() { return this.signupForm.get('gender'); }
  get phone() { return this.signupForm.get('phone'); }
  get password() { return this.signupForm.get('password'); }
  get rePassword() { return this.signupForm.get('rePassword'); }
}