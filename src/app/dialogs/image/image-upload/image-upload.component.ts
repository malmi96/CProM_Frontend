import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../mime-type.validator';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  imageForm: FormGroup;
  imagePreview: string;
  constructor(
    public imageService: ImageService,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      stageid: new FormControl(this.data.stageid),
      projectid: new FormControl(this.data.projectid),
      imageName: new FormControl(),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({ image: file });
    this.imageForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  submit() {
    if (this.imageForm.invalid) {
      return;
    }
    this.imageService
      .addImage(
        this.imageForm.value.imageName,
        this.imageForm.value.image,
        this.imageForm.value.projectid,
        this.imageForm.value.stageid
      )
      .subscribe((res) => {
        res = this.dialogRef.close({
          msg: 'success',
        });
      });
  }
}
