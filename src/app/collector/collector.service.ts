import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collector } from './collector';
import { environment } from '../../environments/environment';
// import { CollectorAlbum } from '../collector-album/collectorAlbum';
import { CollectorDetail } from './collectorDetail';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CollectorService {
  apiUrl: string = environment.baseUrl + 'collectors';
  constructor(private http: HttpClient) {}

  getCollectors(): Observable<Array<CollectorDetail>> {
    return this.http.get<Array<CollectorDetail>>(this.apiUrl);
  }

  /**
   * Creates a new collector
   * @param collector The new collector
   * @returns The collector with its new id if it was created, false if it wasn't
   */
  createCollectorD(collector): Observable<CollectorDetail> {
    return this.http.post<CollectorDetail>(this.apiUrl, collector);
  }

  createLinkMusicianToCollector(
    collector,
    idCollector: number,
    idMusician: number
  ): Observable<CollectorDetail> {
    return this.http.post<CollectorDetail>(
      this.apiUrl +
        '/' +
        `${idCollector}` +
        '/' +
        'musicians' +
        '/' +
        `${idMusician}`,
      collector
    );
  }

  createLinkBandToCollector(
    collector,
    idCollector: number,
    idBand: number
  ): Observable<CollectorDetail> {
    return this.http.post<CollectorDetail>(
      this.apiUrl +
        '/' +
        `${idCollector}` +
        '/' +
        'bands' +
        '/' +
        `${idBand}`,
      collector
    );
  }

  createLinkAlbumToCollector(
    price,
    idCollector: number,
    idAlbum: number
  ): Observable<CollectorDetail> {
    return this.http.post<CollectorDetail>(
      this.apiUrl +
        '/' +
        `${idCollector}` +
        '/' +
        'albums' +
        '/' +
        `${idAlbum}`,
      price
    );
  }



}
