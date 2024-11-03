import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { canActivateAdminRole, canActivateAuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path:'', 
    component: UsersComponent,
    canActivate: [canActivateAuthGuard, canActivateAdminRole]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
