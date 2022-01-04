import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import { Event } from '../../classes/event';
import { Student } from '../../classes/student';
import { EventService } from '../../services/event.service';
import { StudentService } from '../../services/student.service'; 

// For selected events


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  selevents:Event[];
  curStudent:Student;

  constructor(private eventService:EventService,
              private studentService:StudentService)
  {
    this.selevents = [];
  }

  ngOnInit(){
    this.curStudent = this.studentService.getCurStudent();
  }

}
