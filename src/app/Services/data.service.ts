import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  isAdmin:boolean  = false;

  userLoggedIn:boolean = false;

  showLogIn:boolean = true;

  userData:any;

  jobData:any;

  jobPosterData:any;

}
