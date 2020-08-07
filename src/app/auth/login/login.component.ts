import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from 'src/app/dialogs/info/info-dialog/info-dialog.component';
import { InquiryComponent } from 'src/app/dialogs/inquiry/inquiry.component';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userTypes: string[];
  isLoading = false;

  constructor(public userService: UserService, public dialog: MatDialog) {}
  ngOnInit() {
    this.userTypes = ['Customer', 'Employee'];
  }

  openInfo(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Forgot Your Password??',
        // tslint:disable-next-line: max-line-length
        info: 'Please contact Admin or Sales Manager',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onDialog() {
    const dialogRef = this.dialog.open(InquiryComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  submit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.login(
      loginForm.value.email,
      loginForm.value.password,
      loginForm.value.userType
    );
  }
}
