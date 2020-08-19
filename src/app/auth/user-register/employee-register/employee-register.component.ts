import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css'],
})
export class EmployeeRegisterComponent implements OnInit {
  result: any;
  message: boolean;
  designations: string[] = [
    'Finance Manager',
    'Inventory Manager',
    'Sales and Marketing Manager',
  ];

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  submit(employeeRegister: NgForm) {
    if (
      employeeRegister.value.password !== employeeRegister.value.confirmPassword
    ) {
      this.message = true;
      return false;
    }
    console.log(employeeRegister.value);
    this.userService
      .addEmployee(
        employeeRegister.value.employeeName,
        employeeRegister.value.email,
        employeeRegister.value.nic,
        employeeRegister.value.address,
        employeeRegister.value.contactNo,
        employeeRegister.value.password,
        employeeRegister.value.designation
      )
      .subscribe((res) => {
        this.result = res;
        setTimeout(() => {
          this.result = false;
        }, 3000);
        employeeRegister.resetForm();
      });
  }
}
