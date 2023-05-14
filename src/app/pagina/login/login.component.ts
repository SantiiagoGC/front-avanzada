import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginUser } from 'src/app/modelo/login-user';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  alerta!:Alerta;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    this.crearFormulario();
    //this.cliente = new UsuarioPost();
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
      const objeto = this;
      const formData = new FormData();
      const cliente = this.convertirObjeto(this.loginForm.value);
      console.log(cliente);
        this.enviarInformacion(cliente);


    }

    private enviarInformacion(cliente: LoginUser) {
      const objeto = this;
      this.authService.login(cliente).subscribe({
        next(value) {
        objeto.tokenService.login(value.respuesta.token);
        },
        error(err) {
        objeto.alerta = new Alerta(err.error.respuesta, "danger");
        },
        });

      }}
