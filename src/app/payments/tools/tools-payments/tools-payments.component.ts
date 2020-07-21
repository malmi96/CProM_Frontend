import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tools-payments',
  templateUrl: './tools-payments.component.html',
  styleUrls: ['./tools-payments.component.css'],
})
export class ToolsPaymentsComponent implements OnInit {
  supplierControl = new FormControl();
  toolsControl = new FormControl();

  filteredSuppliers: Observable<string[]>;
  filteredTools: Observable<string[]>;

  tools: string[] = ['Hammer', 'Drill Machine', 'Bolster'];
  types: string[] = ['Rent', 'Full Payment'];
  suppliers: string[] = ['Amal Hardware', 'Nimal Hardware', 'Saman Hanrdware'];
  constructor() {}

  ngOnInit(): void {
    this.filteredSuppliers = this.supplierControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSupplier(value))
    );
    this.filteredTools = this.toolsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTools(value))
    );
  }

  private _filterSupplier(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suppliers.filter((supplier) =>
      supplier.toLowerCase().includes(filterValue)
    );
  }
  private _filterTools(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tools.filter((tool) =>
      tool.toLowerCase().includes(filterValue)
    );
  }
}
