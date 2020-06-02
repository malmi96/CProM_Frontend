import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userTypes: string[];
  isLoading = false;

  constructor(public userService: UserService) {}
  ngOnInit() {
    this.userTypes = ['Customer', 'Employee'];
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
