import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inquiry } from 'src/app/interfaces/inquiry';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  constructor(private http: HttpClient) {}

  addInquiry(
    customerName: string,
    email: string,
    contactNo: number,
    message: string
  ): Observable<any> {
    const inquiry: Inquiry = {
      id: null,
      customerName,
      email,
      contactNo,
      message,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/inquiry/add',
      inquiry
    );
  }

  getInquiry(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/inquiry/get');
  }

  updateStatus(newStatus: string, id: string): Observable<any> {
    const statusj = {
      status: newStatus,
    };
    return this.http.patch<any>(`http://localhost:5000/api/inquiry/status/${id}`, statusj);
  }

  removeInquiry(id: string): Observable<any>{
    return this.http.delete<any>(`http://localhost:5000/api/inquiry/${id}`);
  }
}
