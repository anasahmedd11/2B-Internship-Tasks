import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//* service to manage state, first when user clicks on forgot password,  the email is stored in the service
//* then in verify code component, the email is retrieved from the service
//* if this service is not used, the email must be passed as a URL parameter/ or stored in local storage
export class ForgotPasswordService {
  private emailSubject = new BehaviorSubject<string>('');
  private verificationCodeSubject = new BehaviorSubject<string>('');
  public email$ = this.emailSubject.asObservable();
  public verificationCode$ = this.verificationCodeSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  getEmail(): string {
    return this.emailSubject.value;
  }

  clearEmail() {
    this.emailSubject.next('');
  }

  setVerificationCode(code: string) {
    this.verificationCodeSubject.next(code);
  }

  getVerificationCode(): string {
    return this.verificationCodeSubject.value;
  }

  clearVerificationCode() {
    this.verificationCodeSubject.next('');
  }

  clearAll() {
    this.clearEmail();
    this.clearVerificationCode();
  }
}
