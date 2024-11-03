import { Component } from '@angular/core';
import { LoaderService } from '../loader-service/loader-service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  public isLoading: boolean = false;
  public progress: number = 0;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.isLoading = v;
    });
  }
}
