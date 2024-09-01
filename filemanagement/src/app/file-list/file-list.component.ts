import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-file',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files: any[] = []; // Store the list of files
  sortedBy: string = 'filename'; // Default sorting criterion
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllFiles(); // Fetch all files when component initializes
  }

  getAllFiles(): void {
    this.http.get<any[]>('http://localhost:8081/api/files')
    .subscribe(
      (response) => {
        this.files = response;
        this.sortFiles(); // Sort files after loading them
        console.log('Files loaded:', response);
      },
      (error) => {
        console.error('Error loading files:', error);
      }
    );
  }

  deleteFile(fileId: string): void {
    this.http.delete<any>(`http://localhost:8081/api/files/${fileId}`)
    .subscribe(
      (response) => {
        console.log('File deleted:', response);
        this.getAllFiles(); // Refresh the file list after deletion
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }

  // Sorting method
  sortFiles(): void {
    this.files.sort((a, b) => {
      let comparison = 0;

      if (a[this.sortedBy] < b[this.sortedBy]) {
        comparison = -1;
      } else if (a[this.sortedBy] > b[this.sortedBy]) {
        comparison = 1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    console.log(`Files sorted by ${this.sortedBy} in ${this.sortDirection} order`, this.files);
  }

  // Handle sorting criterion change from dropdown
  onSortCriterionChange(event: any): void {
    this.sortedBy = event.target.value;
    this.sortFiles();
  }

  // Handle sorting direction change
  onSortDirectionChange(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortFiles();
  }
}
