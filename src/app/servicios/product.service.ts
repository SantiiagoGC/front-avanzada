import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGetDTO } from '../modelo/product-get-dto';
import { ProductPostDTO } from '../modelo/producto-post';
import { MensajeDto } from '../modelo/mensaje-dto';
import { ProductGetDTO2 } from '../modelo/product-get-dto copy';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productos:ProductGetDTO2[];

  private productUrl = "http://localhost:8080/api/productos";

  constructor(private http: HttpClient) {
    this.productos = [];
    this.productos.push(new ProductGetDTO2(1, "Televisor LG 4K", 2, "Descripcion 1", 3500000,
    1010066053, ["Rutas"] , 1));
    this.productos.push(new ProductGetDTO2(2, "Tenis Nike", 4, "Descripcion 2", 650000,
    1010066053, ["Rutas2"], 1));
    //CREE OTROS PRODUCTOS (AL MENOS 6 MÁS)

   }

   public listar():ProductGetDTO2[]{
    return this.productos;
    }

  public getAll(): Observable<ProductGetDTO[]>{
    return this.http.get<ProductGetDTO[]>(this.productUrl);
  }

  public listarAllProducts(): Observable<MensajeDto> {
    return this.http.get<MensajeDto>(`${this.productUrl}/obtener_productos`);
  }

  public registrarProducto(producto: ProductPostDTO): Observable<MensajeDto> {
    return this.http.post<MensajeDto>(`${this.productUrl}/crear`, producto);
  }

}
