import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { StageService } from 'src/app/services/stage/stage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-utility-edit-payment',
  templateUrl: './utility-edit-payment.component.html',
  styleUrls: ['./utility-edit-payment.component.css'],
})
export class UtilityEditPaymentComponent implements OnInit {
  id: string;
  payment: any;
  utilityPaymentForm: FormGroup;
  projectControl = new FormControl();
  filteredProjects: Observable<string[]>;

  payments: string[] = [
    'Transport',
    'Water Bill',
    'Electricity Bill',
    'Rental Payments',
    'Other',
  ];
  project: any;
  projects: Array<any> = [];
  stages: any;
  constructor(
    private paymentService: PaymentService,
    private projectService: ProjectService,
    private stageService: StageService,
    public dialogRef: MatDialogRef<UtilityEditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.paymentService.getUtilityPaymentsById(this.id).subscribe((payment) => {
      this.payment = payment;
      this.utilityPaymentForm = new FormGroup({
        paymentType: new FormControl(this.payment.paymentType),
        projectName: new FormControl(this.payment.projectName.projectName),
        stageName: new FormControl(this.payment.stageName.stageName),
        paymentDate: new FormControl(this.payment.paymentDate),
        amount: new FormControl(this.payment.amount),
        description: new FormControl(this.payment.description),
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
  }

  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }
  onChange(value: string) {
    this.stageService.getStagesByProjectName(value).subscribe((stages) => {
      this.stages = stages;
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
      formValue: this.utilityPaymentForm.value,
    });
  }
}
