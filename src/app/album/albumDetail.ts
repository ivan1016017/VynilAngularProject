import { Album } from './album';
import { Commenta } from '../commenta/commenta';
import { Track } from './track';
import { Input } from '@angular/core';

export class AlbumDetail extends Album {

  comments:Array<Commenta>;
  tracks: Array<Track>;

  constructor(comments?:Array<Commenta>, tracks?: Array<Track>){
    super();
    this.comments=comments;
    this.tracks= tracks;
  }

}
