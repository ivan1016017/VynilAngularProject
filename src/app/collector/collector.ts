export class Collector {
  id: number;
  name: string;
  telephone: number;
  email: string;

  constructor(
    id?: number,
    name?: string,
    telephone?: number,
    email?: string,
  ){
    this.id = id;
    this.name = name;
    this.telephone = telephone;
    this.email = email;
  }
}
