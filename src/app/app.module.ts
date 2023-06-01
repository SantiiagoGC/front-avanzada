import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pagina/home/home.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { PersonalComponent } from './pagina/personal/personal.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionCiudadComponent } from './pagina/gestion-ciudad/gestion-ciudad.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { ProductoComponent } from './pagina/producto/producto.component';
import { CompraComponent } from './pagina/compra/compra.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    PersonalComponent,
    BusquedaComponent,
    GestionCiudadComponent,
    AlertaComponent,
    CrearProductoComponent,
    ProductoComponent,
    CompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
