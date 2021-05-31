import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlbumDetail } from './albumDetail';
import { Commenta } from '../commenta/commenta';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiUrl = environment.baseUrl + 'albums';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Array<AlbumDetail>> {
    return this.http.get<Array<AlbumDetail>>(this.apiUrl);
  }

  getAlbumDetail(albumId): Observable<AlbumDetail> {
    return this.http.get<AlbumDetail>(`${this.apiUrl}/${albumId}`);
  }

  getComments(idAlbum): Observable<Array<Commenta>>{
    return this.http.get<Array<Commenta>>(`${this.apiUrl}/${idAlbum}/comments`)
  }

  createalbumD(album): Observable<AlbumDetail> {
    return this.http.post<AlbumDetail>(environment.baseUrl + "albums", album)
  }

  createLinkTrackToAlbum(
    track,
    idAlbum: number
  ): Observable<AlbumDetail> {
    return this.http.post<AlbumDetail>(
      this.apiUrl +
        '/' +
        `${idAlbum}` +
        '/' +
        'tracks',
      track
    );
  }

}
