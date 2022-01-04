// Development of Angular Template Driven Form

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';  // For Dialog box

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public matDialogRef:MatDialogRef<LoginComponent>) { }

  user = {username:'',password:'',remember:false};

  ngOnInit() { 
  }

  onSubmit():void
  {
    this.matDialogRef.close();
  }
  
}
