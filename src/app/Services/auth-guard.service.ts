import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router) {}

  logout() {
    this.clearStorage();
    this.router.navigateByUrl('/login', { replaceUrl: true }).then(() => {
      // Manipulate history after navigation is complete
      history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', this.preventBackNavigation);
    });
  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
    this.clearCookies();
  }

  clearCookies() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      // document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  preventBackNavigation = (event: PopStateEvent) => {
    history.pushState(null, '', window.location.href);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  };
  
}