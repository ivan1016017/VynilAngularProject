import {Band} from './band';
import {Album} from '../album/album';
import {BandPrize} from './bandPrize';
import { MusicianDetail } from '../musician/musicianDetail';


export class BandDetail extends Band{

  albums: Array<Album>;
  performerPrizes: Array<BandPrize>;
  musicians: Array<MusicianDetail>;

  constructor(albums?: Array<Album>, performerPrizes?:Array<BandPrize>, musicians?: Array<MusicianDetail>){
    super();
    this.albums = albums;
    this.performerPrizes = performerPrizes;
    this.musicians = musicians;
  }
}
