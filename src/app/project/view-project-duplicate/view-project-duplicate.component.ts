import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-view-project-duplicate',
  templateUrl: './view-project-duplicate.component.html',
  styleUrls: ['./view-project-duplicate.component.css'],
})
export class ViewProjectDuplicateComponent implements OnInit {
  ELEMENT_DATA: any;
  dataSource: any;
  displayedColumns: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private projectService: ProjectService) {}

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
}
