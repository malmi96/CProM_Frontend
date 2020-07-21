import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LabourService } from 'src/app/services/labour/labour.service';
import { StageService } from 'src/app/services/stage/stage.service';
import { threadId } from 'worker_threads';
import { DataAddDialogComponent } from 'src/app/dialogs/success/data-add-dialog/data-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stage-component',
  templateUrl: './stage-component.component.html',
  styleUrls: ['./stage-component.component.css'],
})
export class StageComponentComponent implements OnInit {
  stageForm: FormGroup;
  stageData = false;
  labour: any;
  labourControl = new FormControl();
  id: string;
  project: any;
  stage: any;
  resultArray: Array<any> = [];
  stages: string[] = [
    'Foundation',
    'Brick Work',
    'Ceiling/Roofing',
    'Painting',
  ];
  statuses: string[] = [
    'Started',
    'Ongoing',
    'Temporary Stopped',
    'Stopped',
    'Finished',
  ];
  selected = 'Foundation';
  filteredLabourNames: Observable<string[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private labourService: LabourService,
    private stageService: StageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.getProjectById(this.id).subscribe((project: any) => {
      this.project = project;
      this.stageForm = new FormGroup({
        stageSelect: new FormControl('Foundation'),
        stageName: new FormControl('Foundation - ' + this.project.projectName),
        labourName: this.labourControl,
        startingDate: new FormControl(''),
        endingDate: new FormControl(''),
        status: new FormControl(''),
      });
    });

    this.labourService.getLabour().subscribe((labour: any) => {
      this.labour = labour;
      this.labour.forEach((response) => {
        this.resultArray.push(response.labourName);
      });
    });

    this.filteredLabourNames = this.labourControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterLabour(value))
    );

    this.stageService.getStage().subscribe((stage) => {
      this.stage = stage;
      console.log(stage);
    });
  }
  private _filterLabour(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.resultArray.filter((labourName) =>
      labourName.toLowerCase().includes(filterValue)
    );
  }

  setValue(value: string) {
    console.log(value);
  }

  submit() {
    this.stageForm.value.stageName =
      this.stageForm.value.stageSelect + ' - ' + this.project.projectName;
    console.log(this.stageForm.value);
    this.stageService
      .addStage(
        this.stageForm.value.stageName,
        this.stageForm.value.labourName,
        this.stageForm.value.startingDate,
        this.stageForm.value.endingDate,
        this.stageForm.value.status,
        this.project.projectName
      )
      .subscribe(
        (res) =>
          (res = this.dialog.open(DataAddDialogComponent) && location.reload())
      );
  }
}
