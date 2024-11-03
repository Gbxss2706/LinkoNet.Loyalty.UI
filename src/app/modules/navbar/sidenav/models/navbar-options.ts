import { RolEnum } from "../../../../shared-modules/enums/rol.enum"

export interface NavbarConfiguration{
    shouldShowNavbarAlertNotification: boolean,
    navbarOptions: NavbarOptions[]
}

export interface NavbarOptions{
    title: string, 
    pathIcon: string, 
    url: string, 
    allowedUsers: RolEnum[]
}