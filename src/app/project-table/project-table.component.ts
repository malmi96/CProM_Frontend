import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProjectTableDataSource } from './project-table-datasource';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: ProjectTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['projectName', 'projectStatus', 'projectOwner'];
  constructor(private projectService: ProjectService){}

  ngOnInit() {
    this.dataSource = new ProjectTableDataSource(this.projectService);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
