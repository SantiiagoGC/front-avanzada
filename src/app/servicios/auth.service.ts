import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPost } from '../modelo/usuario-post';
import { MensajeDto } from '../modelo/mensaje-dto';
import { LoginUser } from '../modelo/login-user';
import { TokenDTO } from '../modelo/token-dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authURL = "http://localhost:8080/api/auth";
  constructor(private http: HttpClient) { }

  public registrarCliente(cliente: UsuarioPost): Observable<MensajeDto> {
    return this.http.post<MensajeDto>(`${this.authURL}/registro`, cliente);
  }

  public login(sesion:LoginUser):Observable<MensajeDto>{
    return this.http.post<MensajeDto>(`${this.authURL}/login`, sesion);
  }

  public refresh(token:TokenDTO):Observable<MensajeDto>{
    return this.http.post<MensajeDto>(`${this.authURL}/refresh`, token);
  }

}
