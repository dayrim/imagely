import * as LO from "redux/login/const";

import { ofType } from "redux-observable";
import { mergeMap, catchError, debounceTime } from "rxjs/operators";
import { from, of } from "rxjs";

export const fetchProducts = action$ => action$.pipe(ofType(LO.LOGIN.START));
