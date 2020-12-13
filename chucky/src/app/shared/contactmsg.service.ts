import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from './baseurl';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Contactmsg } from '../model/contactmsg';

@Injectable({
  providedIn: 'root'
})
export class ContactmsgService {

	constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getContactmsgs(): Observable<Contactmsg[]> {
    return this.http.get<Contactmsg[]>(baseURL + 'contactmsgs')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addComment(contactmsg: Contactmsg): Observable<Contactmsg> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Contactmsg>(baseURL + 'contactmsgs', contactmsg, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  updateComment(contactmsg: Contactmsg): Observable<Contactmsg> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Contactmsg>(baseURL + 'contactmsgs/' + contactmsg.id, contactmsg, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  deleteComment(contactmsg: Contactmsg): Observable<Contactmsg> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.delete<Contactmsg>(baseURL + 'contactmsgs/' + contactmsg.id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}
