import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Musician {
  id: number;
  name: string;
  image: string;
  description: string;
  birthDate: Date;
  creationDate: Date;
  type: string;
  bandId: number;

  constructor(
    id?: number,
    name?: string,
    image?: string,
    description?: string,
    birthDate?: Date,
    creationDate?: Date,
    type?: string,
    bandId?: number
  ){
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.birthDate = birthDate;
    this.creationDate = creationDate;
    this.type = type;
    this.bandId = bandId
  }
}
