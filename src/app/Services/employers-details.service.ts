import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployersDetailsService {

  constructor(private http:HttpClient) { }

  response1:any = {};
  response2:any = {};

  employerData : any = {};

  async getAllEmployers(): Promise<any[]> {
    let employersList: any[] = [];
    
    try {
      
      const data: any = await this.http.get(`http://localhost:8080/getAllEmployers`).toPromise();
      
      for (let i = 0; i < data.length; i++) {
        let employer = {
          roleId: data[i].role.roleId,
          userName: "",
          email: "",
          phoneNo: '',
          address: data[i].address,
          nationality: '',
          company: data[i].company,
          companyAddress: data[i].companyAddress,
          sector: data[i].sector,
          companySize: data[i].companySize
        };
  
        try {
          const userData: any = await this.http.get(`http://localhost:8080/getUserByRoleId/${employer.roleId}`).toPromise();
          
          if (userData != null) {
            employer.userName = userData.userName;
            employer.email = userData.userEmail;
            employer.phoneNo = userData.phoneNo;
            employer.nationality = userData.nationality;
            employersList.push(employer);
          }
  
          
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
  
      return employersList;
  
    } catch (error) {
      console.log('Error fetching employers data:', error);
      return [];
    }
  }

  async getJobsByRoleId():Promise<any[]>{
    
    let jobs:any[] = [];

    try{
      const data:any = await this.http.get(`http://localhost:8080/getJobsByRoleId/${this.employerData.roleId}`).toPromise();
      console.log(data);
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }
    
  }
  

}
