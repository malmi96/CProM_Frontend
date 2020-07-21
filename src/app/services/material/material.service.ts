import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Material } from '../../interfaces/material';
import { Subject, Observable } from 'rxjs';

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

  addMaterial(
    materialCategory: string,
    materialName: string,
    quantity: number,
    unit: string,
    unitCost: number
  ) {
    const material: Material = {
      id: null,
      materialCategory,
      materialName,
      quantity,
      unit,
      unitCost,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:5000/api/material/add',
        material
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.materials.push(material);
        this.materialUpdated.next([...this.materials]);
      });
  }
}
