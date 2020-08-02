import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project/project.service';
import { startWith, map } from 'rxjs/operators';
import { MaterialService } from 'src/app/services/material/material.service';
import { StageService } from 'src/app/services/stage/stage.service';

@Component({
  selector: 'app-material-consumption',
  templateUrl: './material-consumption.component.html',
  styleUrls: ['./material-consumption.component.scss'],
})
export class MaterialConsumptionComponent implements OnInit {
  materialConsumptionForm: FormGroup;
  projectControl = new FormControl();
  materialControl = new FormControl();
  projects: any;
  projectArray: Array<any> = [];
  materials: any;
  materialArray: Array<any> = [];
  unit: string;
  stages: any;
  filteredProjectNames: Observable<string[]>;
  filteredMaterialNames: Observable<string[]>;

  constructor(
    private projectService: ProjectService,
    private materialService: MaterialService,
    private stageService: StageService
  ) {}

  ngOnInit(): void {
    this.materialConsumptionForm = new FormGroup({
      projectName: this.projectControl,
      materialName: this.materialControl,
      stageName: new FormControl(''),
      quantity: new FormControl(null),
      unit: new FormControl(''),
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
      //this.materialConsumptionForm.get('unit').setValue(unit);
    });
  }

  onProjectChange(projectName: string) {
    this.stageService
      .getStagesByProjectName(projectName)
      .subscribe((stages) => {
        this.stages = stages;
      });
  }

  submit() {
    this.materialConsumptionForm.value.unit = this.unit;
    console.log(this.materialConsumptionForm.value);
    this.materialService
      .addMaterialConsumption(
        this.materialConsumptionForm.value.projectName,
        this.materialConsumptionForm.value.stageName,
        this.materialConsumptionForm.value.materialName,
        this.materialConsumptionForm.value.quantity,
        this.materialConsumptionForm.value.unit,
        this.materialConsumptionForm.value.date
      )
      .subscribe((res) => {
        res = alert('data added successfully');
      });
    this.materialConsumptionForm.reset();
  }

  onView() {}
}
