import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from 'src/app/services/stage/stage.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  edit = false;
  stage = false;
  foundation = false;
  brickWork = false;
  roofing = false;
  painting = false;
  stages: any;
  stageNames: string[];
  restageNames: Array<any> = [];
  id: string;
  project: any;
  editProjectForm: FormGroup;
  values = '';
  customerControl = new FormControl([Validators.required]);
  customer: any;
  resultArray: Array<any> = [];
  statuses: string[] = [
    'Started',
    'Ongoing',
    'Temporary Stopped',
    'Stopped',
    'Finished',
  ];
  filteredCustomerNames: Observable<string[]>;
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private stageService: StageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.getProjectById(this.id).subscribe((project: any) => {
      this.project = project;
      this.editProjectForm = new FormGroup({
        customerName: new FormControl(this.project.projectOwner.customerName),
        city: new FormControl(''),
        projectName: new FormControl(this.project.projectName, [
          Validators.required,
        ]),
        projectLocation: new FormControl(this.project.projectLocation, [
          Validators.required,
        ]),
        startingDate: new FormControl(this.project.startedDate, [
          Validators.required,
        ]),
        endingDate: new FormControl(this.project.projectedEndingDate, [
          Validators.required,
        ]),
        status: new FormControl(this.project.projectStatus, [
          Validators.required,
        ]),
      });
    });

    this.stageService.getStagesByProject(this.id).subscribe((stages) => {
      this.stages = stages;
      this.stageNames = this.stages.map((stage) => {
        return stage.stageName;
      });
      this.stageNames.forEach((name) => {
        this.restageNames.push(name.split(' -')[0]);
      });
    });

    this.userService.getCustomer().subscribe((customer: any) => {
      this.customer = customer;
      this.customer.forEach((response) => {
        this.resultArray.push(response.customerName);
      });
    });

    this.filteredCustomerNames = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCustomer(value))
    );
  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.resultArray.filter((customerName) =>
      customerName.toLowerCase().includes(filterValue)
    );
  }

  getErrorMessage() {
    if (this.customerControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.editProjectForm.get('projectLocation').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.editProjectForm.get('projectName').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.editProjectForm.get('startingDate').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.editProjectForm.get('endingDate').hasError('required')) {
      return 'You must enter a value';
    }
  }

  onKey(value: string) {
    this.values += value + ' | ';
  }

  onEdit() {
    this.edit = true;
  }

  onStage() {
    if (this.stage === false) {
      this.brickWork = false;
      this.roofing = false;
      this.foundation = false;
      this.painting = false;
      this.stage = true;
    } else {
      return (this.stage = false);
    }
  }
  onFoundation() {
    this.stage = false;
    this.brickWork = false;
    this.roofing = false;
    this.painting = false;
    this.foundation = true;
  }

  onBrickWork() {
    this.stage = false;
    this.roofing = false;
    this.foundation = false;
    this.painting = false;
    this.brickWork = true;
  }

  onPainting() {
    this.stage = false;
    this.foundation = false;
    this.brickWork = false;
    this.roofing = false;
    this.painting = true;
  }

  onRoofing() {
    this.stage = false;
    this.foundation = false;
    this.brickWork = false;
    this.painting = false;
    this.roofing = true;
  }

  onCancel() {
    this.edit = false;
  }

  submit() {
    if (this.editProjectForm.value.city !== '') {
      this.editProjectForm.value.projectName =
        this.editProjectForm.value.city + ' - site';
    }
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService
      .updateProject(this.id, this.editProjectForm.value)
      .subscribe(
        (res) => alert(res),
        (err) => alert(err)
      );
    location.reload();
  }

  onDelete() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService
      .deleteProject(this.id)
      .subscribe(res => {
        this.router.navigate(['/project/view']);
      });
  }
}
