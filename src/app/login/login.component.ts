import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/user-details';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserDetails;
  message: String;

  constructor(private service: SearchService, private router: Router, private loginService:LoginService) { }

  ngOnInit() {
    this.user = new UserDetails();
    this.message = '';
  }
  signIn() {
    if (this.user.email == null || this.user.password == null) {
      this.message = "All fields are mandatory";
      this.router.navigate(['./login']);
    } else {
      this.service.signInUser(this.user).subscribe(
        (success) => {
          if(success['message']=="Email incorrect"){
            this.message = success['message'];
            this.router.navigate(['./login']);
          }else if(success['message']=="Password incorrect"){
            this.message = success['message'];
            this.router.navigate(['./login']);
          }else{
            this.user.username=success.output['user_name'];
            this.user.email=success.output['email'];
            this.loginService.changeObject(this.user);
            this.router.navigate(['']);
          }
        },
        (error) => {
          this.message = error.output;
          this.router.navigate(['./login']);
        }
      );
    }
  }

}
