import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../Services/data.service';
import { saveAs } from 'file-saver';
import emailjs from '@emailjs/browser';
import { GraduateDetailsService } from '../Services/graduate-details.service';
import { Router } from '@angular/router';
import { MessagesService } from '../Services/messages.service';


@Component({
  selector: 'app-pending-appointments',
  templateUrl: './pending-appointments.component.html',
  styleUrl: './pending-appointments.component.css'
})
export class PendingAppointmentsComponent implements OnInit {
  constructor(private http:HttpClient,private dataService:DataService,private renderer:Renderer2,private graduateDetailsService:GraduateDetailsService ,private router:Router , private messagesService:MessagesService
  ){}

  @ViewChild('table1') table1!: ElementRef;
  @ViewChild('timeSlot') timeSlot!: ElementRef;
  @ViewChild('dob') date!: ElementRef;

  jobs:any = {};
  job:any = {};
  file:any = {};
  showModal:boolean = false;

  async ngOnInit(){
      try{
        this.jobs = await this.graduateDetailsService.getPendingApplications();
        console.log(this.jobs);
        this.generateAcceptedTable();
      } catch(error){
        console.log(error);
      }
  }

  generateAcceptedTable(){
    
    if(Object.keys(this.jobs).length == 0){
      let tr1 = this.renderer.createElement('tr');
      let p = this.renderer.createElement('p');
      p.innerHTML = "No Appointments";
      this.renderer.addClass(p,'no-jobs');
      
      this.renderer.appendChild(tr1,p);
      this.renderer.appendChild(this.table1?.nativeElement,tr1);
      return;
    }
    for(let i=0;i<Object.keys(this.jobs).length;i++){
      
      let tr1 = this.renderer.createElement('tr');
      
      let td1 = this.renderer.createElement('td');
      td1.innerHTML = this.jobs[i].fullName;
      this.renderer.appendChild(tr1,td1);

      let td2 = this.renderer.createElement('td');
      td2.innerHTML = this.jobs[i].email;
      this.renderer.appendChild(tr1,td2);

      let td3 = this.renderer.createElement('td');
      td3.innerHTML = this.jobs[i].phoneNo;
      this.renderer.appendChild(tr1,td3);

      let td4 = this.renderer.createElement('td');
      td4.innerHTML = this.jobs[i].college;
      this.renderer.appendChild(tr1,td4);

      let td5 = this.renderer.createElement('td');
      td5.innerHTML = this.jobs[i].collegeAddress;
      this.renderer.appendChild(tr1,td5);

      let td6 = this.renderer.createElement('td');
      td6.innerHTML = this.jobs[i].yearOfPassing;
      this.renderer.appendChild(tr1,td6);

      let td7 = this.renderer.createElement('td');
      td7.innerHTML = this.jobs[i].skills;
      this.renderer.appendChild(tr1,td7);

      let td9 = this.renderer.createElement('td');
      td9.innerHTML = this.jobs[i].skills;
      this.renderer.appendChild(tr1,td9);

      let td8 = this.renderer.createElement('td');
      td8.innerHTML = this.jobs[i].project;
      this.renderer.appendChild(tr1,td8);

      let td10 = this.renderer.createElement('td');
      let btn = this.renderer.createElement('button');
      this.renderer.addClass(btn,"download");
      btn.innerHTML = `<i class="fa-solid fa-download dd"></i>Resume`;
      this.renderer.listen(btn, 'click', (event) => {
        
        this.http.get(`http://localhost:8080/getResumeByAppointmentId/${this.jobs[i].id}`, { responseType: 'blob' })
        .subscribe(
          response => {
            console.log('Response:', response);
            this.file = response;
            const blob = new Blob([this.file], { type: 'application/octet-stream' });
            let fileName = this.jobs[i].fullName + "_Resume.pdf";
            saveAs(blob, fileName);
          },
          error => {
            console.error('Error downloading file:', error);
          }
        );

         
      });
      this.renderer.appendChild(td10,btn);
      this.renderer.appendChild(tr1,td10);

      let td11 = this.renderer.createElement('td');
      let btndiv = this.renderer.createElement('div');
      this.renderer.addClass(btndiv,"btn-area");

      let accept = this.renderer.createElement('button');
      this.renderer.addClass(accept,"green");
      accept.innerHTML = "Accept";
      this.renderer.listen(accept,'click',(event) => {

        this.jobs[i].status = "accepted";

        this.http.post<any>("http://localhost:8080/acceptAppointment" , this.jobs[i]).subscribe(
          response => {
          },
          error => {
            console.error('Error sending data to backend:', error);
            // Handle error as needed
          }
        );

        this.job = this.jobs[i];
        
        this.showModal = true;
        

      });

      let reject = this.renderer.createElement('button');
      reject.innerHTML = "Reject";
      this.renderer.listen(reject,'click',(event) => {


        this.http.delete<any>(`http://localhost:8080/deleteAppointment/${this.jobs[i].id}`).subscribe(
          async response => {

            emailjs.init('4rF1y6IRYUNj2kI-3');
            let body = `Hello User
              \n
              We are very sorry to inform you , that the your skills didn't match out requirements.
              You have been rejected.
              \n
              Best wishes,
              \nJobSeekho team`;

            try {
              let response = await emailjs.send( "service_ga6bnio","template_cqgom6d" , {
                from_name: "JobSeekho",
                body : body,
                reply_to : this.jobs[i].email
              });

              console.log("Email sent:", response);
              alert("Email sent");
            } catch (error) {
              console.error("Email sending failed:", error);
              alert("Failed to send email. Please try again.");
            }

            this.messagesService.addMessage(
              this.jobs[i].rolea.roleId,
              "Hello jobSeeker, unfortunately you didn't match our requirements and we couldn't hire you.\nBetter luck next time."
            );


            this.router.navigateByUrl("/accepted-appointments");
          },
          error => {
            console.error('Error sending data to backend:', error);
            // Handle error as needed
          }
        );
    

      });

      this.renderer.appendChild(btndiv,accept);
      this.renderer.appendChild(btndiv,reject);

      this.renderer.appendChild(td11,btndiv);
      this.renderer.appendChild(tr1,td11);

      this.renderer.appendChild(this.table1?.nativeElement,tr1);
    }
  }
  
  sendAppointment(){
    emailjs.init('4rF1y6IRYUNj2kI-3');
    let body = `Congratulations User
      \n
      You have been selected for the interview.
      \n
      Your Appointment Date : ${this}
      \n
      Your Time Slot : ${this.timeSlot?.nativeElement.value}
      \n
      Best wishes,
      \nJobSeekho team`;

    try {
      let response = emailjs.send( "service_ga6bnio","template_cqgom6d" , {
        from_name: "JobSeekho",
        body : body,
        reply_to : this.job.email
      });

      console.log("Email sent:", response);
      alert("Email sent");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again.");
    }

    this.messagesService.addMessage(
      this.job.rolea.roleId,
      `Congratulations User
      \n
      You have been selected for the interview.
      \n
      Your Appointment Data : ${this.date?.nativeElement.value}
      \n
      Your Time Slot : ${this.timeSlot?.nativeElement.value}
      \n
      Best wishes,
      \nJobSeekho team`
    );
    
    this.router.navigateByUrl("/accepted-appointments");
  }

}
