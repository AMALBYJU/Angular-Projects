import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Organizer } from '../classes/organizer';
import { OrganizerService } from '../services/organizer.service';
import { Student } from '../classes/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css']
})
export class LoginEmpComponent implements OnInit {

  user = {
    username: "",
    password: ""
  }

  constructor(private studentService:StudentService,
              private organizerService:OrganizerService,
              private router:Router) { }

  ngOnInit() {
    this.organizerService.setCurOrganizer(null);
    this.studentService.setCurStudent(null);
  }

  onLoginStud() 
  {
    this.studentService.getStudentDetails(this.user.username,this.user.password).subscribe((org) => 
    {
      console.log(org);
      if(typeof org != 'undefined')
      {
        this.studentService.setCurStudent(org);
        this.organizerService.setCurOrganizer(null);
        this.router.navigateByUrl('');
      }
      else
        console.log("Entry does not exist");
    });
  }

}
