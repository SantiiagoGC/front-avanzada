import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPost } from '../modelo/usuario-post';
import { UsuarioGet } from '../modelo/usuario-get';
import { MensajeDto } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private userUrl = "http://localhost:8080/api/clientes";
  constructor(private http: HttpClient) { }

  public getAll(): Observable<UsuarioGet[]> {
    return this.http.get<UsuarioGet[]>(this.userUrl);
  }

  public get(cedula: number): Observable<MensajeDto> {
    return this.http.get<MensajeDto>(`${this.userUrl}/${cedula}`);
  }

  public getPorEmail(email: string): Observable<MensajeDto> {
    return this.http.get<MensajeDto>(`${this.userUrl}/buscar/${email}`);
  }

  public search(valor: string): Observable<UsuarioGet[]> {
    return this.http.get<UsuarioGet[]>(`${this.userUrl}/search/${valor}`);
  }

  public delete(cedula: number): Observable<MensajeDto> {
    return this.http.delete<MensajeDto>(`${this.userUrl}/${cedula}`);
  }

  public update(user: UsuarioPost): Observable<MensajeDto> {
    return this.http.put<MensajeDto>(this.userUrl, user);
  }
}
