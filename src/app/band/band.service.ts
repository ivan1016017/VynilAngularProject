import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Band } from './band';
import { environment } from '../../environments/environment';
import {BandDetail} from './bandDetail';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  apiUrl: string = environment.baseUrl + 'bands';

  constructor(private http: HttpClient) {}

  getBands(): Observable<Array<BandDetail>> {
    return this.http.get<Array<BandDetail>>(this.apiUrl);
  }

    /**
   * Creates a new band
   * @param band The new band
   * @returns The band with its new id if it was created, false if it wasn't
   */
     createBandD(band): Observable<BandDetail> {
      return this.http.post<BandDetail>(environment.baseUrl + "bands", band);
    }

    createLinkMusicianToBand(
      band,
      idBand: number,
      idMusician: number
    ): Observable<BandDetail> {
      return this.http.post<BandDetail>(
        this.apiUrl +
          '/' +
          `${idBand}` +
          '/' +
          'musicians' +
          '/' +
          `${idMusician}`,
        band
      );
    }

    createPrizeToBand(
      date,
      idPrize: number,
      idBand: number
    ): Observable<BandDetail> {
      return this.http.post<BandDetail>(
        environment.baseUrl + 'prizes' +
          '/' +
          `${idPrize}` +
          '/' +
          'bands' +
          '/' +
          `${idBand}`,
        date
      );
    }



}
