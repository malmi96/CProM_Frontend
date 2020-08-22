import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-mini-card-customers',
  templateUrl: './mini-card-customers.component.html',
  styleUrls: ['./mini-card-customers.component.css']
})
export class MiniCardCustomersComponent implements OnInit {
  customers: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCustomer().subscribe(res => {
      this.customers = res;
    });
  }

}
