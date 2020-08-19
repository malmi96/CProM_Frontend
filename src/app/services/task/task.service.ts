import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  addTask(
    projectName: string,
    stageName: string,
    taskName: string,
    startDate: Date,
    endDate: Date,
    status: string
  ): Observable<any> {
    const task = {
      projectName: projectName,
      stageName: stageName,
      taskName: taskName,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    return this.http.post<any>('http://localhost:5000/api/task/add', task);
  }

  getTasks(stageName: string): Observable<any> {
    const stage = {
      stageName: stageName,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/task/stageName',
      stage
    );
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/task/${id}`);
  }

  updateTask(
    id: string,
    taskName: string,
    startDate: Date,
    endDate: Date,
    status: string
  ) {
    const task = {
      taskName: taskName,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    return this.http.patch<any>(
      `http://localhost:5000/api/task/update/${id}`,
      task
    );
  }

  updateStatus(id: string, newStatus: string): Observable<any> {
    const statusj = {
      status: newStatus,
    };

    return this.http.patch<any>(
      `http://localhost:5000/api/task/status/${id}`,
      statusj
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/task/delete/${id}`);
  }
}
