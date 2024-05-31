import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GraduateDetailsService } from '../Services/graduate-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graduates-list',
  templateUrl: './graduates-list.component.html',
  styleUrls: ['./graduates-list.component.css']
})
export class GraduatesListComponent implements OnInit {

  graduates: any[] = [];
  @ViewChild('cardsContainer', { static: true }) cardsContainer: ElementRef|undefined;

  constructor(private renderer: Renderer2, private graduateDetailsService: GraduateDetailsService, private router: Router) {}

  async ngOnInit() {
    try {
      this.graduates = await this.graduateDetailsService.getAllGraduates();
      this.generateCards();
    } catch (error) {
      console.error('Error fetching graduates:', error);
    }
  }

  generateCards() {
    const container = this.cardsContainer?.nativeElement;
    while (container.firstChild) {
      this.renderer.removeChild(container, container.firstChild);
    }

    this.graduates.forEach(graduate => {
      const card = this.renderer.createElement('div');
      this.renderer.addClass(card, 'graduate-card');

      const nameElement = this.renderer.createElement('h3');
      nameElement.innerHTML = graduate.userName;
      this.renderer.appendChild(card, nameElement);

      const roleElement = this.renderer.createElement('p');
      roleElement.innerHTML = `Role Id: ${graduate.roleId}`;
      this.renderer.appendChild(card, roleElement);

      const emailElement = this.renderer.createElement('p');
      emailElement.innerHTML = `Email: ${graduate.email}`;
      this.renderer.appendChild(card, emailElement);

      const moreButton = this.renderer.createElement('button');
      moreButton.innerHTML = 'More';
      this.renderer.listen(moreButton, 'click', (event) => {
        event.preventDefault();
        this.graduateDetailsService.graduateData = graduate;
        this.router.navigate(['/graduate-profile']);
      });
      this.renderer.appendChild(card, moreButton);

      this.renderer.appendChild(container, card);
    });
  }
}
