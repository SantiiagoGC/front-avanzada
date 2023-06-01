import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginUser } from 'src/app/modelo/login-user';
import { UsuarioGet } from 'src/app/modelo/usuario-get';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  alerta!:Alerta;
  cliente: UsuarioGet = new UsuarioGet;
  clienteConsultado: UsuarioGet | undefined;
  cedulaVendedor: number = 0;

  constructor(private router: Router, private clienteService: ClienteService,
     private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private convertirObjeto(objeto: any): LoginUser {
    const cliente = new LoginUser();
    cliente.email = objeto["email"];
    cliente.password = objeto["password"];
    return cliente;
  }

    public login(): void {
      const cliente = this.convertirObjeto(this.loginForm.value);
      console.log(cliente);
      this.enviarInformacion(cliente);
      this.getClienteByEmail(cliente.email);

    }

    getClienteByEmail(emailVendedor: string) {
      this.clienteService.getPorEmail(emailVendedor).subscribe({
        next: data => {
          this.cliente = data.respuesta;
          this.clienteConsultado = this.cliente;
          this.cedulaVendedor = this.clienteConsultado?.cedula;
          console.log(this.cedulaVendedor);
          this.router.navigate(['/personal',  1010066053]);
        },
        error: error => {
          console.log(error.error.response);
        }
      });
    }


    private enviarInformacion(cliente: LoginUser) {
      const objeto = this;
      this.authService.login(cliente).subscribe({
        next: data => {
          objeto.tokenService.login(data.respuesta.token);
          console.log(objeto.tokenService);
        },
        error: error => {
          objeto.alerta = new Alerta (error.error.response, "danger");
        }
      });
    }}
