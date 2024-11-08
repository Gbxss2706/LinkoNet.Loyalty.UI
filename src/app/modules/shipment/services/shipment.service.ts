import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'api/shipments'; // Ajusta esto según tu API

  constructor(private http: HttpClient) { }

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  getShipmentById(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  createShipment(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, shipment);
  }

  updateShipment(id: number, shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/${id}`, shipment);
  }

  deleteShipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  trackShipment(trackingNumber: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/track/${trackingNumber}`);
  }
}