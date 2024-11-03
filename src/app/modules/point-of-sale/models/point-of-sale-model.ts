import { Banner } from "./banner-model";
import { BusinessRules } from "./business-rules-model";
import { Logo } from "./logo-model";

export interface PointOfSale {
    name: string;
    nit: string;
    logo: Logo;
    address: string;
    telephone: string;
    email: string;
    description: string;
    schedule: string;
    state: boolean;
    businessRules: BusinessRules;
    identificationURL: string;
    codeQR: string;
    landingPageURL: string;
    banners: Banner[];
    globalEmailCampaign: string;
    globalEmailCampaignPassword: string;
}
