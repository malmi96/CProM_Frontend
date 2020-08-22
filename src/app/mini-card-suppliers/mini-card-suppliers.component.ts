import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier/supplier.service';

@Component({
  selector: 'app-mini-card-suppliers',
  templateUrl: './mini-card-suppliers.component.html',
  styleUrls: ['./mini-card-suppliers.component.css']
})
export class MiniCardSuppliersComponent implements OnInit {

  suppliers: any;
  constructor(
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.supplierService.getSupplier().subscribe(res => {
      this.suppliers = res;
    });
  }

}
