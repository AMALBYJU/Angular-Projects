import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Organizer } from '../classes/organizer';
import { OrganizerService } from '../services/organizer.service';
import { Student } from '../classes/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: "",
    password: ""
  }

  constructor(public dialogRef:MatDialogRef<LoginComponent>,
              private organizerService:OrganizerService,
              private router:Router,
              private studentService:StudentService) { }

  ngOnInit() {
    this.organizerService.setCurOrganizer(null);
    this.studentService.setCurStudent(null);
  }

  onLoginOrg() 
  {
    this.organizerService.getOrganizerDetails(this.user.username,this.user.password).subscribe((org) => 
    {
      console.log(org);
      if(typeof org != 'undefined')
      {
        this.organizerService.setCurOrganizer(org);
        this.studentService.setCurStudent(null);
        this.router.navigateByUrl('');
      }
      else
        console.log("Entry does not exist");
    });

    this.dialogRef.close();
  } 

}
