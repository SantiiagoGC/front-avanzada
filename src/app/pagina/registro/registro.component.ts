import { Component } from '@angular/core';
import { UsuarioPost } from 'src/app/modelo/usuario-post';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  imagenCliente!: string;
  registroForm!: FormGroup;
  alerta!:Alerta;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private imagenService: ImagenService) {
    this.crearFormulario();
    //this.cliente = new UsuarioPost();
  }


  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nombreUsuario: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      cedula: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
    });
  }

  // cliente: UsuarioPost;

  public registrar(): void {
    const objeto = this;
    const formData = new FormData();
    const cliente = this.convertirObjeto(this.registroForm.value);
    console.log(cliente);
      this.enviarInformacion(cliente);

  }

  private enviarInformacion(cliente: UsuarioPost) {
    const objeto = this;
    this.authService.registrarCliente(cliente).subscribe({
      next(value) {
        console.log(value);
        objeto.alerta = new Alerta(value.respuesta, "success");
      },
      error(err) {
        objeto.alerta = new Alerta(err.error.respuesta, "danger");
        console.log(err);
      },
    });
  }

  private convertirObjeto(objeto: any): UsuarioPost {
    const cliente = new UsuarioPost();
    cliente.cedula = objeto["cedula"];
    cliente.nombre = objeto["nombre"];
    cliente.nombreUsuario = objeto["nombreUsuario"];
    cliente.password = objeto["password"];
    cliente.email = objeto["email"];
    cliente.direccion = objeto["direccion"];
    cliente.telefono = objeto["telefono"];
    cliente.fotoPerfil = "https://picsum.photos/700/400?random";
    return cliente;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registroForm.patchValue({
        imagen: file
      });
    }
  }

}
