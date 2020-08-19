import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Employee } from '../../interfaces/user';
import { Customer } from '../../interfaces/user';
import { Login } from '../../interfaces/user';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { Supplier } from 'src/app/interfaces/supplier';
import { map } from 'rxjs/operators';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthenticated = false;
  private userFailed = false;
  private token: string;
  private userType: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private userListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getLoggedInInfo() {
    return this.userFailed;
  }

  getIsUserType() {
    return this.userType;
  }
  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserListener() {
    return this.userListener.asObservable();
  }
  // Get User Request

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      'http://localhost:5000/api/users/customer/get'
    );
  }

  getCustomerById(id: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `http://localhost:5000/api/users/customer/${id}`
    );
  }

  getEmployeeById(id: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `http://localhost:5000/api/users/employee/${id}`
    );
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      'http://localhost:5000/api/users/employee/get'
    );
  }

  // Update User

  updateEmployee(id: string, data: any): Observable<any> {
    console.log(data);
    return this.http.patch(
      `http://localhost:5000/api/users/employee/${id}`,
      data
    );
  }

  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:5000/api/users/customer/${id}`,
      data
    );
  }

  // Delete User

  deleteEmployee(id: string): Observable<Employee[]> {
    return this.http.delete<Employee[]>(
      `http://localhost:5000/api/users/employee/${id}`
    );
  }

  deleteCustomer(id: string): Observable<Customer[]> {
    return this.http.delete<Customer[]>(
      `http://localhost:5000/api/users/customer/${id}`
    );
  }

  // Post Request

  addCustomer(
    customerName: string,
    email: string,
    nic: string,
    address: string,
    contactNo: number,
    password: string
  ): Observable<any> {
    const customer: Customer = {
      id: null,
      customerName,
      email,
      nic,
      address,
      contactNo,
      password,
    };
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/users/customer',
      customer
    );
  }

  addEmployee(
    employeeName: string,
    email: string,
    nic: string,
    address: string,
    contactNo: number,
    password: string,
    designation: string
  ): Observable<any> {
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
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/users/employee',
      employee
    );
  }

  login(email: string, password: string, userType: string) {
    const user: Login = { email, password, userType };
    this.http
      .post<{ token: string; userType: string; userId: string }>(
        'http://localhost:5000/api/users/login',
        user
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          // tslint:disable-next-line: no-shadowed-variable
          const userType = response.userType;
          this.userType = userType;
          if (token) {
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            this.saveAuthData(token, userType, this.userId);
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
        },
        (err) => {
          this.userFailed = true;
          location.reload();
        }
      );
  }

  logout() {
    this.token = null;
    this.userType = null;
    this.userId = null;
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
    this.userId = authInformation.userId;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    this.userListener.next(this.userType);
  }

  private saveAuthData(token: string, userType: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return;
    }
    return {
      token,
      userType,
      userId,
    };
  }
}
