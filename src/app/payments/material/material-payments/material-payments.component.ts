import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MaterialService } from 'src/app/services/material/material.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-material-payments',
  templateUrl: './material-payments.component.html',
  styleUrls: ['./material-payments.component.css'],
})
export class MaterialPaymentsComponent implements OnInit {
  unit: any;
  materialPaymentForm: FormGroup;
  materialControl = new FormControl();
  supplierControl = new FormControl();
  projectControl = new FormControl();
  filteredMaterials: Observable<string[]>;
  filteredSuppliers: Observable<string[]>;
  filteredProjects: Observable<string[]>;
  material: any;
  supplier: any;
  project: any;
  materials: Array<any> = [];
  suppliers: Array<any> = [];
  projects: Array<any> = [];
  constructor(
    private materialService: MaterialService,
    private supplierService: SupplierService,
    private paymentService: PaymentService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.materialPaymentForm = new FormGroup({
      materialName: this.materialControl,
      supplierName: this.supplierControl,
      projectName: this.projectControl,
      quantity: new FormControl(''),
      unit: new FormControl(''),
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
    this.projectService.getProject().subscribe((project) => {
      this.project = project;
      this.project.forEach((response) => {
        this.projects.push(response.projectName);
      });
    });

    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );

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
  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }

  onChange(value: string) {
    this.materialService.getMaterialUnit(value).subscribe((unit) => {
      this.unit = unit;
      //this.materialConsumptionForm.get('unit').setValue(unit);
    });
  }

  submit() {
    this.materialPaymentForm.value.unit = this.unit;
    this.paymentService
      .addMaterialPayments(
        this.materialPaymentForm.value.materialName,
        this.materialPaymentForm.value.supplierName,
        this.materialPaymentForm.value.projectName,
        this.materialPaymentForm.value.quantity,
        this.materialPaymentForm.value.unit,
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
