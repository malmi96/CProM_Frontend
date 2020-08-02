import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css'],
})
export class EditSupplierComponent implements OnInit {
  supplierEditForm: FormGroup;
  supplier: any;
  id: string;

  constructor(
    private supplierService: SupplierService,
    public dialogRef: MatDialogRef<EditSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.supplierService.getSupplierById(this.id).subscribe((supplier) => {
      this.supplier = supplier;
      this.supplierEditForm = new FormGroup({
        supplierName: new FormControl(this.supplier.supplierName),
        email: new FormControl(this.supplier.email),
        address: new FormControl(this.supplier.address),
        contactNo: new FormControl(this.supplier.contactNo),
        supplyDelay: new FormControl(this.supplier.supplyDelay),
        reorderDelay: new FormControl(this.supplier.reorderDelay),
      });
    });
  }

  submit(id: string) {
    this.dialogRef.close({
      supplierId: id,
      formValue: this.supplierEditForm.value,
    });
  }

  onDelete(id: string) {
    this.dialogRef.close({ delete: { supplierId: id } });
  }
}
