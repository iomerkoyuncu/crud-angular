import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../interfaces/User';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'app-id': environment.appId,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user?limit=50`, httpOptions);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`, httpOptions);
  }

  createUser(user: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/create`, user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/user/${user.id}`,
      user,
      httpOptions
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/${id}`, httpOptions);
  }
}
