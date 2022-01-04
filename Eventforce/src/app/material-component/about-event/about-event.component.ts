import { Component, OnInit, Inject} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Event } from '../../classes/event';
import { Comment } from '../../classes/comment';
import { EventService } from '../../services/event.service';
import { Student } from '../../classes/Student';
import { StudentService } from '../../services/student.service'; 
import { Organizer } from '../../classes/organizer';
import { OrganizerService } from '../../services/organizer.service'; 
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-event',
  templateUrl: './about-event.component.html',
  styleUrls: ['./about-event.component.css']
})
export class AboutEventComponent implements OnInit {

  event:Event;
  errMess:string;   // Error message
  curStudent:Student;
  curOrganizer:Organizer;
  registered:boolean;     // true when student has registered, false otherwise

  commentForm: FormGroup;
  comment:Comment;

  eventCopy:Event;

  formErrors = {
    'comment': '',
    'author': '',
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    },
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    }
  };

  constructor(private eventService:EventService, 
              private studentService:StudentService,
              private organizerService:OrganizerService,
              private aroute:ActivatedRoute,
              private location:Location,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private router:Router,
              @Inject('baseURL') private baseURL) 
  {
    this.event = null;
    this.eventCopy = null;
    this.comment = null;
    this.registered = false;
    this.curStudent = null;
    this.curOrganizer = null;
    this.createForm();
  }

  ngOnInit() {
    this.aroute.params
    .pipe(switchMap((params:Params) => {return this.eventService.getEventById(+params['id']) }))
    .subscribe((event) => 
    {
          this.event = event;
          this.eventCopy=event;
          console.log(this.event);
          
    },
    errmess => this.errMess = <any>errmess);
    this.curStudent = this.studentService.getCurStudent();
    this.curOrganizer = this.organizerService.getCurOrganizer();

  }

  @ViewChild('cform') commentFormDirective;

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: 5,
      date: ''    
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = String(new Date());
    if(this.commentForm.valid)
    {
      this.eventCopy.comments.push(this.comment);
      this.event = null;
      this.eventService.putEvent(this.eventCopy)
      .subscribe((event) =>
        {this.event = event; this.eventCopy = event},
        errmess => { this.event = null; this.eventCopy = null; this.errMess = <any>errmess; });
    }
    console.log(this.comment);
    /* this.commentForm.reset({
      comment: '',
      author: '',
      rating: 5,
      date: ''
    }); */

    this.createForm();
    this.commentFormDirective.resetForm();
  }


  getStyle() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = '../../../assets/images/events/' + this.event.id  + '.jpg';
    const style = `background-image: url(${profilePicUrl})`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  onRegister()
  {
    if(this.curStudent == null)
    {
      console.log('You are an organizer!');
      return;
    }
    if(!this.eventCopy.students_id.includes(+this.curStudent.id))
    {
      this.eventCopy.students_id.push(+this.curStudent.id);
      this.eventCopy.cur_registrations++;
      this.event = null;
      this.eventService.putEvent(this.eventCopy)
      .subscribe((event) =>
        {this.event = event; this.eventCopy = event},
        errmess => { this.event = null; this.eventCopy = null; this.errMess = <any>errmess; });
    }
  }

  onUnRegister()
  {
    if(this.curStudent == null)
    {
      console.log('You are an organizer!');
      return;
    }
    this.eventCopy.students_id.splice( this.eventCopy.students_id.indexOf(+this.curStudent.id), 1 ); // Removing element from array
    this.eventCopy.cur_registrations--;
    this.event = null;
    this.eventService.putEvent(this.eventCopy)
    .subscribe((event) =>
      {this.event = event; this.eventCopy = event},
      errmess => { this.event = null; this.eventCopy = null; this.errMess = <any>errmess; });
  }

  onDelete()
  {
      this.event = null;
      this.eventService.deleteEvent(this.eventCopy)
      .subscribe((obj) =>
        {console.log("Event deleted successfully")},
        errmess => { this.event = null; this.eventCopy = null; this.errMess = <any>errmess; });
      
      this.router.navigateByUrl('menu');
  }  

  isRegistered()
  {
    if(this.curStudent == null)   // If it is an organizer
    {
      return false;
    }
    else if(this.eventCopy.students_id.includes(+this.curStudent.id))   // If current student id is in the list
    {
      return true;
    } 
    else
      return false;
  }

  goBack():void
  {
    this.location.back();
  }

}
