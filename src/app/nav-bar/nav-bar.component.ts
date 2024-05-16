import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  showLogInSignup:boolean = true;
  dataService:any;


  constructor(public dataServices:DataService , private router:Router){
    this.dataService = dataServices;
    if(this.dataService.showLogIn == false){
      this.showLogInSignup = false;
    }
  }

  goToAddJob(){
    if(this.dataService.userLoggedIn == false){
      this.router.navigateByUrl("/login");
    }
    else{  
      console.log(this.dataService.userData.role.roleTitle);
      if( this.dataService.userData.role.roleTitle == "employer" ){
        this.router.navigateByUrl("/add-job");
      }
      else
        alert("You are not a employer to add job");
      }
  }

  goToJobs(){
    if(this.dataService.userLoggedIn == false){
      this.router.navigateByUrl("/login");
    }
    else
      this.router.navigateByUrl("/jobs");
  }

  
}
