import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardContainerComponent } from "./dashboard-container.component";
import { canActivateAuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
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
export class dashboardRoutingModule { }