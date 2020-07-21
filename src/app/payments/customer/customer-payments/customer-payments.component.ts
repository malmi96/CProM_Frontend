import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.css'],
})
export class CustomerPaymentsComponent implements OnInit {
  constructor() {}
  customerControl = new FormControl();
  projectControl = new FormControl();
  customerNames: string[] = ['Amal Perera', 'Nimal Peiris', 'Saman Fernando'];
  filteredCustomerNames: Observable<string[]>;
  filteredProjects: Observable<string[]>;
  projects: string[] = [
    'Kottawa-Project',
    'Malabe-Project',
    'Moratuwa-Project',
  ];
  types: string[] = ['Full Payment', 'Stage-wise Payment', 'Other'];
  methods: string[] = ['Cash', 'Cheque'];

  ngOnInit(): void {
    this.filteredCustomerNames = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCustomer(value))
    );

    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.customerNames.filter((customerName) =>
      customerName.toLowerCase().includes(filterValue)
    );
  }

  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }
}
