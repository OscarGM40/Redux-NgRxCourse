import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private _user!: Usuario | null;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;
    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
  }

  initIngresoEgresoListener(uid:string) {
    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
       /* valueChanges sólo devuelve el contenido del documento,mientras que snapshotChanges devuelve mucha más información,además de una función data() para acceder a ese contenido.Hay que entrar a snapshot.payload.doc para ver el id y esa función data() */
      .snapshotChanges()
      .pipe(
        map(snapshots => snapshots.map(snapshot => ({
          uid: snapshot.payload.doc.id,
          ...snapshot.payload.doc.data()
        }))),
        // tap(console.log),
      );
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.user;
    return this.firestore.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }
  
}
