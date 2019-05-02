import {ActionReducer, ActionReducerMap} from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as fromRouter from '@ngrx/router-store';
import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  app: any;
  router: any;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.appReducer,
  router: fromRouter.routerReducer
};

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const {queryParams} = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const {params} = state;

    return {url, queryParams, params};
  }
}

