import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api';  // Ensure this matches your Django endpoint

  constructor(private http: HttpClient) {}

  createPost(title: string, author: string, content: string): Observable<any> {
    const postData = { nameb: title, aname: author, blog: content };  // Adjust to match Django model fields
    return this.http.post<any>(`${this.apiUrl}/create/`, postData);
  }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll/`);  // Endpoint to fetch all posts
  }

  addComment(postId: number, comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addComment/`, { postId, comment });
  }
  updatePost(postId: number, postData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update/${postId}/`, postData, { headers });
  }
  deletePost(postId: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.apiUrl}/delete/${postId}/`, { headers });
  }
}