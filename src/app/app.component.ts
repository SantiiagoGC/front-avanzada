import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';
import { ClienteService } from './servicios/cliente.service';
import { UsuarioGet } from './modelo/usuario-get';

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
  cedulaVendedor: number | undefined;
  clienteConsultado: UsuarioGet | undefined;
  cliente: UsuarioGet = new UsuarioGet;

  private router: Router;

  constructor(private clienteService: ClienteService,private activatedRoute: ActivatedRoute, router: Router, private tokenService: TokenService, private sesionService: SesionService) {
    this.router = router;
  }

  iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }

  ngOnInit(): void {
    const objeto = this;
    this.sesionService.currentMessage.subscribe({
      next(value) {
        objeto.actualizarSesion(value, objeto.tokenService.getUsername());
      }
    });

    this.actualizarSesion(this.tokenService.isLogged(), this.tokenService.getUsername());
    console.log(this.tokenService.getEmail());

    this.getClienteByEmail(this.tokenService.getEmail());


  }

  getClienteByEmail(email: string) {
    this.clienteService.getPorEmail(email).subscribe({
      next: data => {
        this.cliente = data.respuesta;
        this.clienteConsultado = this.cliente; // Guardar el cliente consultado en la variable clienteConsultado
        console.log(this.cliente);
        this.cedulaVendedor = this.clienteConsultado.cedula;
        console.log(this.cedulaVendedor);
        this.router.navigate(['/personal', this.cedulaVendedor]);

      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  private actualizarSesion(estado: boolean, username: string | null) {
    this.isLogged = estado;
    if (username != null) {
      this.username = username;
    }
  }

  logout() {
    this.tokenService.logout();
  }
}
