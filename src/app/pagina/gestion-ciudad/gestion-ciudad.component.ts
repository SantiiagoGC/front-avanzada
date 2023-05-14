import { Component, OnInit } from '@angular/core';
import { UsuarioGet } from 'src/app/modelo/usuario-get';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-ciudad',
  templateUrl: './gestion-ciudad.component.html',
  styleUrls: ['./gestion-ciudad.component.css']
})
export class GestionCiudadComponent implements OnInit {

  registroForm!: FormGroup;

  seleccionados: UsuarioGet[] = [];
  usuarios: UsuarioGet[] = [];
  seleccionado!: UsuarioGet | null;
  btnTexto: string = "";
  textoBtnEliminar: string = "";
  iconTexto: string = "";
  clienteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
   }


  ngOnInit(): void {
    this.listar();
    this.clienteForm = this.formBuilder.group({
      cedula: new FormControl("", [Validators.required]),
      nombreUsuario: new FormControl("", [Validators.required]),
      fotoPerfil: new FormControl("", [Validators.required]),
      nombre: new FormControl("", [Validators.required]),
      apellido: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      telefono: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required])
    });
  }


  listar() {
    const usuario = new UsuarioGet();
    usuario.cedula = 1010066053;
    usuario.nombre = "Santiago Garcia";
    usuario.nombreUsuario = "Santii0628";
    usuario.correo = "Santii0628@gmail.com";
    usuario.direccion = "La tebaida - Quindio";
    usuario.telefono = "3234327001";
    usuario.fotoPerfil = "";
    this.usuarios.push(usuario);

    const usuario2 = new UsuarioGet();
    this.usuarios.push(usuario2);
    // Agregar otros usuarios aquí
}


  seleccionar(cliente: UsuarioGet, estado: boolean) {
    if (estado) {
      this.seleccionados.push(cliente);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != cliente);
    }
    this.actualizarMensaje();
  }

  actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nombreUsuario: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      cedula: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      fotoPerfil: new FormControl('', [Validators.required]),
    });
  }

  borrarClientes() {
    this.seleccionados.forEach(e => {
      this.usuarios = this.usuarios.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  crear() {
    this.btnTexto = "Crear nuevo";
    this.iconTexto = "plus";
    this.seleccionado = null;
    this.clienteForm.reset();
  }

  actualizar(cliente: UsuarioGet) {
    this.btnTexto = "Actualizar";
    this.iconTexto = "pencil";

    this.seleccionado = cliente;
    this.clienteForm.patchValue({
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      nombreUsuario: cliente.nombreUsuario,
      email: cliente.correo,
      fotoPerfil: cliente.fotoPerfil,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
  }


  enviarDatos() {
    const usuario = this.convertirObjeto(this.clienteForm.value);
    if (this.seleccionado != null) {
      const indice = this.usuarios.findIndex(e =>
        usuario.cedula == e.cedula);
      this.usuarios[indice] = usuario;
    } else {
      this.usuarios.push(usuario);
    }
  }

  convertirObjeto(formValue: any): UsuarioGet {
    const usuario = new UsuarioGet();
    usuario.cedula = formValue.cedula;
    usuario.nombre = formValue.nombre;
    usuario.nombreUsuario = formValue.nombreUsuario;
    usuario.correo = formValue.email;
    usuario.direccion = formValue.direccion;
    usuario.telefono = formValue.telefono;
    usuario.fotoPerfil = formValue.fotoPerfil;
    // agregar más propiedades aquí según sea necesario

    return usuario;
  }


}
