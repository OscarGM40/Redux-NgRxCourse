import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }
  
  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuth().pipe(
      tap( auth => {
        if (!auth) { this.router.navigate(['/login']); }
      }));
  }

}
