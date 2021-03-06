import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { MenuComponent } from '../menu/menu.component';

export const routes:Routes = 
[
    {path:"home", component:HomeComponent},
    {path:"menu", component:MenuComponent},
    {path:"contactus",component:ContactComponent},
    {path:"dishDetail/:id",component:DishdetailComponent},
    {path:"aboutus",component:AboutComponent},
    {path:"",redirectTo:"home",pathMatch:"full"}
];