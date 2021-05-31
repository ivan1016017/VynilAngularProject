

export enum GENRE{
  Classical='Classical',
  Salsa='Salsa',
  Rock='Rock',
  Folk='Folk'
};

export enum RECORD_LABEL {
  Sony_Music ='Sony Music',
  EMI= 'EMI',
  Discos_Fuentes = 'Discos Fuentes',
  Elektra = 'Elektra',
  Fania_Record = 'Fania Record'
};



export class Album {

  name: string;
  cover:string;
  releaseDate:Date;
  description:string;
  genre:GENRE;
  recordLabel:RECORD_LABEL;
  id: number;

  constructor(
    name?: string,
    cover?: string,
    releaseDate?:Date,
    description?: string,
    genre?: GENRE,
    recordLabel?: RECORD_LABEL,
    id?: number,
    )
    {
    this.name = name;
    this.cover = cover;
    this.releaseDate = releaseDate;
    this.description = description;
    this.genre = genre;
    this.recordLabel = recordLabel;
    this.id = id;
    }

}
