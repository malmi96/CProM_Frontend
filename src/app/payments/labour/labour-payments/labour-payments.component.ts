import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-labour-payments',
  templateUrl: './labour-payments.component.html',
  styleUrls: ['./labour-payments.component.css'],
})
export class LabourPaymentsComponent implements OnInit {
  projectControl = new FormControl();
  labourControl = new FormControl();

  filteredLabours: Observable<string[]>;
  filteredProjects: Observable<string[]>;

  labours: string[] = ['Saman', 'Nimal', 'Amal'];
  projects: string[] = [
    'Kottawa-Project',
    'Malabe-Project',
    'Moratuwa-Project',
  ];
  stages: string[] = ['Foundation', 'Brick Work', 'Painting', 'Roofing'];
  types: string[] = ['Daily Wages', 'Square ft', 'feet', 'other'];

  constructor() {}

  ngOnInit(): void {
    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
    this.filteredLabours = this.labourControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterLabour(value))
    );
  }

  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }
  private _filterLabour(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.labours.filter((labour) =>
      labour.toLowerCase().includes(filterValue)
    );
  }
}
