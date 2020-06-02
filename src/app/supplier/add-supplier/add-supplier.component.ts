import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent implements OnInit {
  constructor(public supplierService: SupplierService) {}

  ngOnInit(): void {}

  submit(addSupplierForm: NgForm) {
    console.log(addSupplierForm);
    this.supplierService.addSupplier(
      addSupplierForm.value.supplierName,
      addSupplierForm.value.email,
      addSupplierForm.value.address,
      addSupplierForm.value.contactNo,
      addSupplierForm.value.supplyDelay,
      addSupplierForm.value.reorderDelay
    );
  }
}
