import { Injectable } from '@angular/core';
import { Student } from '../classes/student';
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
export class StudentService {

  cur_student:Student;

  constructor(private http:HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getCurStudent()
  {
    return this.cur_student;
  }

  setCurStudent(stud:Student)
  {
    this.cur_student = stud;
    console.log(this.cur_student);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(baseURL + 'students')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(baseURL + 'students/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getStudentDetails(username:string,password:string): Observable<Student> {
    return this.http.get<Student>(baseURL + 'students/?username=' + username + "&password=" + password).pipe(map(students => students[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getStudentIds(): Observable<number[] | any> {
    return this.getStudents().pipe(map(students => students.map(student => student.id)))
    .pipe(catchError(error => error));
  }

  putStudent(student: Student): Observable<Student> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Student>(baseURL + 'students/' + student.id, student, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  } 
    
  postStudent(student: Student): Observable<Student> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Student>(baseURL + 'students', student, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

}
