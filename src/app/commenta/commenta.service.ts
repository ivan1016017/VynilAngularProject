import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commenta } from './commenta';
import { Album } from '../album/album';

@Injectable({
  providedIn: 'root'
})
export class CommentaService {

  private apiUrl = environment.baseUrl + 'albums';
  constructor() { }


}
