import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.rootReducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  username!: string;
  userSubs!: Subscription;

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  constructor(
    private store: Store<AppState>
  ) {
    this.userSubs = this.store.select('auth')
      .pipe(filter( ({user}) => user?.nombre != null))
      .subscribe( ({ user }) => this.username = user!.nombre);
  }

  ngOnInit(): void {
  }

}
