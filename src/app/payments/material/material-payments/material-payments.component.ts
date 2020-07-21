import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-material-payments',
  templateUrl: './material-payments.component.html',
  styleUrls: ['./material-payments.component.css'],
})
export class MaterialPaymentsComponent implements OnInit {
  projectControl = new FormControl();
  materialControl = new FormControl();
  supplierControl = new FormControl();
  filteredMaterials: Observable<string[]>;
  filteredProjects: Observable<string[]>;
  filteredSuppliers: Observable<string[]>;

  materials: string[] = ['Insee-Cement-50kg', 'Sand', 'Brick'];
  projects: string[] = [
    'Kottawa-Project',
    'Malabe-Project',
    'Moratuwa-Project',
  ];
  stages: string[] = ['Foundation', 'Brick Work', 'Painting', 'Roofing'];
  suppliers: string[] = ['Nimal Hardware', 'Amal Hardware', 'Saman Hardware'];
  constructor() {}

  ngOnInit(): void {
    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
    this.filteredMaterials = this.materialControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMaterial(value))
    );
    this.filteredSuppliers = this.supplierControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSupplier(value))
    );
  }
  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }
  private _filterMaterial(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.materials.filter((material) =>
      material.toLowerCase().includes(filterValue)
    );
  }
  private _filterSupplier(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suppliers.filter((supplier) =>
      supplier.toLowerCase().includes(filterValue)
    );
  }
}
