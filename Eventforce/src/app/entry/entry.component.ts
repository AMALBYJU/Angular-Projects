import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class EntryComponent implements OnInit {

  images = {"0":"../../assets/images/slider/slider1.jpg","1":"../../assets/images/slider/slider2.jpg","2":"../../assets/images/slider/slider3.jpg"};
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(config: NgbCarouselConfig, private dialog:MatDialog) {
  }

  ngOnInit() {
  }

  openLoginForm()
  {
    this.dialog.open(LoginComponent,{width:'500px',height:'450px'});
  }

  openRegisterForm()
  {
    this.dialog.open(RegisterComponent,{width:'500px',height:'650px'});
  }

}
