import { ChannelEnum } from "../../../shared-modules/enums/channel.enum";

export interface Campaing {
    name: string;
    enumCanal: ChannelEnum;
    description: string;
    startDate: Date;
    endDate: Date;
    status: number;
    additionalData: string;
    additionalData2: string;
    additionalData3: string;
    additionalData4: string;
    additionalData5: string;
    additionalData6: string;
    additionalData7: string;
    additionalData8: string;
    additionalData9: string;
    additionalData10: string;
    pointOfSaleId: number;
}