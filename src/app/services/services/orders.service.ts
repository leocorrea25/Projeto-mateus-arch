import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Faz uma requisição POST para criar uma nova ordem.
   * @param order Dados da ordem a serem enviados.
   * @returns Um Observable com a resposta.
   */
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Order`, order);
  }


  /**
   * Faz uma requisição GET para obter uma ordem específica pelo ID.
   * @param orderId ID da ordem.
   * @returns Um Observable com a resposta.
   */
  getOrder(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Order/${orderId}`);
  }

  /**
   * Faz uma requisição GET para obter todas as ordens.
   * @returns Um Observable com a lista de ordens.
   */
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Order/user-Orders`);
  }

  /**
   * Faz uma requisição PUT para atualizar uma ordem existente.
   * @param orderId ID da ordem.
   * @param order Dados atualizados da ordem.
   * @returns Um Observable com a resposta.
   */
  updateOrder(orderId: number, order: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Order/${orderId}`, order);
  }

  /**
   * Faz uma requisição DELETE para remover uma ordem pelo ID.
   * @param orderId ID da ordem.
   * @returns Um Observable com a resposta.
   */
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Order/${orderId}`);
  }

  confirmOrder(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/Order/${id}/complete`, {});
  }
  
}
