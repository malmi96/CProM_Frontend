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
    console.log(userType);
    if (userType !== 'Project Manager') {
      if (userType === 'Customer'){
        this.router.navigate(['/customerDashboard']);
      }
      else if (userType === 'Inventory Manager'){
        this.router.navigate(['/inventoryDashboard']);
      }
      else if (userType === 'Sales and Marketing Manager'){
        this.router.navigate(['/salesDashboard']);
      }
      else if (userType === 'Finance Manager'){
        this. router.navigate(['/financeDashboard']);
      }
    }
    return true;
  }
}
