import { filter, mapTo, delay } from "rxjs/operators";
import { setGlobalError } from "redux/ui";

export const autoDismissErrors = action$ =>
  action$.pipe(
    filter(action => action.meta && action.meta.error),
    delay(3500),
    mapTo(setGlobalError(false))
  );
