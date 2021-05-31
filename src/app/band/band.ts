export class Band {
  name: string;
  image: string;
  description: string;
  creationDate: Date;
  id: number;

  constructor(
    name?: string,
    image?: string,
    description?: string,
    creationDate?: Date,
    id?: number
  ) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.creationDate = creationDate;
    this.id = id;
  }
}
