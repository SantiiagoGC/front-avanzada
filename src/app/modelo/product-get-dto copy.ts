export class ProductGetDTO2 {
  id:number = 0;
  nombre:string = "";
  unidades:number = 0;
  descripcion:string = "";
  precio:number = 0;
  cedulaVendedor:number = 0;
  rutasImagenes: string[] = [];
  idCategoria:number = 0;

  constructor(id: number, nombre:string, unidades:number, descripcion: string, precio: number,
     cedulaVendedor: number, rutasImagenes: string[], idCategoria: number){

      this.id = id;
      this.nombre = nombre;
      this.unidades = unidades;
      this.descripcion = descripcion;
      this.precio = precio;
      this.cedulaVendedor = cedulaVendedor;
      this.rutasImagenes = rutasImagenes;
      this.idCategoria = idCategoria;

  }

  /*constructor(id: number, deadline: Date, title: string, puntuation: number, description: string, unities: number, realPrice: number, price: number, idCategory: number, discount: number, stateProduct: number, creationDate: Date, images: ImageDto[], idPerson:string) {
    this.id = id;
    this.deadline = deadline;
    this.title = title;
    this.puntuation = puntuation;
    this.description = description;
    this.unities = unities;
    this.realPrice = realPrice;
    this.price = price;
    this.idPerson = idPerson;
    this.idCategory = idCategory;
    this.discount = discount;
    this.stateProduct = stateProduct;
    this.creationDate = creationDate;
    t*/

}
