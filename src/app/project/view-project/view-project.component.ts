import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project/project.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

export interface Project {
  name: string;
  owner: string;
  location: string;
  status: string;
  startingDate: string;
  endingDate: string;
}

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  project: any;
  ELEMENT_DATA: any;
  dataSource: any;
  displayedColumns: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private projectService: ProjectService,
    private dataPipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getProject().subscribe((project) => {
      this.ELEMENT_DATA = project;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'projectName',
        'projectOwner',
        'projectLocation',
        'projectStatus',
        'startedDate',
        'projectedEndingDate',
      ];
    });
  }

  onProject(id: string) {
    this.router.navigate([`/editProject/${id}`]);
  }
}
