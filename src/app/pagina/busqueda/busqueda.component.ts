import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGetDTO2 } from 'src/app/modelo/product-get-dto copy';
import { ProductService } from "../../servicios/product.service";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})

export class BusquedaComponent {
  textoBusqueda!: string;
  productos: ProductGetDTO2[] = [];
  contador: number = 1;

  constructor(private productoService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(url => {
      this.textoBusqueda = url[1].path;
      this.buscar();
      console.log(this.textoBusqueda);
    });
  }

  buscar() {
    this.productos.splice;
    this.productoService.listProductByTitle(this.textoBusqueda).subscribe({
      next: data => {
        this.productos = data.respuesta;
        this.productos.forEach(producto => {
          producto.id = this.contador;
          this.contador++;
        })
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  mostrar() {
    this.productos.splice;
    this.productoService.listarAllProducts().subscribe({
      next: data => {
        this.productos = data.respuesta;
        this.productos.forEach(producto => {
          producto.id = this.contador;
          this.contador++;
        })
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }


  verDetalleProducto(id: number) {
    this.router.navigate(['/producto', id]);
  }

}
