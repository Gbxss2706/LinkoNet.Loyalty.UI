import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaingService } from '../services/campaing.service';
import { CampaingRS } from '../models/campaing-rs.model';
import { ChannelEnum } from '../../../shared-modules/enums/channel.enum';

@Component({
  selector: 'app-campaing-container',
  templateUrl: './campaing-container.component.html',
  styleUrl: './campaing-container.component.scss'
})
export class CampaingContainerComponent implements OnInit{

  public campaingsArray: CampaingRS[] = [];

  public constructor(public router: Router, private campaingService: CampaingService){

  }
  ngOnInit(): void {
    this.internalInit();
  }

  private internalInit(): void{
    const userPointOfSale = this.getUserPointOfSale();
    if(userPointOfSale){
      const userPointOfSaleArray = userPointOfSale.split(',').map(pos => pos.trim());
      userPointOfSaleArray.forEach(posId => {
        this.campaingService.getCampaingById(Number(posId)).subscribe((campaigns : CampaingRS[])=> {
          campaigns.forEach(campaign => {
            this.campaingsArray.push(campaign);
          });
        });
      });
    }else{
      this.campaingService.getAllCampaings().subscribe((campaigns : CampaingRS[])=> {
        campaigns.forEach(campaign => {
          this.campaingsArray.push(campaign);
        });
      });
    }
  }

  public createModal(){
    this.router.navigate(['/campaing/create']);
  }

  protected getUserPointOfSale(): string | null{
    return sessionStorage.getItem("userPointOfSale");
  }

  public activateCampaign(campaignId : number){
    this.campaingService.activateCampaign(campaignId).subscribe(campaignRS => {
    });
  }
}
