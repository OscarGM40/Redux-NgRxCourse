import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.rootReducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ui from '../ngrx/ui.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {

  ingresoForm!: FormGroup;
  tipo:string = "ingreso";
  isLoading: boolean = false;
  uiSubscription!: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['',Validators.required],
      monto: ['',Validators.required],
    });

    this.uiSubscription = this.store.select('ui')
    .subscribe(ui => this.isLoading = ui.isLoading);
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  submitForm() {

    if (this.ingresoForm.invalid) { return; }

    this.store.dispatch(ui.isLoading());
    
    const { descripcion,monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      
      this.ingresoForm.reset();
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Registro Creado', descripcion, 'success');
    })
    .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

}
