import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['jane@gmail.com', [Validators.required, Validators.email]],
      password: ['ABCabc123', Validators.required]
    });
  }

  loginUsuario(){
    if (this.loginForm.invalid) { return; }

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then((cred) => {
        console.log(cred.user?.uid,'login');
        this.router.navigate(['/dashboard']);
      })
      .catch(err => console.log(err));
  }

}
