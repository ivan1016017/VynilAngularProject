import { Collector } from './collector';
import {CollectorAlbum} from './collectorAlbum';
import {Musician} from '../musician/musician';
import {Band} from '../band/band';


export class CollectorDetail extends Collector {

  collectorAlbums:Array<CollectorAlbum>;
  bands: Array<Band>;
  musicians: Array<Musician>;
  favoritePerformers: Array<any>;

  constructor(collectorAlbums?:Array<CollectorAlbum>, bands?: Array<Band>, musicians?: Array<Musician>, favoritePerformers?: Array<any>){
    super();
    this.collectorAlbums=collectorAlbums;
    this.bands = bands;
    this.musicians = musicians;
    this.favoritePerformers = favoritePerformers;
  }

}
