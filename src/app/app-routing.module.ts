import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { PersonalComponent } from './pagina/personal/personal.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionCiudadComponent } from './pagina/gestion-ciudad/gestion-ciudad.component';

const routes: Routes = [
{ path: "", component: InicioComponent },
{ path: "login", component: LoginComponent },
{ path: "registro", component: RegistroComponent },
{ path: "personal", component: PersonalComponent },
{ path: "raro", component: GestionCiudadComponent },
{ path: "busqueda/:texto", component: BusquedaComponent },
{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
