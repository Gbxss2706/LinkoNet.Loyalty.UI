import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCreatePosComponent } from '../dialogs/dialog-create-pos/dialog-create-pos.component';

@Component({
  selector: 'app-create-pos',
  templateUrl: './create-pos.component.html',
  styleUrl: './create-pos.component.scss'
})
export class CreatePosComponent {

  constructor(public dialog: MatDialog) {}

  createPOS() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(DialogCreatePosComponent, {width: '65%'});
  }

}
