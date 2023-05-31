export class CategoryDTO {


  id:number = 0;
  name:string = "";

  constructor(id: number, name: string, url_image: string) {
    this.id = id;
    this.name = name;
  }
}
