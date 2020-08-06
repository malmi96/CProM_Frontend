import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { StageService } from 'src/app/services/stage/stage.service';

@Component({
  selector: 'app-utility-payments',
  templateUrl: './utility-payments.component.html',
  styleUrls: ['./utility-payments.component.css'],
})
export class UtilityPaymentsComponent implements OnInit {
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
    private stageService: StageService
  ) {}

  ngOnInit(): void {
    this.utilityPaymentForm = new FormGroup({
      paymentType: new FormControl(''),
      projectName: this.projectControl,
      stageName: new FormControl(''),
      paymentDate: new FormControl(''),
      amount: new FormControl(''),
      description: new FormControl(''),
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

  submit() {
    this.paymentService
      .addUtilityPayment(
        this.utilityPaymentForm.value.paymentType,
        this.utilityPaymentForm.value.projectName,
        this.utilityPaymentForm.value.stageName,
        this.utilityPaymentForm.value.paymentDate,
        this.utilityPaymentForm.value.amount,
        this.utilityPaymentForm.value.description
      )
      .subscribe((res) => {
        (res = alert('data added successfully')),
          this.utilityPaymentForm.reset();
      });
  }
}
