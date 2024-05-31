import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EmployersDetailsService } from '../Services/employers-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.component.html',
  styleUrls: ['./employers-list.component.css']
})
export class EmployersListComponent implements OnInit {

  employers: any[] = [];
  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef;

  constructor(private renderer: Renderer2, private employerDetailsService: EmployersDetailsService, private router: Router) {}

  async ngOnInit() {
    try {
      this.employers = await this.employerDetailsService.getAllEmployers();
      this.generateCards();
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  }

  generateCards() {
    const container = this.cardsContainer.nativeElement;
    while (container.firstChild) {
      this.renderer.removeChild(container, container.firstChild);
    }

    this.employers.forEach(employer => {
      const card = this.renderer.createElement('div');
      this.renderer.addClass(card, 'employer-card');

      const nameElement = this.renderer.createElement('h3');
      nameElement.innerHTML = employer.userName;
      this.renderer.appendChild(card, nameElement);

      const roleElement = this.renderer.createElement('p');
      roleElement.innerHTML = `Role Id: ${employer.roleId}`;
      this.renderer.appendChild(card, roleElement);

      const emailElement = this.renderer.createElement('p');
      emailElement.innerHTML = `Email: ${employer.email}`;
      this.renderer.appendChild(card, emailElement);

      

      const moreButton = this.renderer.createElement('button');
      moreButton.innerHTML = 'More';
      this.renderer.listen(moreButton, 'click', (event) => {
        event.preventDefault();
        this.employerDetailsService.employerData = employer;
        this.router.navigate(['/employer-jobs']);
      });
      this.renderer.appendChild(card, moreButton);

      this.renderer.appendChild(container, card);
    });
  }
}
