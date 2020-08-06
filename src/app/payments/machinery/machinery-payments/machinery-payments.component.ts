import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MachineryService } from 'src/app/services/machinery/machinery.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-machinery-payments',
  templateUrl: './machinery-payments.component.html',
  styleUrls: ['./machinery-payments.component.css'],
})
export class MachineryPaymentsComponent implements OnInit {
  machineryPaymentForm: FormGroup;
  supplierControl = new FormControl();
  machineryControl = new FormControl();

  filteredSuppliers: Observable<string[]>;
  filteredMachineries: Observable<string[]>;
  machinery: any;
  supplier: any;
  machineries: Array<any> = [];
  types: string[] = ['Rent', 'Full Payment'];
  suppliers: Array<any> = [];
  constructor(
    private machineryService: MachineryService,
    private supplierService: SupplierService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.machineryPaymentForm = new FormGroup({
      machineryName: this.machineryControl,
      supplierName: this.supplierControl,
      date: new FormControl(''),
      amount: new FormControl(''),
      paymentType: new FormControl(''),
      description: new FormControl(''),
    });

    this.machineryService.getMachinery().subscribe((machinery) => {
      this.machinery = machinery;
      this.machinery.forEach((response) => {
        this.machineries.push(response.machineryName);
      });
    });
    this.supplierService.getSupplier().subscribe((supplier) => {
      this.supplier = supplier;
      this.supplier.forEach((response) => {
        this.suppliers.push(response.supplierName);
      });
    });

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

  submit() {
    this.paymentService
      .addMachineryPayment(
        this.machineryPaymentForm.value.machineryName,
        this.machineryPaymentForm.value.supplierName,
        this.machineryPaymentForm.value.date,
        this.machineryPaymentForm.value.amount,
        this.machineryPaymentForm.value.paymentType,
        this.machineryPaymentForm.value.description
      )
      .subscribe((res) => {
        (res = alert('data added successfully')),
          this.machineryPaymentForm.reset();
      });
  }
}
