import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../services/user/user.service';
import { Customer } from 'src/app/interfaces/user';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'],
})
export class CustomerRegisterComponent implements OnInit {
  result: any;
  customer: Customer;
  message: boolean;
  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  submit(customerRegister: NgForm) {
    if (
      customerRegister.value.password !== customerRegister.value.confirmPassword
    ) {
      this.message = true;
      return false;
    }
    this.userService
      .addCustomer(
        customerRegister.value.customerName,
        customerRegister.value.email,
        customerRegister.value.nic,
        customerRegister.value.address,
        customerRegister.value.contactNo,
        customerRegister.value.password
      )
      .subscribe((res) => {
        this.result = res;
        setTimeout(() => {
          this.result = false;
        }, 3000);
        customerRegister.resetForm();
      });
  }
}
