import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../../services/users.service';
import { UserInfoRs } from '../../../../shared-modules/models/user-info-rs-model';
import { UserRole } from '../../enums/user-rol';
import { UserTypeEvent } from '../../../../shared-modules/models/user-type-event';
import { TypeEvent } from '../../enums/type-event';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, FlexLayoutModule, MatSelectModule, FlexLayoutModule],
})
export class UserDialogComponent {

  public UserForm!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, @Inject(MAT_DIALOG_DATA) public typeEventData: UserTypeEvent) {
    this.initForm();
  }

  private initForm(): void {
    const userData = this.typeEventData.userData;
    if (this.typeEventData.typeEvent === TypeEvent.Edit && userData) {
      this.UserForm = this.fb.group({
        user: [userData.user, Validators.required],
        password: [''],
        email: [userData.email, [Validators.required]],
        name: [userData.name, Validators.required],
        role: [userData.role == 0 ? 'admin' : 'user', Validators.required]
      });
      this.UserForm.get('email')!.disable();
    } else {
      this.UserForm = this.fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        name: ['', Validators.required],
        role: ['', Validators.required]
      });
    }
  }

  public createUser(): void {
    if (this.UserForm.valid) {
      const userData = this.getUserData();
      this.usersService.createUser(userData).subscribe((UserRs: UserInfoRs) => {
        console.log(UserRs);
      });
    }
  }

  public updateUser(): void {
    if (this.UserForm.valid) {
      const userData = this.getUserData();
      this.usersService.updateUser(userData).subscribe((UserRs: UserInfoRs) => {
        console.log(UserRs);
      });
    }
  }

  public isEditTypeEvent(): boolean {
    return this.typeEventData.typeEvent == TypeEvent.Edit;
  }

  private getRoleData(): UserRole {
    let roleValue: number;
    if (this.UserForm.value.role === 'admin') {
      return roleValue = UserRole.Admin;
    }
    return roleValue = UserRole.Usuario;
  }

  private getUserData(){
    return {
      user: this.UserForm.value.user,
      password: this.UserForm.value.password,
      email: this.UserForm.get('email')!.value,
      name: this.UserForm.value.name,
      role: this.getRoleData()
    };
  }

}
