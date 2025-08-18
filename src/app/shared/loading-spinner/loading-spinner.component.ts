import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  private loaderService = inject(LoadingService);

  isLoading = this.loaderService.loading;
}
