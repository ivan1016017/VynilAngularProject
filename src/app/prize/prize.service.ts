import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PrizeDetail} from './prizeDetail'

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  apiUrl:string = environment.baseUrl + 'prizes';

  constructor(private http: HttpClient) { }

  getPrizes(): Observable<Array<PrizeDetail>> {
    return this.http.get<Array<PrizeDetail>>(this.apiUrl);
  }

    /**
   * Creates a new prize
   * @param prize The new prize
   * @returns The prize with new id if created, false if not created
   */

    createprizeD(prize): Observable<PrizeDetail> {
      return this.http.post<PrizeDetail>(environment.baseUrl + "prizes", prize)
    }

    getPrizeD(prizeId):Observable<PrizeDetail>{
      return this.http.get<PrizeDetail>(`${this.apiUrl}/${prizeId}`);
    }

}
