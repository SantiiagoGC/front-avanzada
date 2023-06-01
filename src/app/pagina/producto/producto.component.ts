import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO } from 'src/app/modelo/category-dto';
import { ProductGetDTO2 } from 'src/app/modelo/product-get-dto copy';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductService } from 'src/app/servicios/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioGet } from 'src/app/modelo/usuario-get';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id: number = 0;
  producto: ProductGetDTO2 | undefined;
  categorias: CategoryDTO[] = [];
  cliente: UsuarioGet = new UsuarioGet;
  producto2: ProductGetDTO2 | undefined;
  clienteConsultado: UsuarioGet | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoriaService: CategoriaService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getProductById(this.id);
    });

    this.categoriaService.getCategories().subscribe({
      next: data => {
        this.categorias = data.respuesta;
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  getClienteById(cedulaVendedor: number) {
    this.clienteService.get(cedulaVendedor).subscribe({
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

  getProductById(id: number) {
    this.productService.getProduct(id).subscribe({
      next: data => {
        this.producto = data.respuesta;
        console.log(this.producto);
        if (this.producto?.cedulaVendedor) {
          this.getClienteById(this.producto.cedulaVendedor);
        } else {
          console.log('La cédula del vendedor no está definida');
        }
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  getImagenById() {
    if (this.producto) {
      return this.producto.rutasImagenes[0];
    }
    return '';
  }

  getId() {
    if (this.producto) {
      return this.producto.id;
    }
    return '';
  }

  getNombreById() {
    if (this.producto) {
      return this.producto.nombre;
    }
    return '';
  }

  getPrecioById() {
    if (this.producto) {
      return this.producto.precio;
    }
    return 0;
  }

  getUnidadesById() {
    if (this.producto) {
      return this.producto.unidades;
    }
    return 0;
  }

  getDescripcionById() {
    if (this.producto) {
      console.log(this.producto.descripcion);
      return this.producto.descripcion;
    }
    return '';
  }

  getCategoriasById() {
    const idCategoria = this.producto?.idCategoria;
    if (idCategoria) {
      const categoria = this.categorias.find(c => c.id === idCategoria);
      if (categoria) {
        return categoria.name;
      }
    }
    return '';
  }

  getClienteNombre(){
    return this.cliente.nombreUsuario;
  }

  verDetalleProducto(id: number) {
    this.router.navigate(['/producto', id]);
  }
}
