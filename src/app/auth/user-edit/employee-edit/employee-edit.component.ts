import { Component, OnInit, ɵConsole } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Employee } from 'src/app/interfaces/user';
import { async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  result: any;
  id: string;
  employee: Employee;
  message: boolean;
  changePassword = false;
  constructor(
    public router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getEmployeeById(this.id).subscribe((employee: any) => {
      return (this.employee = employee);
    });
  }

  onUpdate(employeeUpdate: NgForm) {
    if (
      employeeUpdate.value.password !== employeeUpdate.value.confirmPassword
    ) {
      this.message = true;
      return false;
    }
    console.log(employeeUpdate.value);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService
      .updateEmployee(this.id, employeeUpdate.value)
      .subscribe((res) => {
        res = this.router.navigate(['/viewUser/viewEmployee']);
      });
  }

  onChangePassword() {
    this.changePassword = true;
  }

  onDelete() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.deleteEmployee(this.id).subscribe((res) => {
      this.router.navigate(['/viewUser/viewEmployee']);
    });
  }
}
