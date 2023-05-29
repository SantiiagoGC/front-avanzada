import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { PersonalComponent } from './pagina/personal/personal.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionCiudadComponent } from './pagina/gestion-ciudad/gestion-ciudad.component';
import { LoginGuard } from './guards/login.guard';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';

const routes: Routes = [
{ path: "", component: HomeComponent },
{ path: "home/:texto", component: HomeComponent },
{ path: "login", component: LoginComponent },
{ path: "registro", component: RegistroComponent },
{ path: "personal", component: PersonalComponent },
{ path: "raro", component: GestionCiudadComponent },
{ path: "crear_producto", component: CrearProductoComponent },
{ path: "busqueda/:texto", component: BusquedaComponent },
{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
{ path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
