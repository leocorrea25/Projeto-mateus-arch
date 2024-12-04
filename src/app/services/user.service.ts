import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UserServiceApi {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}


  // Obter todos os usuários
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/User`);
  }

  // Obter um usuário específico pelo ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/User/${id}`);
  }

  // Excluir um usuário pelo ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/User/${id}`);
  }

  // Atualizar um usuário específico pelo ID
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/User/${id}`, user);
  }
}
