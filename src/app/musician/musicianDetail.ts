import {Musician} from './musician';
import {Album} from '../album/album';
import {MusicianPrize} from './musicianPrize'

export class MusicianDetail extends Musician{

  albums: Array<Album>;

  performerPrizes: Array<MusicianPrize>;


  constructor( albums?: Array<Album>, performerPrizes?:Array<MusicianPrize>){
    super();
    this.albums = albums;
    this.performerPrizes = performerPrizes;
  }
}
