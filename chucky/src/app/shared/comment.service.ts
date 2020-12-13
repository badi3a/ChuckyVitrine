import { Injectable } from '@angular/core';
import { Comment } from '../model/comment';
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
export class CommentService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(baseURL + 'comments')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Comment>(baseURL + 'comments', comment, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  updateComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Comment>(baseURL + 'comments/' + comment.id, comment, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  deleteComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.delete<Comment>(baseURL + 'comments/' + comment.id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
