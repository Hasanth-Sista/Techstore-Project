import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/user-details';
import { error } from 'util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:UserDetails;

  constructor() { }

  ngOnInit() {
    this.user=new UserDetails();
  }
  onSignUpSubmit(){
    if(this.user.password!=this.user.confirmPassword){
      location.reload();
    }
  }
}
