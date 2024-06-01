import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private http:HttpClient,private router:Router){}
  @ViewChild('currentPassword') currentPassword !: ElementRef;
  @ViewChild('roleId') roleId !: ElementRef;
  @ViewChild('newPassword') newPassword !: ElementRef;
  @ViewChild('confirmPassword') confirmPassword !: ElementRef;

  isVerified:number = 0;
  notSimilar:number = 0;
  response:any;

  verify(){
    const currentPasswordValue = this.currentPassword.nativeElement.value;
    
    console.log(currentPasswordValue);
    this.isVerified = 1;
  }
  checkIsSame(){
    const newPasswordValue = this.newPassword.nativeElement.value;
    const confirmPasswordValue = this.confirmPassword.nativeElement.value;
    console.log("hello");
    
    if(newPasswordValue != confirmPasswordValue){
      this.notSimilar = 1;
      console.log("log");
    }
      
  }

  
  reset(){
    let a = this.http.get(`http://localhost:8080/getUserByRoleId/${this.roleId?.nativeElement.value}`).subscribe(
      (data) => {
        console.log(data);
        this.response = data;

        this.response.password = this.newPassword?.nativeElement.value;

        this.http.post<any>("http://localhost:8080/updateUserByRoleId" , this.response).subscribe(
          response => {
            console.log('Response from backend:', response);

            this.router.navigateByUrl('/log-in');
          },
          error => {
            console.error('Error sending data to backend:', error);
            // Handle error as needed
          }
        );

      },
      (error) => {
        console.log(error);
      }
    );

  }

}
