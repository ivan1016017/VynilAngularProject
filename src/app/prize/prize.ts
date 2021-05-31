
export class Prize {
  id: number;
  name: string;
  organization: string;
  description: string;

  constructor(
    id?: number,
    name?: string,
    organization?: string,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.organization = organization;
    this.description = description;
  }

}
