import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-utility-payments',
  templateUrl: './utility-payments.component.html',
  styleUrls: ['./utility-payments.component.css'],
})
export class UtilityPaymentsComponent implements OnInit {
  projectControl = new FormControl();

  filteredProjects: Observable<string[]>;

  payments: string[] = [
    'Transport',
    'Water Bill',
    'Electricity Bill',
    'Rental Payments',
    'Other',
  ];
  projects: string[] = [
    'Kottawa-Project',
    'Malabe-Project',
    'Moratuwa-Project',
  ];
  stages: string[] = ['Foundation', 'Brick Work', 'Painting', 'Roofing'];
  constructor() {}

  ngOnInit(): void {
    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
  }

  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }
}
