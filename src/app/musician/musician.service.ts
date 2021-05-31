import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Musician } from './musician';
import { environment } from '../../environments/environment';
import { MusicianDetail } from './musicianDetail';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  apiUrl:string = environment.baseUrl + 'musicians';

constructor(private http: HttpClient) { }

getMusicians(): Observable<Array<MusicianDetail>> {
  return this.http.get<Array<MusicianDetail>>(this.apiUrl);
}

    /**
   * Creates a new musician
   * @param musician The new musician
   * @returns The musician with its new id if it was created, false if it wasn't
   */
     createmusicianD(musician): Observable<MusicianDetail> {
      return this.http.post<MusicianDetail>(environment.baseUrl + "musicians", musician)
    }

    createPrizeToMusician(
      date,
      idPrize: number,
      idMusician: number
    ): Observable<MusicianDetail> {
      return this.http.post<MusicianDetail>(
        environment.baseUrl + 'prizes' +
          '/' +
          `${idPrize}` +
          '/' +
          'musicians' +
          '/' +
          `${idMusician}`,
        date
      );
    }

}
