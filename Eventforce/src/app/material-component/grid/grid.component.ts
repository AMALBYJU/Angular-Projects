import { Component } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../../services/event.service';
import { OrganizerService } from '../../services/organizer.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  event:Event;
  errMess:string;
  events:Event[];

/*   tiles: any[] = [{
    text: 'One',
    cols: 3,
    rows: 1,
    color: 'lightblue'
  }, {
    text: 'Two',
    cols: 1,
    rows: 2,
    color: 'lightgreen'
  }, {
    text: 'Three',
    cols: 1,
    rows: 1,
    color: 'lightpink'
  }, {
    text: 'Four',
    cols: 2,
    rows: 1,
    color: '#DDBDF1'
  }]; */

  constructor(private eventService:EventService, private organizerService:OrganizerService)
  {
    this.event = 
    {
      "id": 0,
      "name": "",
      "club": "",
      "venue": "",
      "image": "",
      "category": "",
      "org_desc": "",
      "event_desc": "",
      "date": null,
      "start_time": "",
      "end_time": "",
      "max_registrations": null,
      "cur_registrations": 0,
      "students_id": [],
      "comments": []
    }
  }

  ngOnInit()
  {
    this.eventService.getEvents().subscribe((events) => {this.events = events});
  }

  submitEvent()
  {
    if(this.events == [])
    {
      this.event.id = 0;      
    }
    else
    {
      this.event.id = this.events[this.events.length - 1].id + 1;
    }
    this.event.club = this.organizerService.getCurOrganizer().Club;
    this.event.max_registrations = +this.event.max_registrations;
    this.event.cur_registrations = +this.event.cur_registrations;
    this.eventService.postEvent(this.event)
    .subscribe((event) =>
      {this.event = null},
      errmess => { this.event = null; this.errMess = <any>errmess; });
  }

}
