import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  id: string;
  customer: Customer;
  message: boolean;
  msg: any;
  result = false;
  changePassword = false;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getCustomerById(this.id).subscribe((customer: any) => {
      return (this.customer = customer);
    });
  }

  onUpdate(customerUpdate: NgForm) {
    if (
      customerUpdate.value.password !== customerUpdate.value.confirmPassword
    ) {
      this.message = true;
      return false;
    }
    console.log(customerUpdate.value);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService
      .updateCustomer(this.id, customerUpdate.value)
      .subscribe((res) => {
        res = this.router.navigate(['/viewUser/viewCustomer']);
      });
  }

  onChangePassword() {
    this.changePassword = true;
  }

  onDelete() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.deleteCustomer(this.id).subscribe((res) => {
      this.msg = res;
      console.log(this.msg);
      if (this.msg === null ){
        this.router.navigate(['/viewUser/viewCustomer']);
      }
      return this.result = true;
    });
  }
}
