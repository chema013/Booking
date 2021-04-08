import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    RESIDENT = 'RESIDENT',
    ADMIN = 'ADMIN'
}

export enum AppResources {
    ADMIN = 'UserAdmin',
    RESIDENT = 'UserResident',
    RESERVATION = 'Reservation',
    ZONES = 'CommonZones',
    DEPARTMENT = 'Department'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    // resident roles
    .grant(AppRoles.RESIDENT)
    .updateOwn([AppResources.RESIDENT])
    .deleteOwn([AppResources.RESIDENT])
    .createOwn([AppResources.RESIDENT])
    .updateAny([AppResources.RESERVATION])
    .createAny([AppResources.RESERVATION])
    .deleteAny([AppResources.RESERVATION])
    // admin roles
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.RESIDENT)
    .createOwn([AppResources.DEPARTMENT, AppResources.RESERVATION, AppResources.RESIDENT, AppResources.ZONES, AppResources.ADMIN])
    .updateOwn([AppResources.DEPARTMENT, AppResources.RESERVATION, AppResources.RESIDENT, AppResources.ZONES, AppResources.ADMIN])
    .deleteOwn([AppResources.DEPARTMENT, AppResources.RESERVATION, AppResources.RESIDENT, AppResources.ZONES, AppResources.ADMIN]);