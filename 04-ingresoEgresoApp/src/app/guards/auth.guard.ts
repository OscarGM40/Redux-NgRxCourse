import { Injectable } from '@angular/core';
import { CanActivate, Router,CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) { }
  
  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuth().pipe(
      tap( auth => {
        if (!auth) { this.router.navigate(['/login']); }
      }));
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.isAuth().pipe(
      tap( auth => {
        if (!auth) { this.router.navigate(['/login']); }
      }),
      take(1));
  }

}
