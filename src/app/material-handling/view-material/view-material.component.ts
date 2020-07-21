import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.scss'],
})
export class ViewMaterialComponent implements OnInit {
  editField: string;
  materials: any;
  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe((material) => {
      this.materials = material;
    });
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.materials[id][property] = editField;
  }

  remove(id: any) {}

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
