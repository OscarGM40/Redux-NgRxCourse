import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedGuard implements CanActivate {
  private previousUrl: string="";
  private currentUrl: string;

  constructor(private router: Router,private authService: AuthService) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
               }
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuth().pipe(
      tap( auth => {
        if (auth) { this.router.navigateByUrl(this.previousUrl); }
      }));
  }
  
}
