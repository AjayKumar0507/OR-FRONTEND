import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(){}
  @ViewChild('currentPassword') currentPassword !: ElementRef;
  @ViewChild('newPassword') newPassword !: ElementRef;
  @ViewChild('confirmPassword') confirmPassword !: ElementRef;

  isVerified:number = 0;
  notSimilar:number = 0;

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

  
  
  /*
  constructor(private emailService: EmailPasswordResetServiceService) {}

  onClickSendEmail() {
    console.log("hello clicked");
    const to = 'ajaykakunuri0507@gmail.com';
    const subject = 'Test Email';
    const text = 'This is a test email sent from Angular app.';
    this.emailService.sendEmail(to, subject, text);
    
  }*/

  sendMail(){

  }

}
