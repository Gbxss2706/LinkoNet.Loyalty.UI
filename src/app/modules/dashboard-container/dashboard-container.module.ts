import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './dashboard-container.component';
import { dashboardRoutingModule } from './dashboard-routing.module';
import { SharedModulesModule } from '../../shared-modules/shared-modules.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarModule } from '../navbar/navbar.module';
import { RecentUsersModule } from '../recent-users/recent-users.module';
import { UserChartComponent } from './components/user-chart/user-chart.component';
import { PosChartComponent } from './components/pos-chart/pos-chart.component';
import { RegistersChartComponent } from './components/registers-chart/registers-chart.component';
import { RecentClientsComponent } from './components/recent-clients/recent-clients.component';
import { AuxChartComponent } from './components/aux-chart/aux-chart.component';

@NgModule({
  declarations: [
    DashboardContainerComponent,
    UserChartComponent,
    PosChartComponent,
    RegistersChartComponent,
    RecentClientsComponent,
    AuxChartComponent
  ],
  imports: [
    CommonModule,
    dashboardRoutingModule,
    SharedModulesModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    NavbarModule,
    RecentUsersModule
  ]
})
export class DashboardContainerModule { }
