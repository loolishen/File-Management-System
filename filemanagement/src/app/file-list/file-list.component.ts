import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-list-file',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.css']
})
export class FileListComponent implements OnInit {

  files: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.databaseService.getAllFiles().subscribe(response => {
      this.files = response;
    }, error => {
      console.error('Error loading files', error);
    });
  }

  deleteFile(id: string): void {
    this.databaseService.deleteFileById(id).subscribe(() => {
      this.loadFiles(); // Refresh the list after deletion
    }, error => {
      console.error('Error deleting file', error);
    });
  }
}
