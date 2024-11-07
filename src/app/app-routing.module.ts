import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateAuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path:'users', 
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [canActivateAuthGuard]
  },
  {
    path:'dashboard', 
    loadChildren: () => import('./modules/dashboard-container/dashboard-container.module').then(m => m.DashboardContainerModule),
    canActivate: [canActivateAuthGuard]
  },
  {
    path:'login', 
    loadChildren: () => import('./modules/login-container/login-container.module').then(m => m.LoginContainerModule),
  },
  {
    path:'register-loyalty/:pointOfSaleId', 
    loadChildren: () => import('./modules/loyalty-register/loyalty-register.module').then(m => m.LoyaltyRegisterModule),
  },
  {
    path:'point-of-sale', 
    loadChildren: () => import('./modules/point-of-sale/point-of-sale.module').then(m => m.PointOfSaleModule),
    canActivate: [canActivateAuthGuard]
  },
  {
    path:'campaing', 
    loadChildren: () => import('./modules/campaing/campaing.module').then(m => m.CampaingModule),
    canActivate: [canActivateAuthGuard]
  },
  {
    path:'rewards', 
    loadChildren: () => import('./modules/rewards/rewards.module').then(m => m.RewardsModule),
    canActivate: [canActivateAuthGuard]
  },
  {
    path:'**', 
    loadChildren: () => import('./shared-modules/shared-modules.module').then(m => m.SharedModulesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
