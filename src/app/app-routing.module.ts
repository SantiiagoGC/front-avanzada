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
import { ProductoComponent } from './pagina/producto/producto.component';
import { CompraComponent } from './pagina/compra/compra.component';

const routes: Routes = [
{ path: "", component: HomeComponent },
{ path: "home/:texto", component: HomeComponent },
{ path: "login", component: LoginComponent },
{ path: "registro", component: RegistroComponent },
{ path: "personal/:cedulaVendedor", component: PersonalComponent },
{ path: "raro", component: GestionCiudadComponent },
{ path: "crear_producto", component: CrearProductoComponent },
{ path: "busqueda/:texto", component: BusquedaComponent },
{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
{ path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
{ path: "producto/:id", component: ProductoComponent},
{ path: "compra/:id", component: CompraComponent},
{ path: "**", redirectTo: "", pathMatch: "full" } // Ruta comodín para redirigir a HomeComponent
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
