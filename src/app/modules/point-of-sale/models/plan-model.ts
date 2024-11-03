export interface Plan {
    name: string;
    description: string;
    maxQuantityClientsGlobal: number;
    maxQuantityClientsByMonth: number;
    maxQuantityCampaignsGlobal: number;
    maxQuantityCampaignsByMonth: number;
    price: string
}

export interface PlanResponse {
    plans: Plan[];
}
