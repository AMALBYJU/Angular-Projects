import { Component, OnInit, Inject} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Event } from '../../classes/event';
import { Comment } from '../../classes/comment';
import { EventService } from '../../services/event.service';
import { Student } from '../../classes/Student';
import { StudentService } from '../../services/student.service'; 
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  event:Event;
  eventCopy:Event;
  errMess:string;   // Error message
  studentList:Student[];

  constructor(private aroute:ActivatedRoute,
              private eventService:EventService, 
              private studentService:StudentService,
              private location:Location,
              @Inject('baseURL') private baseURL) 
  {
    this.studentList = [];
  }

  ngOnInit() {
    this.aroute.params
    .pipe(switchMap((params:Params) => {return this.eventService.getEventById(+params['id']) }))
    .subscribe((event) => 
    {
      this.event = event;
      this.eventCopy = event;
      console.log(this.event);
      for(let i of this.event.students_id)
      {
        console.log("ID : " + i);
        this.studentService.getStudentById(i).subscribe((student) => {this.studentList.push(student)});
      }
    },
    errmess => this.errMess = <any>errmess);

  }

  deleteEntry(data:Student)
  {
    this.studentList.splice( this.studentList.indexOf(data), 1 )
    
    this.eventCopy.students_id.splice( this.eventCopy.students_id.indexOf(+data.id), 1 ); // Removing element from array
    this.event = null;
    this.eventService.putEvent(this.eventCopy)
    .subscribe((event) =>
      {this.event = event; this.eventCopy = event},
      errmess => { this.event = null; this.eventCopy = null; this.errMess = <any>errmess; });
  }

  goBack():void
  {
    this.location.back();
  }

}
