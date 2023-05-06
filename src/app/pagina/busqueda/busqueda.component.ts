import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})

export class BusquedaComponent {
  textoBusqueda!: string;
  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.textoBusqueda = url[1].path;
      console.log(this.textoBusqueda);
    });
  }
}
