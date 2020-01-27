import * as LO from "redux/login/const";

import { mergeMap, catchError, map } from "rxjs/operators";
import { from, of, Observable, throwError } from "rxjs";
import { facebookAPI } from "services";

export const statusChange = () =>
  Observable.create(observer => {
    facebookAPI.onEvent("auth.statusChange", response =>
      observer.next(response)
    );
  }).pipe(
    mergeMap(response => {
      if (response.authResponse) {
        return of(response).pipe(
          mergeMap(loginStatus =>
            from(
              facebookAPI.request("/me", "get", {
                fields: "location,languages,name"
              })
            ).pipe(
              map(userData => ({
                type: LO.STATUS_CHANGE.SUCCESS,
                payload: { ...loginStatus, ...userData }
              })),
              catchError(err => throwError(err))
            )
          ),
          catchError(err => throwError(err))
        );
      } else {
        return of({ type: LO.STATUS_CHANGE.SUCCESS, payload: response });
      }
    }),
    catchError(err => throwError(err)),

    catchError(err => ({
      type: LO.STATUS_CHANGE.ERROR,
      meta: { error: err.message || JSON.stringify(err) }
    }))
  );
