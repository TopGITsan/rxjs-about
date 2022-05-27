import { fromEvent, of, throwError } from "rxjs";
import { catchError, mergeMapTo } from "rxjs/operators";
import { customRetry } from "../utils/custom-retry";

const click$ = fromEvent(document, "click");

export const clickError$ = click$.pipe(
  mergeMapTo(
    throwError({ status: 400, message: "Server error" }).pipe(
      customRetry(),
      catchError((err) => of(err))
    )
  )
);


