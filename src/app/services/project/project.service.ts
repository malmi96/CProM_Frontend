import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from '../../interfaces/project';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];
  private projectUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient) {}

  getProject(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/project/get');
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/project/${id}`);
  }

  getProjectByProjectName(projectName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/project/view/${projectName}`
    );
  }

  updateProject(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:5000/api/project/${id}`, data);
  }

  addProject(
    projectName: string,
    projectLocation: string,
    projectOwner: string,
    startedDate: Date,
    projectedEndingDate: Date,
    projectStatus: string
  ) {
    const project: Project = {
      id: null,
      projectName,
      projectLocation,
      projectOwner,
      startedDate,
      projectedEndingDate,
      projectStatus,
    };

    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/project/add',
        project
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.projects.push(project);
        this.projectUpdated.next([...this.projects]);
      });
  }

  deleteProject(id: string): Observable<Project[]> {
    return this.http.delete<Project[]>(
      `http://localhost:5000/api/project/${id}`
    );
  }
}
