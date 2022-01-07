import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { AppState } from '../app.rootReducer';
import { Usuario } from '../models/usuario.model';
import * as auth from '../ngrx/auth.actions';



@Injectable({ providedIn: 'root' })
export class AuthService {

  userSubscription!: Subscription;
  
  constructor( 
      public afAuth: AngularFireAuth,
      private firestore:AngularFirestore,
      private store:Store<AppState>
      ) {  }

  initAuthListener(){
    this.afAuth.authState.subscribe( (fbUser) =>{
        if(fbUser){

          this.userSubscription = this.firestore.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe( (firestoreUser:any) => {
            // console.log(firestoreUser);
            const { nombre, email, uid } = firestoreUser;
            const user = new Usuario(uid, nombre, email);
            this.store.dispatch(auth.setUser({user}));

          });
        } else {
          this.userSubscription && this.userSubscription.unsubscribe();
          this.store.dispatch(auth.unsetUser());
        }
      }
    );
  }

  crearUsuario(nombre:string, email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then( fbUser => {
      const { uid, email} = fbUser.user!;
      const newUser = new Usuario(uid, nombre,email!);

      return this.firestore.doc(`${uid}/usuario`).set({...newUser})
    });
  }

  loginUsuario(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    // this.store.dispatch(auth.unsetUser());
    return this.afAuth.signOut();
  }

  isAuth(){
    return this.afAuth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
