import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.rootReducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  user!: Usuario;
  userSubs!: Subscription;

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userSubs = this.store.select('auth')
       .pipe(filter(auth => auth.user != null))
      .subscribe(({ user }) => this.user = user!);
  }

  logout() {
    Swal.fire({
      title: 'Cerrando sesión ...',
      didOpen: () => { Swal.showLoading() }
    })
    setTimeout(() => {
      this.authService.logout()
        .then(() => this.router.navigate(['/login'])
          .then(() => Swal.close()));
    }, 300);
  }

  ngOnInit(): void {
  }

}
