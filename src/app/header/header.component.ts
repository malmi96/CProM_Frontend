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
  private authListenerSubs: Subscription;
  private userSubs: Subscription;
  constructor(private authService: UserService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getIsUserType();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
        if (this.userAuthenticated === true) {
          this.userSubs = this.authService
            .getUserListener()
            .subscribe((userType: string) => {
              this.user = userType;
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
