import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service'; 
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dishService:DishService, private promoService:PromotionService,
              private leaderService:LeaderService) { }

  ngOnInit() {
    this.dishService.getDishFeatured().subscribe(dishF => (this.dish = dishF)); // DishService uses Observables
    this.promoService.getPromotionFeatured().subscribe(promo => (this.promotion = promo)); // PromotionService uses Observables 
    this.leader = this.leaderService.getFeaturedLeader();  
  }

  dish:Dish;
  promotion:Promotion;
  leader:Leader;
}
