import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../classes/event';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  events:Event[];

  constructor(private eventService:EventService){
    this.events = null; 
  }

  ngOnInit() {
    //this.eventService.getEvents().subscribe((events) => {this.events = events});
    this.eventService.getEvents().subscribe((events) => {this.events = events});
  }  

}
