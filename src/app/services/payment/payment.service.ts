import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CustomerPayment,
  LabourWages,
  MaterialPayment,
  MachineryPayment,
  UtilityPayment,
} from 'src/app/interfaces/payments';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  // Get
  getCustomerPayments(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/customerPayments/get');
  }
  getMaterialPayments(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/materialPayments/get');
  }
  getMachineryPayments(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:5000/api/machineryPayments/get'
    );
  }
  getLabourPayments(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/labourwages/get');
  }
  getUtilityPayments(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/utilityPayments/get');
  }
  // Get by ID
  getCustomerPaymentsById(id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/customerPayments/get/${id}`
    );
  }
  getMaterialPaymentsById(id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialPayments/get/${id}`
    );
  }
  getMachineryPaymentsById(id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/machineryPayments/get/${id}`
    );
  }
  getLabourPaymentsById(id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/labourwages/get/${id}`
    );
  }
  getUtilityPaymentsById(id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/utilityPayments/get/${id}`
    );
  }

  // Update Payments

  updateCustomerPayment(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/customerPayments/${id}`,
      data
    );
  }
  updateMaterialPayment(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/materialPayments/${id}`,
      data
    );
  }
  updateMachineryPayment(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/machineryPayments/${id}`,
      data
    );
  }
  updateLabourWages(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/labourwages/${id}`,
      data
    );
  }
  updateUtilityPayment(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/utilityPayments/${id}`,
      data
    );
  }

  // Delete

  deleteCustomerPayment(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:5000/api/customerPayments/${id}`
    );
  }
  deleteMaterialPayments(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:5000/api/materialPayments/${id}`
    );
  }
  deleteMachineryPayments(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:5000/api/machineryPayments/${id}`
    );
  }
  deleteLabourPayments(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/labourwages/${id}`);
  }
  deleteUtilityPayments(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:5000/api/utilityPayments/${id}`
    );
  }

  // Add Payments
  addCustomerPayment(
    customerName: string,
    projectName: string,
    paymentDate: Date,
    paymentType: string,
    amount: number,
    method: string,
    description: string
  ): Observable<any> {
    const payment: CustomerPayment = {
      id: null,
      customerName,
      projectName,
      paymentDate,
      paymentType,
      amount,
      method,
      description,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/customerPayments/add',
      payment
    );
  }

  addLabourWages(
    labour: string,
    nic: string,
    projectName: string,
    stageName: string,
    paymentDate: Date,
    paymentType: string,
    amount: number,
    description: string
  ): Observable<any> {
    const payment: LabourWages = {
      id: null,
      labour,
      nic,
      projectName,
      stageName,
      paymentDate,
      paymentType,
      amount,
      description,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/labourwages/add',
      payment
    );
  }

  addMaterialPayments(
    materialName: string,
    supplierName: string,
    projectName: string,
    quantity: number,
    unit: string,
    date: Date,
    amount: string,
    description: string
  ): Observable<any> {
    const payment: MaterialPayment = {
      id: null,
      materialName,
      supplierName,
      projectName,
      quantity,
      unit,
      date,
      amount,
      description,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/materialPayments/add',
      payment
    );
  }

  addMachineryPayment(
    machineryName: string,
    supplierName: string,
    date: Date,
    amount: number,
    paymentType: string,
    description: string
  ): Observable<any> {
    const payment: MachineryPayment = {
      id: null,
      machineryName,
      supplierName,
      date,
      amount,
      paymentType,
      description,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/machineryPayments/add',
      payment
    );
  }

  addUtilityPayment(
    paymentType: string,
    projectName: string,
    stageName: string,
    paymentDate: Date,
    amount: string,
    description: string
  ): Observable<any> {
    const payment: UtilityPayment = {
      id: null,
      paymentType,
      projectName,
      stageName,
      paymentDate,
      amount,
      description,
    };
    return this.http.post(
      'http://localhost:5000/api/utilityPayments/add',
      payment
    );
  }

  // Daily Expenses

  getDailyExpensesForMaterial(dateR: Date): Observable<any> {
    const dateObj = {
      date: dateR,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/materialPayments/dailyExpenses',
      dateObj
    );
  }

  getDailyExpensesForMachinery(dateR: Date): Observable<any> {
    const dateObj = {
      date: dateR,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/machineryPayments/dailyExpenses',
      dateObj
    );
  }

  getDailyExpensesForUtility(dateR: Date): Observable<any> {
    const dateObj = {
      date: dateR,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/utilityPayments/dailyExpenses',
      dateObj
    );
  }

  getDailyExpensesForLabour(dateR: Date): Observable<any> {
    const dateObj = {
      date: dateR,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/labourWages/dailyExpenses',
      dateObj
    );
  }

  // Project Expenses
  getProjectExpensesForLabour(projectName: string): Observable<any> {
    const project = {
      projectName,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/labourWages/projectExpenses',
      project
    );
  }
  getProjectExpensesForMaterial(projectName: string): Observable<any> {
    const project = {
      projectName,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/materialPayments/projectExpenses',
      project
    );
  }
  getProjectExpensesForMachinery(projectName: string): Observable<any> {
    const project = {
      projectName,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/machineryPayments/projectExpenses',
      project
    );
  }
  getProjectExpensesForUtility(projectName: string): Observable<any> {
    const project = {
      projectName,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/utilityPayments/projectExpenses',
      project
    );
  }
  getTotalCustomerPayments(projectName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/customerPayments/total/${projectName}`
    );
  }
  getProjectExpense(projectName: string): Observable<any> {
    const project = {
      projectName,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/projectExpenses/get',
      project
    );
  }
}
