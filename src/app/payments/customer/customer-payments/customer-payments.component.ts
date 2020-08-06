import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.css'],
})
export class CustomerPaymentsComponent implements OnInit {
  constructor(
    private userServices: UserService,
    private projectServices: ProjectService,
    private paymentService: PaymentService
  ) {}
  customerPaymentForm: FormGroup;
  customers: any;
  projectControl = new FormControl();
  customerNames: Array<any> = [];
  filteredProjects: Observable<string[]>;
  project: any;
  projectD: any;
  projects: Array<any> = [];
  types: string[] = ['Full Payment', 'Stage-wise Payment', 'Other'];
  methods: string[] = ['Cash', 'Cheque'];

  ngOnInit(): void {
    this.customerPaymentForm = new FormGroup({
      projectName: this.projectControl,
      customerName: new FormControl(''),
      paymentDate: new FormControl(''),
      paymentType: new FormControl(''),
      amount: new FormControl(''),
      method: new FormControl(''),
      description: new FormControl(''),
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

  submit() {
    this.paymentService
      .addCustomerPayment(
        this.customerPaymentForm.value.customerName,
        this.customerPaymentForm.value.projectName,
        this.customerPaymentForm.value.paymentDate,
        this.customerPaymentForm.value.paymentType,
        this.customerPaymentForm.value.amount,
        this.customerPaymentForm.value.method,
        this.customerPaymentForm.value.description
      )
      .subscribe((res) => {
        (res = alert('data added successfully')),
          this.customerPaymentForm.reset();
      });
  }
}
