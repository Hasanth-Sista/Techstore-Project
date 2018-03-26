import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserDetails } from '../models/user-details';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  private behaviorObjectUser = new BehaviorSubject<UserDetails>(null);
  userObject = this.behaviorObjectUser.asObservable();

  constructor(private http : Http) { }

  changeObject(user: UserDetails) {
    this.behaviorObjectUser.next(user);
  }
  
}
