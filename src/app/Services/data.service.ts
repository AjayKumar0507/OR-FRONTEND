import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  isAdmin:boolean  = false;

  isEmployer:boolean = false;

  userLoggedIn:boolean = false;

  showLogIn:boolean = true;

  userData:any;

  jobData:any;

  jobPosterData:any;

}
