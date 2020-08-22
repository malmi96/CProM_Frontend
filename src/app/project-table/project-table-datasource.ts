import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../interfaces/project';




/**
 * Data source for the ProjectTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProjectTableDataSource extends DataSource<any> {
  paginator: MatPaginator;
  sort: MatSort;

  constructor(
    private projectService: ProjectService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any> {
    const dataMutations = [
      of('Initial load'),
    ];

    return merge(...dataMutations).pipe(mergeMap(() => {
      return this.projectService.getProject();
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
}
