import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDto } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})

export class ImagenService {
  private imgURL = "http://localhost:8080/api/imgs";

  constructor(private http: HttpClient) { }

  public subirImagen(imagen: FormData): Observable<MensajeDto> {
    return this.http.post<MensajeDto>(`${this.imgURL}/upload`, imagen);
  }

  public eliminarImagen(id: string): Observable<MensajeDto> {
    return this.http.delete<MensajeDto>(`${this.imgURL}/${id}`);
  }

}
