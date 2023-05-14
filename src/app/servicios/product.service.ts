import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGetDTO } from '../modelo/product-get-dto';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private productUrl = "http://localhost:8080/api/productos/a";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ProductGetDTO[]>{
    return this.http.get<ProductGetDTO[]>(this.productUrl);
  }

}
