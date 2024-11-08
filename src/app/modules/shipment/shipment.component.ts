import { Component } from '@angular/core';
import { Shipment, ShipmentStatus } from './models/shipment.model';
import { ShipmentService } from './services/shipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  shipmentForm: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;
  isEditMode = false;
  shipmentStatuses = Object.values(ShipmentStatus);

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.shipmentForm = this.createForm();
  }

  ngOnInit(): void {
    const shipmentId = this.route.snapshot.params['id'];
    if (shipmentId) {
      this.isEditMode = true;
      this.loadShipment(shipmentId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.minLength(6)]],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      status: [ShipmentStatus.PENDING, Validators.required],
      estimatedDeliveryDate: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0.1)]],
      customer: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      })
    });
  }

  loadShipment(id: number): void {
    this.loading = true;
    this.shipmentService.getShipmentById(id).subscribe({
      next: (shipment) => {
        this.shipmentForm.patchValue(shipment);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el envío';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.shipmentForm.invalid) {
      return;
    }

    this.loading = true;
    const shipment: Shipment = this.shipmentForm.value;
    
    const request = this.isEditMode
      ? this.shipmentService.updateShipment(this.route.snapshot.params['id'], shipment)
      : this.shipmentService.createShipment(shipment);

    request.subscribe({
      next: () => {
        this.router.navigate(['/shipments']);
      },
      error: (error) => {
        this.error = 'Error al guardar el envío';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  // Helpers para las validaciones en la plantilla
  get f() { return this.shipmentForm.controls; }
  get c() { return (this.f['customer'] as FormGroup).controls; }
}
