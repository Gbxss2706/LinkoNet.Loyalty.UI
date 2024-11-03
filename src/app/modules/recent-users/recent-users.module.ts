import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentUsersComponent } from './recent-users.component';
import { UsersService } from '../users/services/users.service';



@NgModule({
  declarations: [
    RecentUsersComponent
  ],
  imports: [
    CommonModule
  ], 
  exports:[
    RecentUsersComponent
  ],
  providers:[
    UsersService
  ]
})
export class RecentUsersModule { }
