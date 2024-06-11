import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  @ViewChild('accordion', { static: true }) accordionRef: ElementRef | undefined;

  ngAfterViewInit() {
    if (this.accordionRef) {
      const accordions = this.accordionRef.nativeElement.getElementsByClassName('content-container');
      if (accordions) {
        for (let i = 0; i < accordions.length; i++) {
          accordions[i].addEventListener('click', () => {
            accordions[i].classList.toggle('active');
          });
        }
      }
    }
  }
}