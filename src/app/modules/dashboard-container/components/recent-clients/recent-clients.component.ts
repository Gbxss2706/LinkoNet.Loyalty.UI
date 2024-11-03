import { Component } from '@angular/core';
import { Client } from '../../../../shared-modules/models/client-model';
import { RecentClientService } from '../../../../shared-modules/services/recent-user/recent-client.service';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-recent-clients',
  templateUrl: './recent-clients.component.html',
  styleUrl: './recent-clients.component.scss'
})
export class RecentClientsComponent {
  public clients: Client[] = [];

  constructor(private clientService: RecentClientService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAdminRole().subscribe(isAdminRole => {
      if(isAdminRole){
        this.getAllClients();
      }else{
        this.getClientsByPos();
      }
    });
  }

  private getAllClients(): void {
    this.clientService.getAllClients().subscribe(clientsResponse => {
      this.clients = clientsResponse;
    });
  }
  
  private getClientsByPos(): void {
    const posID = sessionStorage.getItem("userPointOfSale");
    this.clientService.getClientsByPos(posID ? posID : "").subscribe(clientsResponse => {
      this.clients = clientsResponse;
    });
  }
}
