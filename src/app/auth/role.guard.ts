import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const userType = this.authService.getIsUserType();
    if (userType !== 'Project Manager') {
      this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
