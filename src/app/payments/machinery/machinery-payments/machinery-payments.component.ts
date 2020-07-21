import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-machinery-payments',
  templateUrl: './machinery-payments.component.html',
  styleUrls: ['./machinery-payments.component.css'],
})
export class MachineryPaymentsComponent implements OnInit {
  supplierControl = new FormControl();
  machineryControl = new FormControl();

  filteredSuppliers: Observable<string[]>;
  filteredMachineries: Observable<string[]>;
  machineries: string[] = ['Backhoe', 'Excavator', 'Roller'];
  types: string[] = ['Rent', 'Full Payment'];
  suppliers: string[] = ['Amal Hardware', 'Nimal Hardware', 'Saman Hanrdware'];
  constructor() {}

  ngOnInit(): void {
    this.filteredSuppliers = this.supplierControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSupplier(value))
    );
    this.filteredMachineries = this.machineryControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMachinery(value))
    );
  }

  private _filterSupplier(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suppliers.filter((supplier) =>
      supplier.toLowerCase().includes(filterValue)
    );
  }
  private _filterMachinery(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.machineries.filter((machinery) =>
      machinery.toLowerCase().includes(filterValue)
    );
  }
}
