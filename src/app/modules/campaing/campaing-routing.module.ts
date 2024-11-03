import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateAuthGuard } from '../../guards/auth.guard';
import { CampaingContainerComponent } from './campaing-container/campaing-container.component';
import { CampaingGeneralComponent } from './campaing-container/campaing-general/campaing-general.component';

const routes: Routes = [
  {
    path: '',
    component: CampaingContainerComponent,
    canActivate: [canActivateAuthGuard]
  },{
    path: 'create',
    component: CampaingGeneralComponent,
    canActivate: [canActivateAuthGuard]
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

export class CampaingRoutingModule { }
