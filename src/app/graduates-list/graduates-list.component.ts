import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EmployersDetailsService } from '../Services/employers-details.service';
import { GraduateDetailsService } from '../Services/graduate-details.service';

@Component({
  selector: 'app-graduates-list',
  templateUrl: './graduates-list.component.html',
  styleUrl: './graduates-list.component.css'
})
export class GraduatesListComponent implements OnInit {

  graduates: any[] = [];
  @ViewChild('table', { static: true }) table!: ElementRef;

  constructor(private renderer: Renderer2, private graduateDetailsService: GraduateDetailsService) {}

  async ngOnInit() {
    try {
      this.graduates = await this.graduateDetailsService.getAllGraduates();
      console.log(this.graduates);
      this.generateTable();
    } catch (error) {
      console.error('Error fetching graduates:', error);
    }
  }

  generateTable() {
    // Clear existing table rows
    const tableElement = this.table.nativeElement;
    while (tableElement.firstChild) {
      this.renderer.removeChild(tableElement, tableElement.firstChild);
    }

    for (let i = 0; i < this.graduates.length; i++) {
      console.log(1);
      let tr = this.renderer.createElement('tr');

      let td1 = this.renderer.createElement('td');
      let anchor = this.renderer.createElement('a');
      anchor.innerHTML = this.graduates[i].userName;
      
      
      this.renderer.setAttribute(anchor, "routerLink", "/employer-jobs"); 
      this.renderer.setAttribute(anchor,"href" ,"#");
/*
      this.renderer.listen(anchor, 'click', (event) => {
        event.preventDefault();

        console.log('Anchor clicked');
        this.router.navigate(['/employer-jobs']);
         
      });
*/
      this.renderer.appendChild(td1,anchor);
      this.renderer.appendChild(tr, td1);


      let td2 = this.renderer.createElement('td');
      td2.innerHTML = this.graduates[i].roleId;
      this.renderer.appendChild(tr, td2);

      let td3 = this.renderer.createElement('td');
      td3.innerHTML = this.graduates[i].email;
      this.renderer.appendChild(tr, td3);

      let td4 = this.renderer.createElement('td');
      td4.innerHTML = this.graduates[i].phoneNo;
      this.renderer.appendChild(tr, td4);

      let td5 = this.renderer.createElement('td');
      td5.innerHTML = this.graduates[i].college;
      this.renderer.appendChild(tr, td5);

      let td6 = this.renderer.createElement('td');
      td6.innerHTML = this.graduates[i].collegeAddress;
      this.renderer.appendChild(tr, td6);

      let td7 = this.renderer.createElement('td');
      td7.innerHTML = this.graduates[i].skills;
      this.renderer.appendChild(tr, td7);

      let td8 = this.renderer.createElement('td');
      td8.innerHTML = this.graduates[i].project;
      this.renderer.appendChild(tr, td8);

      let td9 = this.renderer.createElement('td');
      td9.innerHTML = this.graduates[i].gender;
      this.renderer.appendChild(tr, td9);

      let td10 = this.renderer.createElement('td');
      td10.innerHTML = this.graduates[i].DOB;
      this.renderer.appendChild(tr, td10);

      let td11 = this.renderer.createElement('td');
      td11.innerHTML = this.graduates[i].address;
      this.renderer.appendChild(tr, td11);
      
      let td12 = this.renderer.createElement('td');
      td12.innerHTML = this.graduates[i].nationality;
      this.renderer.appendChild(tr, td12);
      
      this.renderer.appendChild(this.table.nativeElement, tr);
    }
  }

}
