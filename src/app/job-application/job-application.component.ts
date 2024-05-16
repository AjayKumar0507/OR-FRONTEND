import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../Services/data.service';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';
import {  Router, Routes } from '@angular/router';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.css'
})
export class JobApplicationComponent implements OnInit{
  constructor(private dataService:DataService,private http:HttpClient,private router:Router){}

  
  @ViewChild('fullName') fullName: ElementRef | undefined;
  @ViewChild('collegeName') collegelName: ElementRef | undefined;
  @ViewChild('collegeAddress') collegeAddress: ElementRef | undefined;
  @ViewChild('yearOfPassing') yearOfPassing: ElementRef | undefined;
  @ViewChild('percentage') percentage: ElementRef | undefined;
  @ViewChild('skills') skills: ElementRef | undefined;
  @ViewChild('project') project: ElementRef | undefined;
  @ViewChild('resume') resume: ElementRef | undefined;


  jobName:string = "";
  companyName:string = "";
  jobLocation:string = "";
  salary:string = "";
  jobDescription:string = "";
  noOfOpenings:string = "";

  employerName = "";
  employerMail = "";
  
  ngOnInit(){
    console.log(this.dataService.jobData);
    this.jobName = this.dataService.jobData.jobName;
    this.companyName = this.dataService.jobData.company;
    this.jobLocation = this.dataService.jobData.jobLocation;
    this.salary = this.dataService.jobData.jobSalary;
    this.jobDescription = this.dataService.jobData.jobDescription;
    this.noOfOpenings = this.dataService.jobData.jobVacancy;
  }

  async mailToEmployer(){
    emailjs.init('4rF1y6IRYUNj2kI-3');
    const formData = new FormData();
    formData.append('file', this.resume?.nativeElement.files[0]);
    try {
      let response = await emailjs.send( "service_ga6bnio","template_bb2qrux" , {
        from_name: "JobSeekho",

        employer : this.employerName,
        job : this.dataService.jobData.jobName,
        jobName : this.dataService.jobData.jobName,
        company : this.dataService.jobData.company,
        jobSalary:this.dataService.jobData.jobSalary,
        jobLocation : this.dataService.jobData.jobLocation,
        jobDescription : this.dataService.jobData.jobDescription,
        jobVacancy : this.dataService.jobData.jobVacancy,

        userName : this.dataService.userData.userName,
        userEmail : this.dataService.userData.userEmail,
        collegeName : this.collegelName?.nativeElement.value,
        collegeAddress : this.collegeAddress?.nativeElement.value,
        yearOfPassing : this.yearOfPassing?.nativeElement.value,
        percentage : this.percentage?.nativeElement.value,
        skills : this.skills?.nativeElement.value,
        project : this.project?.nativeElement.value,
        phoneNo : this.dataService.userData.phoneNo,
        resume : formData,

        reply_to : this.employerMail
      });

      console.log("Email sent:", response);
      alert("Email sent");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again.");
    }
  }

  sendMailToEmployer(){

    let response:any;
    let a = this.http.get(`http://localhost:8080/getUserByRoleId/${this.dataService.jobData.roles.roleId}`).subscribe(
      (data) => {
        console.log(1);
        console.log(data);
        response = data;
        this.employerName = response.userName;
        this.employerMail = response.userEmail;

        this.mailToEmployer();
        this.sendMailToGraduate();

        this.router.navigateByUrl("/jobs");

      },
      (error) => {
        console.log(error);
      }
    );

  }

  async sendMailToGraduate(){
    emailjs.init('4rF1y6IRYUNj2kI-3');
    try {
      let response = await emailjs.send( "service_ga6bnio","template_cqgom6d" , {
        from_name: "JobSeekho",
        userName : this.dataService.userData.userName,
        jobName : this.dataService.jobData.jobName,
        companyName : this.dataService.jobData.company,

        reply_to : this.dataService.userData.userEmail
      });

      console.log("Email sent:", response);
      alert("Email sent");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again.");
    }
  }

}
