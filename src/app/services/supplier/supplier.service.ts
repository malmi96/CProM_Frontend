import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Supplier } from '../../interfaces/supplier';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private suppliers: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient) {}

  getSupplier(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/supplier/get');
  }

  getSupplierById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/supplier/${id}`);
  }

  addSupplier(
    supplierName: string,
    email: string,
    address: string,
    contactNo: number,
    supplyDelay: number,
    reorderDelay: number
  ): Observable<any> {
    const supplier: Supplier = {
      id: null,
      supplierName,
      email,
      address,
      contactNo,
      supplyDelay,
      reorderDelay,
    };

    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/supplier/add',
      supplier
    );
  }

  updateSupplier(id: string, data: any): Observable<any> {
    return this.http.patch<any>(
      `http://localhost:5000/api/supplier/${id}`,
      data
    );
  }

  deleteSupplier(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/supplier/${id}`);
  }
}
