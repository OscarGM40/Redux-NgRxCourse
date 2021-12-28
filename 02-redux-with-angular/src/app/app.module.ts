import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*  NgRx */
import { StoreModule } from '@ngrx/store';
import {  StoreDevtoolsModule } from '@ngrx/store-devtools';
import { contadorReducer } from './contador/contador.reducer';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HijoComponent } from './contador/hijo/hijo.component';
import { NietoComponent } from './contador/nieto/nieto.component';

@NgModule({
  declarations: [
    AppComponent,
    HijoComponent,
    NietoComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ contador: contadorReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states for logging,no tiene nada que ver con el numero máximo de estados que se ueden realizar(estos son infinitos)
      logOnly: environment.production, // si estoy en produccion las devtools son de solo lectura,si estoy en desarrollo puedo cambiar cosas del state
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
