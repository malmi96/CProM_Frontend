import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Machinery } from '../../interfaces/machinery';

@Injectable({
  providedIn: 'root',
})
export class MachineryService {
  constructor(private http: HttpClient) {}

  getMachinery(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/machinery/get');
  }

  getMachineryById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/machinery/${id}`);
  }

  getMachineryType(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/machineryType/get');
  }

  addMachineryType(machineryType: string): Observable<any> {
    const machinery: any = {
      machineryType,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/machineryType/add',
      machinery
    );
  }

  deleteMachineryType(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:5000/api/machineryType/${id}`
    );
  }

  deleteMachinery(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/machinery/${id}`);
  }

  updateMachinery(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/machinery/${id}`,
      data
    );
  }

  addMachinery(
    machineryName: string,
    machineryType: string,
    machineryCondition: string,
    date: Date
  ): Observable<any> {
    const machinery: Machinery = {
      id: null,
      machineryName,
      machineryType,
      machineryCondition,
      date,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/machinery/add',
      machinery
    );
  }
}
