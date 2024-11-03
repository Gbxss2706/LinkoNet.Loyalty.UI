import { Component } from '@angular/core';
import { User } from '../../shared-modules/models/user-model';
import { TypeEvent } from './enums/type-event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './services/users.service';
import { UserTypeEvent } from '../../shared-modules/models/user-type-event';
import { UserRole } from './enums/user-rol';
import { UserInfoRs } from '../../shared-modules/models/user-info-rs-model';

@Component({
  selector: 'app-users',
  templateUrl: './templates/users.component.html',
  styleUrl: './styles/users.component.scss'
})
export class UsersComponent {

  public UserForm!: FormGroup;
  isModalOpen = false;
  public users: User[] = [];
  public typeEventData: UserTypeEvent = { userData: { name : '', email: '', role: 0, userId: 0, user: ''}, typeEvent : TypeEvent.Create };
  public touchedOrDirtyFields: Set<string> = new Set<string>();

  public readonly lableValidClassValue: string = "text-green-700 dark:text-green-500";
  public readonly lableInvalidClassValue: string = "text-red-700 dark:text-red-500";
  public readonly inputValidClassValue: string = "border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-green-500";
  public readonly inputInvalidClassValue: string = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  public readonly paragraphValidClassValue: string = "mt-2 text-sm text-green-600 dark:text-green-500";
  public readonly paragraphInvalidClassValue: string = "mt-2 text-sm text-red-600 dark:text-red-500";

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.initForm();
  }

  private initForm(): void {
    const userData = this.typeEventData.userData;
    if (this.typeEventData && this.typeEventData.typeEvent === TypeEvent.Edit && userData) {
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
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        role: ['', Validators.required]
      });
    }
  }

  public createUser(): void {
    if (this.UserForm.valid) {
      const userData = this.getUserData();
      this.usersService.createUser(userData).subscribe((UserRs: UserInfoRs) => {
        if(UserRs){
          window.location.reload();
        }
      });
    }
  }

  public updateUser(): void {
    if (this.UserForm.valid) {
      const userData = this.getUserData();
      this.usersService.updateUser(userData).subscribe((UserRs: UserInfoRs) => {        
          window.location.reload();
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    alert('Usuario creado con éxito');
    this.closeModal();
  }

  public handleUserTypeEvent(userTypeEvent : UserTypeEvent){
    this.typeEventData = userTypeEvent;
    this.initForm();
    this.openModal();
  }

  protected isTouchedOrDirtyField(posField: string): boolean {
    return this.UserForm.get(posField)?.dirty || this.touchedOrDirtyFields.has(posField);
  }

  protected markFieldAsTouchedOrDirty(posField: string): void {
    this.touchedOrDirtyFields.add(posField);
  }

  protected isFieldValid(posField: string): boolean {
    return this.isTouchedOrDirtyField(posField) && this.UserForm.get(posField)!.invalid;
  }
  
}
