import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO } from 'src/app/modelo/category-dto';
import { ProductGetDTO2 } from 'src/app/modelo/product-get-dto copy';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductService } from 'src/app/servicios/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id: number = 0;
  producto: ProductGetDTO2 | undefined;
  categorias: CategoryDTO[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private categoriaService: CategoriaService) { }

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

  getProductById(id: number) {
    this.productService.getProduct(id).subscribe({
      next: data => {
        this.producto = data.respuesta;
        console.log(this.producto);
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


}
