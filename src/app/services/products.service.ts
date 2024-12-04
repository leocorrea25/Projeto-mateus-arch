import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "enviroments/enviroments";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class ProductService {
    private baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    createProduct(product: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/Product`, product);
    }
  
    // GET: Get all products
    getProducts(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/api/Product`);
    }
  
    // DELETE: Delete a product by ID
    deleteProduct(productId: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/Product/${productId}`);
    }
  
    // GET: Get a product by ID
    getProductById(productId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/Product/${productId}`);
    }
  
    // PUT: Update a product by ID
    updateProduct(productId: number, product: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/api/Product/${productId}`, product);
    }
  
    // GET: Get all products belonging to the user
    getUserProducts(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/api/Product/user-products`);
    }
  
  }