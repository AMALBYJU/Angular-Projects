import { Component } from '@angular/core';
import { Student } from '../../classes/student';
import { StudentService } from '../../services/student.service';
import { Event } from '../../classes/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent {

  curStudent:Student;
  selEvents:Event[];
  events:Event[];
  constructor(private studentService:StudentService,
              private eventService:EventService)
  {
    this.curStudent = this.studentService.getCurStudent();
    this.selEvents = [];
  }

  ngOnInit()
  {
    this.eventService.getEvents().subscribe((events) => 
    {
      this.events = events;
      for(let e of this.events)
      {
        if(e.students_id.includes(+this.curStudent.id))
        {
          this.selEvents.push(e);
        }
      }
    });
  }

}
