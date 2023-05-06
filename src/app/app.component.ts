import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private router:Router;

  constructor(router:Router) {
    this.router = router;
  }

  iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
  }

  title = 'my-app';
  uq = 'Universidad del Quindío - Progamación avanzada - 2023';
}
