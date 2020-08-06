import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LabourService } from 'src/app/services/labour/labour.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { StageService } from 'src/app/services/stage/stage.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-labour-payments',
  templateUrl: './labour-payments.component.html',
  styleUrls: ['./labour-payments.component.css'],
})
export class LabourPaymentsComponent implements OnInit {
  labourWagesForm: FormGroup;
  projectControl = new FormControl();
  labourControl = new FormControl();

  filteredLabours: Observable<string[]>;
  filteredProjects: Observable<string[]>;

  labourNs: any;
  labour: any;
  project: any;
  labours: Array<any> = [];
  projects: Array<any> = [];
  stages: any;
  types: string[] = ['Daily Wages', 'Square ft', 'feet', 'other'];

  constructor(
    private labourService: LabourService,
    private projectService: ProjectService,
    private stageService: StageService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.labourWagesForm = new FormGroup({
      labour: this.labourControl,
      nic: new FormControl(''),
      projectName: this.projectControl,
      stageName: new FormControl(''),
      paymentType: new FormControl(''),
      paymentDate: new FormControl(''),
      amount: new FormControl(''),
      description: new FormControl(''),
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

  submit() {
    this.paymentService
      .addLabourWages(
        this.labourWagesForm.value.labour,
        this.labourWagesForm.value.nic,
        this.labourWagesForm.value.projectName,
        this.labourWagesForm.value.stageName,
        this.labourWagesForm.value.paymentDate,
        this.labourWagesForm.value.paymentType,
        this.labourWagesForm.value.amount,
        this.labourWagesForm.value.description
      )
      .subscribe((res) => {
        (res = alert('data added successfully')), this.labourWagesForm.reset();
      });
  }
}
