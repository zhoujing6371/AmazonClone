import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check if the user is logged in.
    if (localStorage.getItem('token')) { // If logged in, Allow access to the profile and block access to route the register page
      return state.url.startsWith('/profile')
        ? true
        : (this.router.navigate(['/']), false);
    } else {// if not logged in, block access to routes the user profile and allow access to the register page.
      return state.url.startsWith('/profile')
        ? (this.router.navigate(['/']), false)
        : true;
    }
  }
}
