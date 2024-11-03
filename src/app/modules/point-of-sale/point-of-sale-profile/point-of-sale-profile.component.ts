import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PointOfSaleService } from '../service/point-of-sale.service';
import { PointOfSaleRS } from '../models/point-of-sale-response-model';
import { AssociatePOSTypeEvent } from '../../../shared-modules/enums/asocciate-pos-event.enum';
import html2canvas from 'html2canvas';
import { Banner } from '../models/banner-model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-point-of-sale-profile',
  templateUrl: './point-of-sale-profile.component.html',
  styleUrl: './point-of-sale-profile.component.scss'
})
export class PointOfSaleProfileComponent implements OnInit{

  protected pointOfSale!: PointOfSaleRS;
  isModalOpen = false;
  public qrData: string = '';
  public imgSrc: string = 'assets/img/LinkoNet.jpg';
  public logoSrc: string = '';
  public isAdminRole: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pointOfSaleService: PointOfSaleService,
    private authService: AuthService
  ) {
    
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const pointOfSaleId = params.get('pointOfSaleId');
      if (pointOfSaleId != null) {
        this.internalInit(pointOfSaleId);
      }
    });

    this.authService.isAdminRole().subscribe(isAdminRole => {
      if(isAdminRole){
        this.isAdminRole = isAdminRole;
      }
    });
  }

  private internalInit(pointOfSaleId : string){
    this.pointOfSaleService.getPOSByName(pointOfSaleId).subscribe(
      pos => {
        this.pointOfSale = pos;
        this.qrData = window.location.origin + '/register-loyalty/' + pos.identificationURL
        console.log(this.pointOfSale);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  public getAssociatePOSTypeEvent(){
    return AssociatePOSTypeEvent.AssociatePOSType;
  }

  public exportQrCode() {
    const qrElement = document.getElementById('qr-code');

    if (qrElement) {
      html2canvas(qrElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click(); 
      });
    }
  }

  public getMainImg(){
    if(this.pointOfSale && this.pointOfSale.logo){
      const logoSrc = `data:image/png;base64,${this.pointOfSale.logo.codificationBase64}`;
      this.imgSrc = logoSrc;
      return logoSrc
    }
    return this.logoSrc
  }
}
