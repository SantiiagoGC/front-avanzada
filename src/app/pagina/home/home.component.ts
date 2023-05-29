import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../servicios/product.service";
import { ProductGetDTO } from "../../modelo/product-get-dto";
import { ProductGetDTO2 } from 'src/app/modelo/product-get-dto copy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  titulo: string = "Lista de productos";

  productos: ProductGetDTO2[] = [];
  filtro: ProductGetDTO2[] = [];
  textoBusqueda: string;

  constructor(private productoService: ProductService, private route: ActivatedRoute) {
    this.productos = this.productoService.listar();
    this.filtro = [];

    this.textoBusqueda = "";
    this.route.params.subscribe(params => {
      this.textoBusqueda = params["texto"];
      this.filtro = this.productos.filter( p =>
      p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) );
      });

}

}
/*ngOnInit(): void {

  /*this.productoService.listarAllProducts().subscribe({
    next: data => {
      this.productos = data.respuesta;
    },
    error: error => {
      console.log(error.error.response);
    }
  })*/
