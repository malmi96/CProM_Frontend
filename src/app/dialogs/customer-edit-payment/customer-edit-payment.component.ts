import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-edit-payment',
  templateUrl: './customer-edit-payment.component.html',
  styleUrls: ['./customer-edit-payment.component.css'],
})
export class CustomerEditPaymentComponent implements OnInit {
  customerPaymentForm: FormGroup;
  customers: any;
  projectControl = new FormControl();
  customerNames: Array<any> = [];
  filteredProjects: Observable<string[]>;
  id: string;
  payment: any;
  project: any;
  projectD: any;
  projects: Array<any> = [];
  types: string[] = ['Full Payment', 'Stage-wise Payment', 'Other'];
  methods: string[] = ['Cash', 'Cheque'];

  constructor(
    private userServices: UserService,
    private projectServices: ProjectService,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<CustomerEditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.paymentService
      .getCustomerPaymentsById(this.id)
      .subscribe((payment) => {
        this.payment = payment;
        this.customerPaymentForm = new FormGroup({
          projectName: new FormControl(this.payment.projectName.projectName),
          customerName: new FormControl(this.payment.customerName.customerName),
          paymentDate: new FormControl(this.payment.paymentDate),
          paymentType: new FormControl(this.payment.paymentType),
          amount: new FormControl(this.payment.amount),
          method: new FormControl(this.payment.method),
          description: new FormControl(this.payment.description),
        });
      });

    this.projectServices.getProject().subscribe((project: any) => {
      this.project = project;
      this.project.forEach((response) => {
        this.projects.push(response.projectName);
      });
    });

    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
  }
  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }

  onChange(value: string) {
    this.projectServices.getProjectByProjectName(value).subscribe((res) => {
      this.projectD = res;
      this.customerPaymentForm
        .get('customerName')
        .setValue(this.projectD.projectOwner.customerName);
    });
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
      formValue: this.customerPaymentForm.value,
    });
  }
}
