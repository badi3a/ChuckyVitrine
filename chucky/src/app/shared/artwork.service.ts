import { Injectable } from '@angular/core';
import { Artwork } from '../model/artwork';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from './baseurl';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getArtworks(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(baseURL + 'artworks')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getHomeArtworks(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(baseURL + 'homeartworks')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getArtwork(id: number): Observable<Artwork> {
    return this.http.get<Artwork>(baseURL + 'artworks/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getArtworkIds(): Observable<number[] | any> {
    return this.getArtworks().pipe(map(artworks => artworks.map(artwork => artwork.id)))
      .pipe(catchError(error => error));
  }

  addArtwork(artwork: Artwork): Observable<Artwork> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Artwork>(baseURL + 'artwork', artwork, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  updateArtwork(artwork: Artwork): Observable<Artwork> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Artwork>(baseURL + 'artworks/' + artwork.id, artwork, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  deleteArtwork(artwork: Artwork): Observable<Artwork> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.delete<Artwork>(baseURL + 'artwork/' + artwork.id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
