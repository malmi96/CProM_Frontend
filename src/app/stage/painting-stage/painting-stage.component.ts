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
import { ImageUploadComponent } from 'src/app/dialogs/image/image-upload/image-upload.component';
import { ImageService } from 'src/app/services/image/image.service';
import { TaskComponent } from 'src/app/dialogs/task/task.component';

@Component({
  selector: 'app-painting-stage',
  templateUrl: './painting-stage.component.html',
  styleUrls: ['./painting-stage.component.css'],
})
export class PaintingStageComponent implements OnInit {
  imageView = false;
  images: any;
  paintingForm: FormGroup;
  stageData = false;
  labour: any;
  labourControl = new FormControl();
  id: string;
  project: any;
  stageList: any;
  element: any;
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
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private labourService: LabourService,
    private stageService: StageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.imageView = false;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.getProjectById(this.id).subscribe((project: any) => {
      this.project = project;
      this.stageService.getStagesByProject(this.id).subscribe((stages) => {
        this.stageList = stages;
        this.stageList.forEach((element) => {
          if (element.stageName === 'Painting - ' + this.project.projectName) {
            this.element = element;
            this.paintingForm = new FormGroup({
              elementid: new FormControl(this.element._id),
              projectName: new FormControl(
                this.element.projectName.projectName
              ),
              stageName: new FormControl(this.element.stageName),
              labourName: new FormControl(
                this.element.stageSupervisor.labourName
              ),
              startingDate: new FormControl(this.element.stageStartedDate),
              endingDate: new FormControl(this.element.stageEndingDate),
              status: new FormControl(this.element.stageStatus),
            });
          }
        });
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
    console.log(this.paintingForm.value);
    this.stageService
      .updateStage(this.paintingForm.value.elementid, this.paintingForm.value)
      .subscribe((done) => {
        done = alert('done');
      });
  }
  onRemove() {
    this.stageService
      .deleteStage(this.paintingForm.value.elementid)
      .subscribe((done: any) => {
        done = alert('deleted');
      });
  }
  onBack() {
    this.imageView = false;
  }
  onImages() {
    this.imageView = true;
    this.imageService
      .getImages(
        this.activatedRoute.snapshot.paramMap.get('id'),
        this.paintingForm.value.elementid
      )
      .subscribe((images: any) => {
        this.images = images;
      });
  }

  deleteImage(id: string) {
    this.imageService.deleteImage(id).subscribe((res) => {
      res = this.imageService
        .getImages(
          this.activatedRoute.snapshot.paramMap.get('id'),
          this.paintingForm.value.elementid
        )
        .subscribe((images: any) => {
          this.images = images;
        });
    });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      data: {
        stageid: id,
        projectid: this.activatedRoute.snapshot.paramMap.get('id'),
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.msg === 'success') {
        this.imageService
          .getImages(
            this.activatedRoute.snapshot.paramMap.get('id'),
            this.paintingForm.value.elementid
          )
          .subscribe((images: any) => {
            this.images = images;
          });
      }
    });
  }
  onTask(id: string): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      data: {
        stageid: id,
        projectid: this.activatedRoute.snapshot.paramMap.get('id'),
      },
    });
  }
}
