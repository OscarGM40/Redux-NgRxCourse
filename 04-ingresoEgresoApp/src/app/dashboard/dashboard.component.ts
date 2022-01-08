import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.rootReducer';
import { setItems } from '../ngrx/ingresoEgreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit,OnDestroy {

  userSubs!: Subscription;
  ingresoSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgreso:IngresoEgresoService
    ) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresoSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').pipe(
       filter(auth => auth.user != null))
      .subscribe( authInitialState => {
        // console.log('authInitialState', authInitialState);
        
        this.ingresoSubs = this.ingresoEgreso.initIngresoEgresoListener(authInitialState.user?.uid!)
          .subscribe( (ingresosEgresos:any[]) => {
          this.store.dispatch(setItems({ items: ingresosEgresos }));
        });

      });
  }

}
