import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePosComponent } from './create-pos/create-pos.component';
import { PointOfSaleService } from './service/point-of-sale.service';
import { ConfigOptionsPOS } from './models/config-options-point-of-sale-model';
import { PointOfSaleRS } from './models/point-of-sale-response-model';
import { DialogAssociateUserComponent } from './dialogs/dialog-associate-user/dialog-associate-user.component';
import { Router } from '@angular/router';
import { Banner } from './models/banner-model';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrl: './point-of-sale.component.scss'
})

export class PointOfSaleComponent implements OnInit {

  @ViewChild('createPosComponent') createPosComponent: CreatePosComponent;
  public pointOfSaleRS: PointOfSaleRS[] = [];
  public srcImg = "assets/img/tr.jpg";
  public isAdminRole: boolean = false;

  constructor(public dialog: MatDialog, public pointOfSaleService: PointOfSaleService, private router: Router,  private authService: AuthService) {
    this.createPosComponent = new CreatePosComponent(dialog);
  }

  public ngOnInit(): void {
    const configOptionsPOS: ConfigOptionsPOS = {
      getBusinessRules: true,
      getMultimedia: true
    }
    this.authService.isAdminRole().subscribe(isAdminRole => {
      if(isAdminRole){
        this.getAllPOS(configOptionsPOS);
        this.isAdminRole = true;
      }else{
        const posId = sessionStorage.getItem("userPointOfSale");
        this.getPOSById(configOptionsPOS, posId ? posId : "");
      }
    });
    

  }

  public createPOS(): void {
    this.router.navigate(['/point-of-sale/create-pos']);
  }

  public getAllPOS(configOptionsPOS: ConfigOptionsPOS): void {
    this.pointOfSaleService.getAllPOS(configOptionsPOS).subscribe(pos => {
      this.pointOfSaleRS = pos;
    });
  }

  public getPOSById(configOptionsPOS: ConfigOptionsPOS, posId: string): void {
    this.pointOfSaleService.getPOSById(configOptionsPOS, posId).subscribe(pos => {
      this.pointOfSaleRS.push(pos);
    });
  }

  public associatePOS(pointOfSaleId: number): void {
    setTimeout(() => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '50%';
      dialogConfig.data =  pointOfSaleId ;
      this.dialog.open(DialogAssociateUserComponent, dialogConfig);
    }, 500); 
  }

  public getMainImg(banners : Banner[]){
    if(banners.length > 0){
      return `data:image/png;base64,${banners[0].multimedia.codificationBase64}`;
    }
    return this.srcImg
  }
  
}
