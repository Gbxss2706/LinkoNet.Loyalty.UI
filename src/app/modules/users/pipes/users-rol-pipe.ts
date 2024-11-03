import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../enums/user-rol';

@Pipe({
  name: 'userRol'
})
export class UsersRolPipe implements PipeTransform {
  transform(value: UserRole): string {
    switch (value) {
      case UserRole.Usuario:
        return 'Usuario';
      case UserRole.Admin:
        return 'Admin';
      default:
        return '';
    }
  }
}
