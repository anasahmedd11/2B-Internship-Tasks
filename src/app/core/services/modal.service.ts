import { Injectable, input } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  constructor() { }

  //* document.querySelectorAll('.modal-backdrop') finds ALL elements with class "modal-backdrop"   
  private removeAllBackdrops(): void {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => {
      backdrop.remove();
    });
    
    // and delete it from the body
    document.body.classList.remove('modal-open');
    
    // Possibly, reset any body styles that might be set by Bootstrap like padding, overflow, etc.
  }

  //* pass ID of modal that has to be shown
  //* removeBackdrop is passed to determine whether to remove existing backdrops before showing modal (default: true)
  showModal(modalId: string, removeBackdrop: boolean = true): void {
    //* If condition is true, then clean up old backdrops first
    if (removeBackdrop) {
      this.removeAllBackdrops();
    }

    //* then find the modal element that has to be shown by its ID then create it
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  //* pass ID of modal that has to be hidden
  hideModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      //* then find the modal element that has to be hidden by its ID 
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    
    // Remove any remaining backdrops
    setTimeout(() => {
      this.removeAllBackdrops();
    }, 150);
  }

  //* pass ID of modal that has to be closed, modal that has to be shown, and delay between hiding and showing
  switchModal(fromModalId: string, toModalId: string, delay: number = 300): void {
    this.hideModal(fromModalId);
    
    setTimeout(() => {
      this.showModal(toModalId);
    }, delay);
  }

  //* add event listener to listen for clicks outside the modal content
  //* The outer modal div (modalElement) covers the entire screen including the dark backdrop area.
  //* If you click on the backdrop → You're clicking directly on the outer div
  //* If you click on content → You're clicking on child elements inside the outer div
  //* The condition event.target === modalElement is checking if the click is directly on the outermost modal container (which means the backdrop)
  addClickOutsideListener(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.addEventListener('click', (event) => {
        //* event.target = the exact element that was clicked
        //* If you click on the backdrop area → event.target = the outer modal div --> TRUE
        //* If you click on the modal content → event.target = some inner element (like input, button, etc.) --> FALSE
        if (event.target === modalElement) {
          this.hideModal(modalId);
        }
      });
    }
  }

  initializeModal(modalId: string): void {
    this.addClickOutsideListener(modalId);
  }

  /**
   * Closes all modals and cleans up all modal states
   * Useful for logout or when you need to ensure a clean slate
   */
  //* close all modals and clean up all modal states (useful for logout)
  closeAllModals(): void {
    // Hide all known modals
    const modalIds = ['loginModal', 'signupModal', 'forgotPasswordModal', 'verifyCodeModal', 'resetPasswordModal'];
    modalIds.forEach(modalId => {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    });
    this.removeAllBackdrops();
  }
}
