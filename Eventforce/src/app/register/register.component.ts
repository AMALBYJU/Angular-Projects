import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { StudentService } from '../services/student.service';
import { Student } from '../classes/student';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  existingEntry:Student;
  temp;

  user:Student = {    
    id: null,
    username:"",
    password:"",
    name:"",
    gender:"",
    dob:null,
    phone:null,
    email:""
  };

  constructor(public dialogRef:MatDialogRef<RegisterComponent>, private studentService:StudentService) { }

  ngOnInit() {
    this.existingEntry = null;
  }


  onRegister() 
  {
    this.studentService.getStudentById(this.user.id).subscribe((student) => {this.existingEntry = student},
      (errmess) =>
      {
        this.existingEntry = null;
        console.log("Entered");
        console.log(this.user);
        this.user.id = +this.user.id;
        this.user.phone = +this.user.phone;
        this.studentService.postStudent(this.user).subscribe((student) => { console.log("Registration done")},
        (errMess) => {console.log("Error occurred in registration")});
      
    });
    this.dialogRef.close();
  } 

}
