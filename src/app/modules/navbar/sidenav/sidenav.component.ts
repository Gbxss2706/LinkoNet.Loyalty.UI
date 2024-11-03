import { Component, OnInit } from '@angular/core';
import { generalConfig } from '../../../../enviroment/ui-config/general-config';
import { NavbarConfiguration, NavbarOptions } from './models/navbar-options';
import { RolEnum } from '../../../shared-modules/enums/rol.enum';
import { AuthService } from '../../../core/auth/auth.service';
import { JwtAuth } from '../../../core/model/jwt-auth.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './templates/sidenav.component.html',
  styleUrl: './styles/sidenav.component.scss'
})
export class SidenavComponent implements OnInit{
  public navbarConfiguration!: NavbarConfiguration;
  public filteredNavbarConfiguration!: NavbarOptions[];


  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router){

  }
  
  ngOnInit(): void {
   this.internalInit();
  }

  private internalInit(){
    this.navbarConfiguration = generalConfig.navbarConfiguration as NavbarConfiguration;
    this.filterNavbarConfigurationByRole();
  }

  private filterNavbarConfigurationByRole(): void {
    this.authService.isAdminRole().subscribe(isAdminRole => {
      if (isAdminRole) {
        this.filteredNavbarConfiguration = this.navbarConfiguration.navbarOptions.filter(option => 
          option.allowedUsers.includes(RolEnum.ADMIN_ROL)
        );
      } else {
        this.filteredNavbarConfiguration = this.navbarConfiguration.navbarOptions.filter(option => 
          option.allowedUsers.includes(RolEnum.USER_ROL)
        );
      }
    });
  }
  

  public handleMenuClick(): void{
   
  }

  public handleLogout(): void{
   this.cookieService.deleteAll();
   sessionStorage.removeItem("userPointOfSale");
  }
}
