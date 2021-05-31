import { Album } from './album';

export class Track {

  id: number;
  name: string;
  duration: string

  constructor(
    id?: number,
    name?: string,
    duration?: string
  ){
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

    /**
   * The track's id
   */
  // get id(): number { return this.idA; }

  // /**
  //  * The track's name
  //  */
  // get name(): string { return this.nameA; }

  // /**
  //  * The track's duration
  //  */
  // get duration(): string { return this.durationA; }


}
