import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stage } from 'src/app/interfaces/stage';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private http: HttpClient) {}

  getStage(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/stage/get');
  }

  getStagesByProject(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/stage/${id}`);
  }

  updateStage(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:5000/api/stage/${id}`, data);
  }

  addStage(
    stageName: string,
    stageSupervisor: string,
    stageStartedDate: Date,
    stageEndingDate: Date,
    stageStatus: string,
    projectName: string
  ): Observable<any> {
    const stage: Stage = {
      id: null,
      stageName,
      stageSupervisor,
      stageStartedDate,
      stageEndingDate,
      stageStatus,
      projectName,
    };
    console.log(stage);
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/stage/add',
      stage
    );
  }
}
