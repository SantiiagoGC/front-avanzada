import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { CompraDTO } from 'src/app/modelo/compra-dto';
import { ProductGetDTO2 } from 'src/app/modelo/product-get-dto copy';
import { AuthService } from 'src/app/servicios/auth.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {

  registroForm!: FormGroup;
  alerta!: Alerta;
  unidades: number = 0;
  idProducto: number = 0;
  detalleCompraCounter: number = 0;
  producto: ProductGetDTO2 | undefined;
  valorTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProducto = +params['id'];
      console.log(this.idProducto);
      this.getProductById(this.idProducto);
    });
  }

  getProductById(id: number) {
    this.productService.getProduct(id).subscribe({
      next: data => {
        this.producto = data.respuesta;
        console.log(this.producto);
        this.valorTotal = this.producto?.precio || 0; // utiliza el operador de navegación segura (?) y el operador de coalescencia nula (||) para asignar un valor predeterminado
        console.log(this.valorTotal);
        this.crearFormulario(); // crear el formulario después de obtener el valor del producto
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      valorTotal: [{ value: this.valorTotal, disabled: true }],
      metodoPago: new FormControl('', [Validators.required]),
      cedulaUsuario: new FormControl('', [Validators.required]),
      unidades: new FormControl('', [Validators.required]),
    });
  }

  public registrar(): void {
    const objeto = this;
    const formData = new FormData();
    const compra = this.convertirObjeto(this.registroForm.value);
    console.log(compra);
    this.enviarInformacion(compra);
  }

  private convertirObjeto(objeto: any): CompraDTO {
    const compra = new CompraDTO();
    compra.cedulaUsuario = objeto["cedulaUsuario"];
    compra.valorTotal = this.valorTotal;
    compra.metodoPago = objeto["metodoPago"];
    this.unidades = objeto["unidades"];
    return compra;
  }

  private enviarInformacion(compra: CompraDTO) {
    const objeto = this;

    this.productService.comprarProducto(this.unidades, this.idProducto, compra).subscribe({
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

}
