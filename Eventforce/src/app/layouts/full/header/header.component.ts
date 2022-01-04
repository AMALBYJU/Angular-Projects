import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private router:Router){}

  toProfile()
  {
    this.router.navigateByUrl('lists');
  }

  signOut()
  {
    this.router.navigateByUrl('entry');
  }
    
}
