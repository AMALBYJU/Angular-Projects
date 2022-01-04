import { Injectable } from '@angular/core';
import { Organizer } from '../classes/organizer';
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
export class OrganizerService {

  cur_organizer:Organizer;

  constructor(private http:HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getOrganizers(): Observable<Organizer[]> {
    return this.http.get<Organizer[]>(baseURL + 'organizers')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCurOrganizer()
  {
    return this.cur_organizer;
  }

  setCurOrganizer(org:Organizer)
  {
    this.cur_organizer = org;
    console.log(this.cur_organizer);
  }

  getOrganizerById(id: number): Observable<Organizer> {
    return this.http.get<Organizer>(baseURL + 'organizers/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getOrganizerDetails(username:string,password:string): Observable<Organizer> {
    return this.http.get<Organizer>(baseURL + 'organizers/?username=' + username + "&password=" + password).pipe(map(organizers => organizers[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getOrganizerIds(): Observable<number[] | any> {
    return this.getOrganizers().pipe(map(organizers => organizers.map(organizer => organizer.id)))
    .pipe(catchError(error => error));
  }

  putOrganizer(organizer: Organizer): Observable<Organizer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Organizer>(baseURL + 'organizers/' + organizer.id, organizer, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  } 
    
  postOrganizer(organizer: Organizer): Observable<Organizer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Organizer>(baseURL + 'organizers', organizer, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

}
