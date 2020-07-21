import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LabourService } from 'src/app/services/labour/labour.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabourDialogComponent } from 'src/app/dialogs/labour/labour-dialog/labour-dialog.component';

@Component({
  selector: 'app-view-labour',
  templateUrl: './view-labour.component.html',
  styleUrls: ['./view-labour.component.css'],
})
export class ViewLabourComponent implements OnInit {
  labour = false;
  dataSource: any;
  displayedColumns: string[];
  ELEMENT_DATA: any;

  constructor(
    private labourService: LabourService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.labourService.getLabour().subscribe((labour) => {
      this.ELEMENT_DATA = labour;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'labourCategory',
        'labourType',
        'labourName',
        'labourNIC',
        'labourContactNo',
      ];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUser(id: string) {
    this.labour = true;
    this.router.navigate([`/userEdit/customer/${id}`]);
  }

  openDialog(labourId: string): void {
    const dialogRef = this.dialog.open(LabourDialogComponent, {
      data: { id: labourId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.labourService.deleteLabour(data.delete.labourId).subscribe();
        return location.reload();
      }
      if (data.formValue) {
        console.log(data.formValue.labourName);
        this.labourService
          .updateLabour(data.labourId, data.formValue)
          .subscribe();
        // (user) => alert(`UPDATE ${user}`),
        // (err) => alert(`error ${err}`)
        return location.reload();
      }
    });
  }
}
