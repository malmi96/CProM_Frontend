import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
})
export class CustomerViewComponent implements OnInit {
  user = false;
  dataSource: any;
  displayedColumns: string[];
  ELEMENT_DATA: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCustomer().subscribe((customer) => {
      this.ELEMENT_DATA = customer;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = ['customerName', 'nic', 'address', 'contactNo'];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUser(id: string) {
    this.user = true;
    this.router.navigate([`/userEdit/customer/${id}`]);
  }
}
