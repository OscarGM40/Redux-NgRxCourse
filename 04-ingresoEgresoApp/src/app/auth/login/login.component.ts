import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.rootReducer';
import * as ui from 'src/app/ngrx/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit,OnDestroy {
  
  loginForm!: FormGroup; 
  isLoading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { 
  }
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['jane@gmail.com', [Validators.required, Validators.email]],
      password: ['ABCabc123', Validators.required]
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
    
  }
  
  loginUsuario(){
    if (this.loginForm.invalid) { return; }
    
    this.store.dispatch(ui.isLoading());
    
/*     Swal.fire({
      title: 'Espere,por favor...',
      didOpen: () => { Swal.showLoading() }}); */

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then((cred) => {
        // console.log(cred.user?.uid,'login');
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

}
