import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MachineryService } from 'src/app/services/machinery/machinery.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-machinery-edit-payment',
  templateUrl: './machinery-edit-payment.component.html',
  styleUrls: ['./machinery-edit-payment.component.css'],
})
export class MachineryEditPaymentComponent implements OnInit {
  id: string;
  payment: any;
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
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<MachineryEditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.paymentService
      .getMachineryPaymentsById(this.id)
      .subscribe((payment) => {
        this.payment = payment;
        this.machineryPaymentForm = new FormGroup({
          machineryName: new FormControl(
            this.payment.machineryName.machineryName
          ),
          supplierName: new FormControl(this.payment.supplierName.supplierName),
          date: new FormControl(this.payment.date),
          amount: new FormControl(this.payment.amount),
          paymentType: new FormControl(this.payment.paymentType),
          description: new FormControl(this.payment.description),
        });
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

  onDelete(id: string) {
    this.dialogRef.close({ delete: { paymentId: id } });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(id: string) {
    this.dialogRef.close({
      paymentId: id,
      formValue: this.machineryPaymentForm.value,
    });
  }
}
