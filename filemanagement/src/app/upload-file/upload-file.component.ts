import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  selectedFiles: FileList | null = null;
  uploadResponse: any;

  @Output() fileUploaded = new EventEmitter<void>(); // EventEmitter to notify when upload is complete

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    if (this.selectedFiles) {
      const formData = new FormData();
      Array.from(this.selectedFiles).forEach(file => {
        formData.append('files', file);
      });

      this.uploadFiles(formData);
    }
  }

  uploadFiles(formData: FormData): void {
    this.http.post<any>('http://localhost:8081/api/upload-file', formData)
    .subscribe(
      (response) => {
        this.uploadResponse = response;
        console.log('File(s) uploaded successfully:', response);
        this.fileUploaded.emit(); // Emit event after successful upload
      },
      (error) => {
        console.error('Error uploading file(s):', error);
      }
    );
  }
}
