import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Supplier } from '../../interfaces/supplier';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private suppliers: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient) {}

  addSupplier(
    supplierName: string,
    email: string,
    address: string,
    contactNo: number,
    supplyDelay: number,
    reorderDelay: number
  ) {
    const supplier: Supplier = {
      id: null,
      supplierName,
      email,
      address,
      contactNo,
      supplyDelay,
      reorderDelay,
    };

    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/supplier/add',
        supplier
      )
      .subscribe((responseData) => {
        console.log('in service');
        console.log(responseData);
        this.suppliers.push(supplier);
        this.supplierUpdated.next([...this.suppliers]);
      });
  }
}
