import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Labour } from '../../interfaces/labour';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabourService {
  private labours: Labour[] = [];
  private labourUpdated = new Subject<Labour[]>();
  constructor(private http: HttpClient) {}

  getLabour(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/labour/get');
  }

  getLabourById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/labour/${id}`);
  }

  getLabourNic(name: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/labour/view/${name}`);
  }

  updateLabour(id: string, data: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/api/labour/${id}`, data);
  }

  deleteLabour(id: string): Observable<Labour[]> {
    return this.http.delete<Labour[]>(`http://localhost:5000/api/labour/${id}`);
  }

  addLabour(
    labourCategory: string,
    labourType: string,
    labourName: string,
    labourNIC: string,
    labourContactNo: number,
    joinedDate: Date,
    labourAddress: string
  ): Observable<any> {
    const labour: Labour = {
      id: null,
      labourCategory,
      labourType,
      labourName,
      labourNIC,
      labourContactNo,
      joinedDate,
      labourAddress,
    };

    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/labour/add',
      labour
    );
  }
}
