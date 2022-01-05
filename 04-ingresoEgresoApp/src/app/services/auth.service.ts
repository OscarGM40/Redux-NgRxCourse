import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor( 
      public afAuth: AngularFireAuth,
      private firestore:AngularFirestore,
      ) { }

  initAuthListener(){
    return this.afAuth.authState.subscribe({
      next: (fbUser) => {
      /*   console.log(fbUser?.displayName);
        console.log(fbUser?.email);
        console.log(fbUser?.uid); */
      },
      error: (err) => console.log('Error en la suscripcion',err),
      complete: () => console.log('Suscripcion completada')
    });
  }

  crearUsuario(nombre:string, email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then( fbUser => {
      const { uid, email} = fbUser.user!;
      const newUser = new Usuario(uid, nombre,email!);

      return this.firestore.collection('usuarios').doc(`${uid}`).set({...newUser})
    });
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
