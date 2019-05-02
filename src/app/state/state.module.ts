import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomSerializer} from './reducers';
import {RouterStateSerializer} from '@ngrx/router-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}]
})
export class StateModule {
}
