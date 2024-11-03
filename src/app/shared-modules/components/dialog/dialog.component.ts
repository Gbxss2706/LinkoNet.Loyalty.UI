import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  @Input() contentTemplate!: TemplateRef<any>;

}
