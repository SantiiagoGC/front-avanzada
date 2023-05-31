import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'UniMarket';
  uq = 'Universidad del Quindío - Progamación avanzada - 2023';
  isLogged = false;
  username: string = "";

  private router: Router;

  constructor(router: Router, private tokenService: TokenService, private sesionService: SesionService) {
    this.router = router;
  }

  iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }

  ngOnInit(): void {
    const objeto = this
    this.sesionService.currentMessage.subscribe({
      next(value) {
        objeto.actualizarSesion(value, objeto.tokenService.getUsername());
      }
    });

    this.actualizarSesion( this.tokenService.isLogged(), this.tokenService.getUsername()! );
  }

    private actualizarSesion(estado:boolean, username:string | null){
      this.isLogged = estado;
      if(username != null){
      this.username = username;
      }
    }

    logout() {
      this.tokenService.logout();
    }
}
