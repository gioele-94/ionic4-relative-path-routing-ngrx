import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as RouterActions from '../state/router.actions';
import {Store} from '@ngrx/store';
import {State} from '../state/reducers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private store: Store<State>, private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  goOnRelative(): void {
    this.store.dispatch(new RouterActions.Go({
     path: ['../forwarded'],
     relative: true
   }));
  }

  goOnAbsolute(): void{
    this.store.dispatch(new RouterActions.Go({
      path: ['/forwarded'],
      relative: false
    }));
  }
}
