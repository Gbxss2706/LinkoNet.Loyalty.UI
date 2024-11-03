import { TypeEvent } from "../../modules/users/enums/type-event";
import { User } from "./user-model";

export interface UserTypeEvent {
    userData: User;
    typeEvent: TypeEvent;
}