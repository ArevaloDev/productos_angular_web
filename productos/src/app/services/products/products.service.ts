import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CategoryResponse, Products } from '../../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  private url:string = environment.apiUrl;
  getProducts = () => {
    return this.http.get<Products[]>(`${this.url}/categorias`);
  }

  createCategory = (nombre:string) => {
    return this.http.post<CategoryResponse>(`${this.url}/categorias`, nombre );
  }
}
