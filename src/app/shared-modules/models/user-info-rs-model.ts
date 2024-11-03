import { UserInfo } from "./user-info-model";

export interface UserInfoRs extends UserInfo{
    userId: number,
    pointOfSales: any;
}