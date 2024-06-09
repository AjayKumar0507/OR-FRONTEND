import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http:HttpClient,private dataService:DataService) { }

  async getOutBox(){
    
    let b;
  
    if(this.dataService.isAdmin == true)
      b = "admin";
    else
      b = this.dataService.userData.role.roleId

    try{
      const data:any = await this.http.get(`http://localhost:8080/getOutboxMessagesByRoleId/${b}`).toPromise();
      console.log(1);
      console.log(data);
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }

  }

  async getInBox(){
    
    let b;
  
    if(this.dataService.isAdmin == true)
      b = "admin";
    else
      b = this.dataService.userData.role.roleId

    try{
      const data:any = await this.http.get(`http://localhost:8080/getInboxMessagesByRoleId/${b}`).toPromise();
      console.log(1);
      console.log(data);
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }

  }

  addMessage(to:string,messag:string){
    let message2 = {
      from:{
        roleId : this.dataService.isAdmin ? "admin" : this.dataService.userData.role.roleId,
        roleTitle : this.dataService.isAdmin ? "admmin" : this.dataService.userData.role.roleTitle,
        roleDesc : this.dataService.isAdmin ? "admmin" : this.dataService.userData.role.roleDesc
      },
      toRoleId : to,
      message : messag

    }
    console.log(message2);
    this.http.post<any>(`http://localhost:8080/addMessage` , message2).subscribe(
      response => {
    
      },
      error => {
        console.error('Error sending data to backend:', error);
        // Handle error as needed
      }
    );
  }

}
