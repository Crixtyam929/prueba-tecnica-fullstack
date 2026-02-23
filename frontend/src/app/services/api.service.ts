import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Post } from '../models/posts.model';
import { Album } from '../models/album.model';
import { LogRequest } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPostsByUser(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/posts/user/${userId}`);
  }



  getAlbumsByUser(userId: number) {
    return this.http.get<Album[]>(`${this.baseUrl}/albums/${userId}`);
  }



  getLogs() {
    return this.http.get<LogRequest[]>(`${this.baseUrl}/logs`);
  }

  createLog(log: LogRequest) {
    return this.http.post<LogRequest>(`${this.baseUrl}/logs`, log);
  }

  updateLog(id: number, log: LogRequest) {
    return this.http.put<LogRequest>(`${this.baseUrl}/logs/${id}`, log);
  }

  deleteLog(id: number) {
    return this.http.delete(`${this.baseUrl}/logs/${id}`);
  }



  simulateError(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?simulateError=true`);
  }
}
