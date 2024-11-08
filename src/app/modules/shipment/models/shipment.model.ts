export interface Shipment {
    id?: number;
    trackingNumber: string;
    origin: string;
    destination: string;
    status: ShipmentStatus;
    estimatedDeliveryDate: Date;
    weight: number;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
}

export enum ShipmentStatus {
    PENDING = 'PENDING',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}