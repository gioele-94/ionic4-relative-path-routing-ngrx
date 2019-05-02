import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {Go, RouterActionTypes} from './router.actions';

@Injectable()
export class RouterEffects {

  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType<Go>(RouterActionTypes.Go),
    map(action => action.payload),
    tap(({path, relative, query: queryParams, extras}) => {
      if (relative) {
        extras = extras ? {
          ...extras,
          relativeTo: RouterEffects.getLastChildRoute(this.activeRoute)
        } : {relativeTo: RouterEffects.getLastChildRoute(this.activeRoute)};
      }
      console.debug(path, extras);

      this.router.navigate(path, {queryParams, ...extras});
    })
  );

  // tslint:disable-next-line
  private static getLastChildRoute(route: ActivatedRoute): ActivatedRoute {
    let returnRoute = route;
    console.debug('route', route);
    while (returnRoute.firstChild) {
      returnRoute = returnRoute.firstChild;
    }
    return returnRoute;
  }

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute
  ) {
  }

}
