import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared-modules/services/loader-service/loader-service';

@Component({
  selector: 'app-login-container',
  templateUrl: './templates/login-container.component.html',
  styleUrl: './styles/login-container.component.scss'
})
export class LoginContainerComponent implements OnInit{
  constructor(private loaderService: LoaderService){
    this.loaderService.show();
  }

  ngOnInit(): void {}
}
