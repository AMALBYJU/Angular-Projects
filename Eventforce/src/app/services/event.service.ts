import { Injectable } from '@angular/core';
import { Event } from '../classes/event';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'; 
import { baseURL } from '../shared/baseURL';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(baseURL + 'events')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(baseURL + 'events/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getEventIds(): Observable<number[] | any> {
    return this.getEvents().pipe(map(events => events.map(event => event.id)))
    .pipe(catchError(error => error));
  }

  putEvent(event: Event): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Event>(baseURL + 'events/' + event.id, event, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  
  deleteEvent(event: Event): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.delete(baseURL + 'events/' + event.id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  } 
    
  postEvent(event: Event): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Event>(baseURL + 'events', event, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

}
