import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../Services/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from '../modal/job';


@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrl: './job-profile.component.css'
})
export class JobProfileComponent implements OnInit{

  constructor(private dataService:DataService,private http:HttpClient , private router:Router){}

  showModal = false;
  jobName: any;
  employer: any;
  roleId: any;
  salary: any;
  company: any;
  location: any;
  vacancy: any;
  description: any;

  
  @ViewChild('salary1') salary1:ElementRef | undefined;
  @ViewChild('company1') company1: ElementRef | undefined;
  @ViewChild('location1') location1: ElementRef | undefined;
  @ViewChild('vacancy1') vacancy1: ElementRef | undefined;
  @ViewChild('companySize1') companySize1: ElementRef | undefined; 
  @ViewChild('description1') description1: ElementRef | undefined;

  job:Job = new Job();

  async ngOnInit(){
    this.jobName = this.dataService.jobData.jobName;
    this.salary =  this.dataService.jobData.jobSalary;
    this.company =  this.dataService.jobData.company;
    this.location = this.dataService.jobData.jobLocation;
    this.vacancy =  this.dataService.jobData.jobVacancy;
    this.description =  this.dataService.jobData.jobDescription;
    
    let response : any;
    let a = this.http.get(`http://localhost:8080/getUserByRoleId/${this.dataService.jobData.roles.roleId}`).subscribe(
        (data) => {
          response = data;
          this.employer = response.userName;
          this.roleId = this.dataService.jobData.roles.roleId;
        },
        (error) => {
          console.log(error);
        }
      );

  }

  deleteJob() {
    this.http.delete(`http://localhost:8080/deleteJob/${this.dataService.jobData.jobId}`).subscribe(
      response => {
        console.log('Response from backend:', response);
        this.router.navigateByUrl('/jobs-list');
      },
      error => {
        console.error('Error sending data to backend:', error);
        // Handle error as needed
      }
    );
  }
  editJob() {
    this.showModal = !this.showModal; 
  }

  edit(){

    this.job = {
      jobName : this.dataService.jobData.jobName,
      jobType : this.dataService.jobData.jobType,
      jobDescription : this.description1?.nativeElement.value,
      jobSalary : this.salary1?.nativeElement.value,
      company : this.company1?.nativeElement.value,
      jobLocation : this.location1?.nativeElement.value,
      jobVacancy : this.vacancy1?.nativeElement.value,
      roles:this.dataService.jobData.roles
    }

    this.http.post<any>(`http://localhost:8080/updateJob/${this.dataService.jobData.jobId}` , this.job).subscribe(
          response => {
            console.log('Response from backend:', response);
            this.router.navigateByUrl('/jobs-list');
          },
          error => {
            console.error('Error sending data to backend:', error);
            // Handle error as needed
          }
        );
  }

}
