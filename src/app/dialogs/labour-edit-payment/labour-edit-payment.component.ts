import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LabourService } from 'src/app/services/labour/labour.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { StageService } from 'src/app/services/stage/stage.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-labour-edit-payment',
  templateUrl: './labour-edit-payment.component.html',
  styleUrls: ['./labour-edit-payment.component.css'],
})
export class LabourEditPaymentComponent implements OnInit {
  labourWagesForm: FormGroup;
  projectControl = new FormControl();
  labourControl = new FormControl();

  filteredLabours: Observable<string[]>;
  filteredProjects: Observable<string[]>;
  id: string;
  labourNs: any;
  labour: any;
  project: any;
  payment: any;
  labours: Array<any> = [];
  projects: Array<any> = [];
  stages: any;
  types: string[] = ['Daily Wages', 'Square ft', 'feet', 'other'];

  constructor(
    private labourService: LabourService,
    private projectService: ProjectService,
    private stageService: StageService,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<LabourEditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.paymentService.getLabourPaymentsById(this.id).subscribe((payment) => {
      this.payment = payment;
      this.labourWagesForm = new FormGroup({
        labour: new FormControl(this.payment.labour.labourName),
        nic: new FormControl(this.payment.nic),
        projectName: new FormControl(this.payment.projectName.projectName),
        stageName: new FormControl(this.payment.stageName.stageName),
        paymentType: new FormControl(this.payment.paymentType),
        paymentDate: new FormControl(this.payment.paymentDate),
        amount: new FormControl(this.payment.amount),
        description: new FormControl(this.payment.description),
      });
    });

    this.labourService.getLabour().subscribe((labour) => {
      this.labour = labour;
      this.labour.forEach((response) => {
        this.labours.push(response.labourName);
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
    this.filteredLabours = this.labourControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterLabour(value))
    );
  }

  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }
  private _filterLabour(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.labours.filter((labour) =>
      labour.toLowerCase().includes(filterValue)
    );
  }

  onChange(value: string) {
    this.labourService.getLabourNic(value).subscribe((labourN) => {
      this.labourNs = labourN;
    });
  }

  onProject(value: string) {
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
      formValue: this.labourWagesForm.value,
    });
  }
}
