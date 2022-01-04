import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup; 
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  crearUsuario(){

    if(this.registerForm.invalid){
      return;
    }

    /* puedo abrir un sweet alert cuando quiera,ya lo destruiré con Swal.close,que cierra la instancia que esté abierta de Swal.*/
    Swal.fire({
      title: 'Espere,por favor...',
      didOpen: () => {
        Swal.showLoading()
      }
    }) 

    const {nombre,email,password} = this.registerForm.value;

    this.authService.crearUsuario( nombre, email, password)
       .then(credenciales =>{
        //  console.log(credenciales.user?.uid,'registro');
      Swal.close(); 
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
    });
    
  }


}
