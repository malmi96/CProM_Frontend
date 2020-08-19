import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  user: string;
  userType: string;
  customer: any;
  userId: string;
  test: any;
  private authListenerSubs: Subscription;
  private userSubs: Subscription;
  constructor(private authService: UserService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getIsUserType();
    this.userId = this.authService.getUserId();
    if (this.user === 'Customer') {
      this.authService.getCustomerById(this.userId).subscribe((res: any) => {
        this.customer = res;
      });
    }
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.user = this.authService.getIsUserType();
        if (this.user === 'Customer') {
          this.authService
            .getCustomerById(this.userId)
            .subscribe((res: any) => {
              this.customer = res;
            });
        }
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
