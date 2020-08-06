import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MaterialService } from 'src/app/services/material/material.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-edit-payment',
  templateUrl: './material-edit-payment.component.html',
  styleUrls: ['./material-edit-payment.component.css'],
})
export class MaterialEditPaymentComponent implements OnInit {
  id: string;
  payment: any;
  materialPaymentForm: FormGroup;
  materialControl = new FormControl();
  supplierControl = new FormControl();
  filteredMaterials: Observable<string[]>;
  filteredSuppliers: Observable<string[]>;
  material: any;
  supplier: any;
  materials: Array<any> = [];
  suppliers: Array<any> = [];
  constructor(
    private materialService: MaterialService,
    private supplierService: SupplierService,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<MaterialEditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    console.log(this.id);
    this.paymentService
      .getMaterialPaymentsById(this.id)
      .subscribe((payment) => {
        this.payment = payment;
        this.materialPaymentForm = new FormGroup({
          materialName: new FormControl(this.payment.materialName.materialName),
          supplierName: new FormControl(this.payment.supplierName.supplierName),
          date: new FormControl(this.payment.date),
          amount: new FormControl(this.payment.amount),
          description: new FormControl(this.payment.description),
        });
      });
    this.materialService.getMaterial().subscribe((material) => {
      this.material = material;
      this.material.forEach((response) => {
        this.materials.push(response.materialName);
      });
    });

    this.supplierService.getSupplier().subscribe((supplier) => {
      this.supplier = supplier;
      this.supplier.forEach((response) => {
        this.suppliers.push(response.supplierName);
      });
    });
    this.filteredMaterials = this.materialControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMaterial(value))
    );
    this.filteredSuppliers = this.supplierControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSupplier(value))
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

  onDelete(id: string) {
    this.dialogRef.close({ delete: { paymentId: id } });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(id: string) {
    this.dialogRef.close({
      paymentId: id,
      formValue: this.materialPaymentForm.value,
    });
  }
}
