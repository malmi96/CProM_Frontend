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
    console.log(customerRegister.value);
    this.userService.addCustomer(
      customerRegister.value.customerName,
      customerRegister.value.email,
      customerRegister.value.nic,
      customerRegister.value.address,
      customerRegister.value.contactNo,
      customerRegister.value.password
    );
  }
}
