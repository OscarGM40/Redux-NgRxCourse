import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AppState } from '../app.rootReducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService implements OnDestroy {

  private _user!: Usuario | null;
  authSubscription!: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.authSubscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(authInitialState => {
        // console.log('authInitialState', authInitialState);
        this._user = authInitialState.user;
        this.initIngresoEgresoListener();
      });
  }

  ngOnDestroy() {
    console.log('subs destruida a auth');
    this.authSubscription.unsubscribe();
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    // console.log(this._user?.uid);
    // console.log(ingresoEgreso);
    return this.firestore.doc(`${this._user?.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
  }

  initIngresoEgresoListener() {
    this.firestore
      .doc(`${this._user?.uid}/ingresos-egresos`)
      .collection('items')
       /* valueChanges sólo devuelve el contenido del documento,mientras que snapshotChanges devuelve mucha más información,además de una función data() para acceder a ese contenido.Hay que entrar a snapshot.payload.doc para ver el id y esa función data() */
      .snapshotChanges()
      .pipe(
        map(snapshots => snapshots.map(snapshot => ({
          uid: snapshot.payload.doc.id,
          ...snapshot.payload.doc.data()
        }))),
        // tap(console.log)
      ).subscribe(console.log);
  }

  
}
