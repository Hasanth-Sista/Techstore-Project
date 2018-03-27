import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/user-details';
import { error } from 'util';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: UserDetails;
  message: String;

  constructor(private service: SearchService, private router: Router) { }

  ngOnInit() {
    this.user = new UserDetails();
    this.message = '';
  }
  onSignUpSubmit() {
    if (this.user.username == null || this.user.firstname == null || this.user.last == null ||
      this.user.password == null || this.user.confirmPassword == null || this.user.address == null
      || this.user.city == null || this.user.phone == null || this.user.email == null) {
      this.message = "All fields are mandatory";
      alert(this.message);
      this.router.navigate(['./signup']);
    }
    if (this.message == '') {
      this.service.signUpUser(this.user).subscribe(
        (success) => {
          console.log(success.output);
          this.message = success.output['message'];
          alert(this.message);
          this.router.navigate(['./signup']);
        },
        (error) => {
          this.message = error.output;
          this.router.navigate(['./signup']);
        }
      );
    }
  }
}
