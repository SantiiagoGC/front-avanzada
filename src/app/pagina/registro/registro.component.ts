import { Component, OnInit } from '@angular/core';
import { UsuarioPost } from 'src/app/modelo/usuario-post';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      fotoPerfil: new FormControl('', [Validators.required]),
    });
  }

 // cliente: UsuarioPost;

  public registrar(): void {
    console.log(this.registroForm.value);
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
