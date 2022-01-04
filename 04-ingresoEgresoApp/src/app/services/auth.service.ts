import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor( public afAuth: AngularFireAuth) { }

  initAuthListener(){
    return this.afAuth.authState.subscribe({
      next: (fbUser) => {
      /*   console.log(fbUser?.displayName);
        console.log(fbUser?.email);
        console.log(fbUser?.uid); */
        // console.log('suscripcion creada')
      },
      error: (err) => console.log('Error en la suscripcion',err),
      complete: () => console.log('Suscripcion completada')
    });
  }

  crearUsuario(nombre:string, email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUsuario(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.signOut();
  }

  isAuth(){
    return this.afAuth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
