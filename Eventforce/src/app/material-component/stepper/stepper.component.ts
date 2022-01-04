import { Component } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  events:Event[];

  constructor(private eventService:EventService) 
  {
    this.events = null;
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {this.events = events});
  }
}
