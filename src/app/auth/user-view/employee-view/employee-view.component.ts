import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/user';
import { element } from 'protractor';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],
})
export class EmployeeViewComponent implements OnInit {
  user = false;
  employee: Employee[];
  displayedColumns: string[];
  ELEMENT_DATA: any;
  dataSource: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getEmployee().subscribe((employee) => {
      this.employee = employee;
      this.ELEMENT_DATA = employee;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'employeeName',
        'nic',
        'contactNo',
        'designation',
      ];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUser(id: string) {
    this.user = true;
    this.router.navigate([`/userEdit/${id}`]);
  }
}
