import { AlbumDetail } from '../album/albumDetail';
export class CollectorAlbum {

albumns:Array<AlbumDetail>

  constructor(
    private idCA: number,
    private priceCA: number,
    private statusCA: string,
    albums?:Array<AlbumDetail>,
    ){
      this.albumns=albums;
    }

  /**
   * The album's id
   */
   get id(): number { return this.idCA; }

   /**
    * The album's price
    */
   get price(): number { return this.priceCA; }

   /**
    * The comment's rating
    */
   get status(): string { return this.statusCA; }

}
