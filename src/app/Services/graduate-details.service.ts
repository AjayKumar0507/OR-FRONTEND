import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GraduateDetailsService {

  constructor(private http:HttpClient,private dataService:DataService,private router:Router) { }

  response1:any = {};
  response2:any = {};

  graduateData:any  = {};


  async getAllGraduates(): Promise<any[]> {
    let graduatesList: any[] = [];
    
    try {
      
      const data: any = await this.http.get(`http://localhost:8080/getAllGraduates`).toPromise();
      
      for (let i = 0; i < data.length; i++) {
        let graduate = {
          roleId: data[i].role.roleId,
          userName: "",
          email: "",
          password:"",
          phoneNo: '',
          nationality: '',
          college : data[i].collegeName,
          collegeAddress : data[i].collegeAddress,
          gender : data[i].gender,
          DOB : data[i].dateOfBirth,
          address : data[i].address,
          skills : data[i].skills,
          project : data[i].project
        };
  
        try {
          const userData: any = await this.http.get(`http://localhost:8080/getUserByRoleId/${graduate.roleId}`).toPromise();
          
          if (userData != null) {
            graduate.userName = userData.userName;
            graduate.email = userData.userEmail;
            graduate.password = userData.password;
            graduate.phoneNo = userData.phoneNo;
            graduate.nationality = userData.nationality;
            graduatesList.push(graduate);
          }
  
          
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
  
      return graduatesList;
  
    } catch (error) {
      console.log('Error fetching employers data:', error);
      return [];
    }
  }

  async getAppointmentsByroleId():Promise<any[]>{
    let jobs:any[] = [];

    try{
      const data:any = await this.http.get(`http://localhost:8080/getAppointmentsByRoleId/${this.graduateData.roleId}`).toPromise();
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }
  }
  
  async getPendingApplications():Promise<any[]>{
    
    try{
      const data:any = await this.http.get(`http://localhost:8080/getPendingAppointmentsById/${this.dataService.userData.role.roleId}`).toPromise();
      console.log(data);
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }
  }

  async getAcceptedApplications():Promise<any[]>{
    
    try{
      const data:any = await this.http.get(`http://localhost:8080/getAcceptedAppointmentsById/${this.dataService.userData.role.roleId}`).toPromise();
      console.log(data);
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }
  }

  async getGraduateDetails(){
    let graduate = {
      roleId: "",
      userName: "",
      email: "",
      password:"",
      phoneNo: '',
      nationality: '',
      college : "",
      collegeAddress : "",
      gender : "",
      DOB : "",
      address : "",
      skills : "",
      project : ""
    };

    try {
      const userData: any = await this.http.get(`http://localhost:8080/getUserByRoleId/${this.dataService.userData.role.roleId}`).toPromise();
      
      if (userData != null) {
        graduate.roleId = this.dataService.userData.role.roleId;
        graduate.userName = userData.userName;
        graduate.email = userData.userEmail;
        graduate.password = userData.password;
        graduate.phoneNo = userData.phoneNo;
        graduate.nationality = userData.nationality;

        try{
          const userData: any = await this.http.get(`http://localhost:8080/getUserByRoleId/${this.dataService.userData.role.roleId}`).toPromise();

          if(userData != null){
            graduate.college = userData.collegeName;
            graduate.collegeAddress = userData.collegeAddress;
            graduate.gender = userData.gender;
            graduate.DOB = userData.dateOfBirth;
            graduate.address = userData.address;
            graduate.skills = userData.skills;
            graduate.project = userData.project;

            this.graduateData = graduate;
            console.log(this.graduateData);
            console.log('Anchor clicked');
            this.router.navigate(['/graduate-profile']);

          }

        }catch(error){
          console.log('Error fetching graduate data',error);
        }

      }
      
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }

  
}
