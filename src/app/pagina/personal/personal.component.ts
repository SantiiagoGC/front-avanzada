import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioGet } from 'src/app/modelo/usuario-get';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit{
  clienteConsultado: UsuarioGet | undefined;
  cliente: UsuarioGet = new UsuarioGet;
  id: number = 0;
  cedula: number = 0;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cedula = +params['cedulaVendedor'];
      this.getClienteById(this.cedula);
      console.log("La cedula es:"+this.cedula);
    });
  }

  getClienteById(cedula: number) {
    this.clienteService.get(cedula).subscribe({
      next: data => {
        this.cliente = data.respuesta;
        this.clienteConsultado = this.cliente; // Guardar el cliente consultado en la variable clienteConsultado
        console.log(this.cliente);
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  getNombreById()
  {
    if (this.cliente)
    {
      return this.cliente.nombre;
    }
    return 'no';
  }

  getCedulaById()
  {
    if (this.cliente)
    {
      return this.cliente.cedula;
    }
    return 'no';
  }

  getFotoById()
  {
    if (this.cliente)
    {
      return this.cliente.fotoPerfil;
    }
    return 'no';
  }

  getCorreoById()
  {
    if (this.cliente)
    {
      return this.cliente.correo;
    }
    return 'no';
  }

  getDireccionById()
  {
    if (this.cliente)
    {
      return this.cliente.direccion;
    }
    return 'no';
  }

  getNombreUsuarioById()
  {
    if (this.cliente)
    {
      return this.cliente.nombreUsuario;
    }
    return 'no';
  }

  getTelefonoById()
  {
    if (this.cliente)
    {
      return this.cliente.telefono;
    }
    return 'no';
  }


}
