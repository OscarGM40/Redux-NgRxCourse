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
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit,OnDestroy {

  registerForm!: FormGroup; 
  uiSubscription!: Subscription;  
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    ) { 
      this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
    }
    
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  
  crearUsuario(){

    if(this.registerForm.invalid){
      return;
    }
    this.store.dispatch(ui.isLoading());
    /* puedo abrir un sweet alert cuando quiera,ya lo destruiré con Swal.close,que cierra la instancia que esté abierta de Swal.*/
  /*   Swal.fire({
      title: 'Espere,por favor...',
      didOpen: () => {
        Swal.showLoading()
      }
    })  */
    
    const {nombre,email,password} = this.registerForm.value;
    
    this.authService.crearUsuario( nombre, email, password)
    .then(credenciales =>{
      //  console.log(credenciales.user?.uid,'registro');
      Swal.close(); 
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
    });
    
  }
  
  
}
