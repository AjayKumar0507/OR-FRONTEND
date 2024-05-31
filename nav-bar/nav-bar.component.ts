import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  showLogInSignup: boolean = true;

  constructor(public dataService: DataService, private router: Router) {
    if (this.dataService.showLogIn == false) {
      this.showLogInSignup = false;
    }
  }

  goToAddJob() {
    if (this.dataService.userLoggedIn == false) {
      this.router.navigateByUrl("/login");
    } else {
      console.log(this.dataService.userData.role.roleTitle);
      if (this.dataService.userData.role.roleTitle == "employer") {
        this.router.navigateByUrl("/add-job");
      } else {
        alert("You are not an employer to add job");
      }
    }
  }

  goToJobs() {
    if (this.dataService.userLoggedIn == false) {
      this.router.navigateByUrl("/login");
    } else {
      this.router.navigateByUrl("/jobs");
    }
  }

  logOut() {
    this.dataService.isAdmin = false;
    this.dataService.userData = {};
    this.dataService.jobData = {};
    this.dataService.jobPosterData = {};
    this.dataService.userLoggedIn = false;
    this.dataService.showLogIn = true;

    this.router.navigateByUrl("/welcome");
  }
}
