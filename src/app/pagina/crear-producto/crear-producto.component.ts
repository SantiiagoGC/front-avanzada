import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductPostDTO } from 'src/app/modelo/producto-post';
import { ProductService } from 'src/app/servicios/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  categorias:string[];
  producto: ProductPostDTO;
  images!:FileList;
  registroForm!: FormGroup;
  alerta!:Alerta;

  constructor(private router: Router, private formBuilder: FormBuilder, private producService: ProductService){
  this.crearFormulario();
  this.categorias = [];
  this.producto = new ProductPostDTO();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      unidades: new FormControl('', [Validators.required]),
      cedulaVendedor: new FormControl('', [Validators.required]),
      rutasImagenes: new FormControl('', [Validators.required]),
      codigoCategoria: new FormControl('')
    });
  }

  public registrar(): void {
    const objeto = this;
    const formData = new FormData();
    const producto = this.convertirObjeto(this.registroForm.value);
    console.log(producto);
      this.enviarInformacion(producto);

  }

  private enviarInformacion(producto: ProductPostDTO) {
    const objeto = this;
    this.producService.registrarProducto(producto).subscribe({
      next(value) {
        console.log(value);
        objeto.alerta = new Alerta(value.respuesta, "success");
      },
      error(err) {
        objeto.alerta = new Alerta(err.error.respuesta, "danger");
        console.log(err);
      }
    });
  }

  private convertirObjeto(objeto: any): ProductPostDTO {
    const producto = new ProductPostDTO();
    producto.nombre = objeto["nombre"];
    producto.descripcion = objeto["descripcion"];
    producto.precio = objeto["precio"];
    producto.unidades = objeto["unidades"];
    producto.cedulaVendedor = objeto["cedulaVendedor"];
    producto.rutasImagenes = ["https://unsplash.com/es/s/fotos/random"];
    producto.codigoCategoria = objeto["codigoCategoria"];
    console.log(producto);
    return producto;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registroForm.patchValue({
        imagen: file
      });
    }
  }

  ngOnInit(): void {
    this.categorias.push('Tecnología');
    this.categorias.push('Hogar');
    this.categorias.push('Deportes');
    this.categorias.push('Moda');
    this.categorias.push('Mascotas');
  }

}
