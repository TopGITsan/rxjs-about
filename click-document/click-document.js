import { fromEvent, throwError, timer } from "rxjs";
import { catchError, mergeMap, mergeMapTo, retryWhen } from "rxjs/operators";

const click$ = fromEvent(document, "click");

export const clickError$ = click$.pipe(
  mergeMapTo(
    throwError({ status: 400, message: "Server error" }).pipe(
      retryWhen((attempts) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (attemptNumber > 3 || [402, 500].find((e) => e == error.status)) {
              console.log("Giving up");
              return throwError(error);
            }
            console.log(`Attempt ${attemptNumber}: retrying in ${attemptNumber * 1000}ms`);
            return timer(attemptNumber * 1000);
          })
        );
      }),
      catchError((err) => of(err))
    )
  )
);
