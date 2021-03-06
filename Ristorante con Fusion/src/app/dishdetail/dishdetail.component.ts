import { Component, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  constructor(private location:Location,
              private activatedRoute:ActivatedRoute,
              private dishService:DishService ) { }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    this.dishService.getDishById(id).subscribe(dish => (this.dish = dish));
  }

  dish:Dish;

  goBack():void
  {
    this.location.back();
  }
}
