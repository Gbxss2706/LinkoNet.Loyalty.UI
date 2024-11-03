import { Component, Input } from '@angular/core';
import { ErrorService } from '../../services/error-service/error-service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  showDialog = false;

  @Input()
  errorMessage: string = "Un error ha ocurrido"
  
  constructor(private errorService: ErrorService) {
    this.errorService.hasError.subscribe((x) => {
      this.showDialog = x;
    });
  }

  public closeDialog(){
    this.errorService.triggerHasNoError();
    this.showDialog = false;
  }
}
