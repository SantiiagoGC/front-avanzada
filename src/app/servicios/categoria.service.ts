import { Observable } from "rxjs";
import { MensajeDto } from "../modelo/mensaje-dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private catURL = "http://localhost:8080/api/categorias";

  categories!: any[];;
  constructor(private http: HttpClient) {

  }

  public getCategories(): Observable<MensajeDto> {
    return this.http.get<MensajeDto>(`${this.catURL}/obtener`);
  }

}
