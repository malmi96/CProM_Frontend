import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ProjectService } from '../services/project/project.service';
import { StageService } from '../services/stage/stage.service';
import { ThrowStmt } from '@angular/compiler';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  userId: string;
  images: any;
  project: any;
  stages: any;
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private stageService: StageService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.projectService
      .getProjectByCustomerId(this.userId)
      .subscribe((project) => {
        this.project = project;
      });

    this.stageService.getStagesByCustomerId(this.userId).subscribe((stages) => {
      this.stages = stages;
    });
  }

  onClick(stage: any) {
    console.log(stage);
    this.imageService.getImageByStageName(stage).subscribe((res) => {
      this.images = res;
    });
  }
}
