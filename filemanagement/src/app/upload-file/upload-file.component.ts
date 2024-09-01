import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  selectedFiles: FileList | null = null;
  uploadResponse: any;

  constructor(private databaseService: DatabaseService) {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    if (this.selectedFiles) {
      const formData = new FormData();
      Array.from(this.selectedFiles).forEach(file => {
        formData.append('files', file);
      });

      this.databaseService.uploadFile(formData).subscribe(response => {
        this.uploadResponse = response;
      }, error => {
        console.error('Upload error', error);
      });
    }
  }
}
