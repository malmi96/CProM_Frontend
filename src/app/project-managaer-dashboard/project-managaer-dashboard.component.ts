import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-project-managaer-dashboard',
  templateUrl: './project-managaer-dashboard.component.html',
  styleUrls: ['./project-managaer-dashboard.component.css']
})
export class ProjectManagaerDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  // dashboard.component.js

cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
   map(({ matches }) => {
     if (matches) {
       return {
         columns: 1,
         miniCard: { cols: 1, rows: 1 },
         chart: { cols: 1, rows: 2 },
         table: { cols: 1, rows: 4 },
       };
     }
     return {
        columns: 4,
       miniCard: { cols: 1, rows: 1 },
       chart: { cols: 2, rows: 2 },
       table: { cols: 4, rows: 4 },
     };
   })
 );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
