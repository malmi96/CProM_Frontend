import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Employee } from '../../interfaces/user';
import { Customer } from '../../interfaces/user';
import { Login } from '../../interfaces/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { Supplier } from 'src/app/interfaces/supplier';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private suppliers: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();
  private jwtHelper = new JwtHelperService();

  private isAuthenticated = false;
  private token: string;
  private userType: string;
  private authStatusListener = new Subject<boolean>();
  private userListener = new Subject<string>();

  private customers: Customer[] = [];
  private customerUpdated = new Subject<Customer[]>();
  private employees: Employee[] = [];
  private employeeUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getIsUserType() {
    return this.userType;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserListener() {
    return this.userListener.asObservable();
  }

  addCustomer(
    customerName: string,
    email: string,
    nic: string,
    address: string,
    contactNo: number,
    password: string
  ) {
    const customer: Customer = {
      id: null,
      customerName,
      email,
      nic,
      address,
      contactNo,
      password,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/users/customer',
        customer
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.customers.push(customer);
        this.customerUpdated.next([...this.customers]);
      });
  }

  addEmployee(
    employeeName: string,
    email: string,
    nic: string,
    address: string,
    contactNo: number,
    password: string,
    designation: string
  ) {
    const employee: Employee = {
      id: null,
      employeeName,
      email,
      nic,
      address,
      contactNo,
      password,
      designation,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/users/employee',
        employee
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.employees.push(employee);
        this.employeeUpdated.next([...this.employees]);
      });
  }

  login(email: string, password: string, userType: string) {
    const user: Login = { email, password, userType };
    this.http
      .post<{ token: string; userType: string }>(
        'http://localhost:5000/api/users/login',
        user
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        // tslint:disable-next-line: no-shadowed-variable
        const userType = response.userType;
        this.userType = userType;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token, userType);
          this.router.navigate(['/dashboard']);
          if (userType === 'Customer') {
            this.userListener.next('Customer');
          } else if (userType === 'Project Manager') {
            this.userListener.next('Project Manager');
          } else if (userType === 'Inventory Manager') {
            this.userListener.next('Inventory Manager');
          } else if (userType === 'Sales and Marketing Manager') {
            this.userListener.next('Sales and Marketing Manager');
          } else if (userType === 'Finance Manager') {
            this.userListener.next('Finance Manager');
          }
        }
      });
  }

  logout() {
    this.token = null;
    this.userType = null;
    this.isAuthenticated = false;
    this.userListener.next(null);
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.userType = authInformation.userType;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    this.userListener.next(this.userType);
  }

  private saveAuthData(token: string, userType: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (!token) {
      return;
    }
    return {
      token,
      userType,
    };
  }
}
