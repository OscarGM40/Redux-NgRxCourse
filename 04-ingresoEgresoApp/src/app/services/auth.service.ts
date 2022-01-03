import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http:HttpClient,
    public afAuth: AngularFireAuth
    ) { }

  crearUsuario(nombre:string, email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUsuario(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

}
