import { Component, OnInit } from '@angular/core';
import { MachineryService } from 'src/app/services/machinery/machinery.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditMachineryComponent } from 'src/app/dialogs/edit-machinery/edit-machinery.component';

@Component({
  selector: 'app-view-machinery',
  templateUrl: './view-machinery.component.html',
  styleUrls: ['./view-machinery.component.scss'],
})
export class ViewMachineryComponent implements OnInit {
  machinery = false;
  dataSource: any;
  displayedColumns: string[];
  ELEMENT_DATA: any;

  constructor(
    private machineryService: MachineryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.machineryService.getMachinery().subscribe((machinery) => {
      this.ELEMENT_DATA = machinery;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'machineryName',
        'machineryType',
        'machineryCondition',
        'date',
      ];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(EditMachineryComponent, {
      data: { machineryId: id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.machineryService
          .deleteMachinery(data.delete.machineryId)
          .subscribe((res) => {
            res = this.machineryService
              .getMachinery()
              .subscribe((machinery) => {
                this.ELEMENT_DATA = machinery;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'machineryName',
                  'machineryType',
                  'machineryCondition',
                  'date',
                ];
              });
          });
      }
      if (data.formValue) {
        this.machineryService
          .updateMachinery(data.machineryId, data.formValue)
          .subscribe((res) => {
            res = this.machineryService
              .getMachinery()
              .subscribe((machinery) => {
                this.ELEMENT_DATA = machinery;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'machineryName',
                  'machineryType',
                  'machineryCondition',
                  'date',
                ];
              });
          });
      }
    });
  }
}
