import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project/project.service';
import { startWith, map } from 'rxjs/operators';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-material-allocation',
  templateUrl: './material-allocation.component.html',
  styleUrls: ['./material-allocation.component.scss'],
})
export class MaterialAllocationComponent implements OnInit {
  materialAllocateForm: FormGroup;
  projectControl = new FormControl();
  materialControl = new FormControl();
  unitControl = new FormControl();
  projects: any;
  projectArray: Array<any> = [];
  materials: any;
  materialArray: Array<any> = [];
  unit: string;
  filteredProjectNames: Observable<string[]>;
  filteredMaterialNames: Observable<string[]>;

  constructor(
    private projectService: ProjectService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.materialAllocateForm = new FormGroup({
      projectName: this.projectControl,
      materialName: this.materialControl,
      quantity: new FormControl(null),
      unit: this.unitControl,
      date: new FormControl(''),
    });

    this.projectService.getProject().subscribe((projects: any) => {
      this.projects = projects;
      this.projects.forEach((response) => {
        this.projectArray.push(response.projectName);
      });
    });

    this.filteredProjectNames = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );

    this.materialService.getMaterial().subscribe((materials: any) => {
      this.materials = materials;
      this.materials.forEach((response) => {
        this.materialArray.push(response.materialName);
      });
    });

    this.filteredMaterialNames = this.materialControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMaterial(value))
    );
  }

  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projectArray.filter((projectName) =>
      projectName.toLowerCase().includes(filterValue)
    );
  }

  private _filterMaterial(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.materialArray.filter((materialName) =>
      materialName.toLowerCase().includes(filterValue)
    );
  }
  onChange(value: string) {
    this.materialService.getMaterialUnit(value).subscribe((unit) => {
      this.unit = unit;
      this.unitControl.setValue(unit);
    });
  }

  submit() {
    console.log(this.materialAllocateForm.value);
    this.materialService
      .allocateMaterial(
        this.materialAllocateForm.value.projectName,
        this.materialAllocateForm.value.materialName,
        this.materialAllocateForm.value.quantity,
        this.materialAllocateForm.value.unit,
        this.materialAllocateForm.value.date
      )
      .subscribe((res) => {
        res = alert('data added successfully');
      });
  }

  onView() {}
}
