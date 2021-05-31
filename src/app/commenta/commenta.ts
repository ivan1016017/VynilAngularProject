export class Commenta {

  constructor(
    private idA: number,
    private descriptionA: string,
    private ratingA: number,
    ){}

  /**
   * The comment's id
   */
   get id(): number { return this.idA; }

   /**
    * The comment's description
    */
   get description(): string { return this.descriptionA; }

   /**
    * The comment's rating
    */
   get rating(): number { return this.ratingA; }

}
