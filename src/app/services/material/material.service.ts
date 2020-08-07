import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Material } from '../../interfaces/material';
import { Subject, Observable } from 'rxjs';
import { MaterialAllocation } from 'src/app/interfaces/materialAllocation';
import { MaterialConsumption } from 'src/app/interfaces/materialConsumption';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private materials: Material[] = [];
  private materialUpdated = new Subject<Material[]>();

  constructor(private http: HttpClient) {}

  getMaterial(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/material/get');
  }

  getMaterialById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/material/${id}`);
  }

  getMaterialUnit(materialName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/material/materialfind/${materialName}`
    );
  }

  updateMaterial(id: string, data: any): Observable<any> {
    return this.http.patch<any>(
      `http://localhost:5000/api/material/${id}`,
      data
    );
  }

  deleteMaterial(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/material/${id}`);
  }

  addMaterial(
    materialCategory: string,
    materialName: string,
    unit: string,
    unitCost: number
  ): Observable<any> {
    const material: Material = {
      id: null,
      materialCategory,
      materialName,
      unit,
      unitCost,
    };
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/material/add',
      material
    );
  }

  allocateMaterial(
    projectName: string,
    materialName: string,
    quantity: number,
    unit: string,
    date: Date
  ): Observable<any> {
    const materialAllocation: MaterialAllocation = {
      id: null,
      projectName,
      materialName,
      quantity,
      unit,
      date,
    };
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/materialAllocation/add',
      materialAllocation
    );
  }

  addMaterialConsumption(
    projectName: string,
    stageName: string,
    materialName: string,
    quantity: number,
    unit: string,
    date: Date
  ): Observable<any> {
    const materialConsumption: MaterialConsumption = {
      id: null,
      projectName,
      stageName,
      materialName,
      quantity,
      unit,
      date,
    };
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/materialConsumption/add',
      materialConsumption
    );
  }

  getMaterialAllocationByProjectName(projectName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialAllocation/get/${projectName}`
    );
  }
  getMaterialAllocationByMaterialName(materialName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialAllocation/get/material/${materialName}`
    );
  }
  getMaterialAllocationLog(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialAllocation/log`
    );
  }

  removeLog(id: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:5000/api/materialAllocation/delete/${id}`
    );
  }

  getMaterialConsumptionByProject(projectName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialConsumption/get/${projectName}`
    );
  }

  getMaterialConsumptionByStage(
    projectName: string,
    stageName: string
  ): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialConsumption/stage/${projectName}/${stageName}`
    );
  }

  getMaterialConsumptionByMaterial(materialName: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialConsumption/material/${materialName}`
    );
  }

  getMaterialConsumptionLog(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/materialConsumption/log`
    );
  }
}
