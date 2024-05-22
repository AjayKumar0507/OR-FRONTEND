import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EmployersDetailsService } from '../Services/employers-details.service';

@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.css'
})
export class EmployerJobsComponent  {
  
  jobs:any = {};
  @ViewChild('table', { static: true }) table!: ElementRef;
  userName: any;
  roleId: any;
  userMail: any;
  phoneNo: any;
  address: any;
  nationality: any;
  company: any;
  companyAddress: any;
  sector: any;
  companySize: any;

  constructor(private employerDetailsService:EmployersDetailsService,private renderer:Renderer2){}

  async ngOnInit() {
    try {
      this.jobs  = await  this.employerDetailsService.getJobsByRoleId();
      this.generateTable();
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  }

  generateTable(){

    this.userName = this.employerDetailsService.employerData.userName;
    this.roleId = this.employerDetailsService.employerData.roleId;
    this.userMail = this.employerDetailsService.employerData.email;
    this.phoneNo = this.employerDetailsService.employerData.phoneNo;
    this.address = this.employerDetailsService.employerData.address;
    this.nationality = this.employerDetailsService.employerData.nationality;
    this.companyAddress = this.employerDetailsService.employerData.companyAddress;
    this.sector = this.employerDetailsService.employerData.sector;
    this.company = this.employerDetailsService.employerData.company;
    this.companySize = this.employerDetailsService.employerData.companySize;

    if(Object.keys(this.jobs).length == 0){
      let tr1 = this.renderer.createElement('tr');
      let p = this.renderer.createElement('p');
      p.innerHTML = "No Jobs Posted";
      this.renderer.addClass(p,'no-jobs');
      
      this.renderer.appendChild(tr1,p);
      this.renderer.appendChild(this.table.nativeElement,tr1);
      return;
    }
    for(let i=0;i<Object.keys(this.jobs).length;i++){

      let tr1 = this.renderer.createElement('tr');
      
      let td1 = this.renderer.createElement('td');
      td1.innerHTML = this.jobs[i].company;
      this.renderer.appendChild(tr1,td1);

      let td2 = this.renderer.createElement('td');
      td2.innerHTML = this.jobs[i].jobName;
      this.renderer.appendChild(tr1,td2);

      let td3 = this.renderer.createElement('td');
      td3.innerHTML = this.jobs[i].jobType;
      this.renderer.appendChild(tr1,td3);

      let td4 = this.renderer.createElement('td');
      td4.innerHTML = this.jobs[i].jobSalary;
      this.renderer.appendChild(tr1,td4);

      let td5 = this.renderer.createElement('td');
      td5.innerHTML = this.jobs[i].jobLocation;
      this.renderer.appendChild(tr1,td5);

      let td6 = this.renderer.createElement('td');
      td6.innerHTML = this.jobs[i].jobDescription;
      this.renderer.appendChild(tr1,td6);

      let td7 = this.renderer.createElement('td');
      td7.innerHTML = this.jobs[i].jobVacancy;
      this.renderer.appendChild(tr1,td7);



      this.renderer.appendChild(this.table.nativeElement,tr1);
    }
  }

}
