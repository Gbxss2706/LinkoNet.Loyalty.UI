import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { UsersModule } from '../../../users/users.module';
import { AssociatePOSTypeEvent } from '../../../../shared-modules/enums/asocciate-pos-event.enum';

@Component({
  selector: 'app-dialog-associate-user',
  templateUrl: './dialog-associate-user.component.html',
  styleUrl: './dialog-associate-user.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, CommonModule, FlexLayoutModule, UsersModule],
})
export class DialogAssociateUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public pointOfSaleId: number) {

  }

  public getAssociatePOSTypeEvent(){
    return AssociatePOSTypeEvent.AssociatePOSType;
  }

}
//