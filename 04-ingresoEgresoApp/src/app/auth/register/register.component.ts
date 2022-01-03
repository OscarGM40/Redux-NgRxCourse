import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


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
    
    const {nombre,email,password} = this.registerForm.value;

    this.authService.crearUsuario( nombre, email, password)
       .then(credenciales =>{
         console.log(credenciales.user?.uid,'registro');
      this.router.navigate(['/dashboard']);
    }).catch(err => console.log(err));
    
  }


}
