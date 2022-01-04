import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    Swal.fire({
      title: 'Cerrando sesión ...',
      didOpen: () => { Swal.showLoading() }
    })
    setTimeout(() => {
      this.authService.logout()
        .then( () => this.router.navigate(['/login'])
        .then( () => Swal.close() ) );
    },300);
  }

  ngOnInit(): void {
  }

}
