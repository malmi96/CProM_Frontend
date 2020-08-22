import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  constructor(private http: HttpClient) {}

  getSupplierPayments(materialN: string): Observable<any> {
    const material = {
      materialName: materialN,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/report/supplierReport',
      material
    );
  }

  getProgress(projectN: string): Observable<any> {
    const project = {
      projectName: projectN,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/report/progress',
      project
    );
  }
}
