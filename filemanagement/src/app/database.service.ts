import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:8081/api'; // Adjust this to your backend URL

  constructor(private http: HttpClient) { }

  // Upload a file
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-file`, formData);
  }  

  // Get all files
  getAllFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`);
  }

  // Get a file by ID
  getFileById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/files/${id}`);
  }

  // Delete a file by ID
  deleteFileById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/files/${id}`);
  }
}
