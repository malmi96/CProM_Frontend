import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  userTypes: string[];
  constructor(private router: Router) {}
  ngOnInit() {}

  onDataAdded(value: any) {}

  submit(registerForm: NgForm) {
    console.log(registerForm.value);
  }

  viewUser() {
    this.router.navigate(['/viewUser']);
  }
}
