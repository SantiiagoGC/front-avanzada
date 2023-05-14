import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../servicios/product.service";
import {ProductGetDTO} from "../../modelo/product-get-dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  titulo: string ="Lista de productos";

  productos:ProductGetDTO[] = [];

  constructor(private productoService: ProductService){

  }

  ngOnInit(): void {
    this.productoService.getAll().subscribe(
      p => this.productos = p
    );
  }

}


