import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MaterialService } from 'src/app/services/material/material.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-material-payments',
  templateUrl: './material-payments.component.html',
  styleUrls: ['./material-payments.component.css'],
})
export class MaterialPaymentsComponent implements OnInit {
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
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.materialPaymentForm = new FormGroup({
      materialName: this.materialControl,
      supplierName: this.supplierControl,
      date: new FormControl(''),
      amount: new FormControl(''),
      description: new FormControl(''),
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

  submit() {
    this.paymentService
      .addMaterialPayments(
        this.materialPaymentForm.value.materialName,
        this.materialPaymentForm.value.supplierName,
        this.materialPaymentForm.value.date,
        this.materialPaymentForm.value.amount,
        this.materialPaymentForm.value.description
      )
      .subscribe((res) => {
        (res = alert('data added successfully')),
          this.materialPaymentForm.reset();
      });
  }
}
