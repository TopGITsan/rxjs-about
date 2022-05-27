import { fromEvent, of, throwError, timer } from "rxjs";
import { catchError, mergeMap, mergeMapTo, retryWhen } from "rxjs/operators";

const click$ = fromEvent(document, "click");

export const clickError$ = click$.pipe(
  mergeMapTo(
    throwError({ status: 400, message: "Server error" }).pipe(
      customRetry(),
      catchError((err) => of(err))
    )
  )
);

function customRetry(
  {retryAttempts= 3, scalingDuration=1500, excludedStatusCodes = []}={}
  ) {
  return function (source) {
    return source.pipe(
      retryWhen((attempts) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (attemptNumber > retryAttempts || excludedStatusCodes.find((e) => e == error.status)) {
              console.log("Giving up");
              return throwError(error);
            }
            console.log(`Attempt ${attemptNumber}: retrying in ${attemptNumber * scalingDuration}ms`);
            return timer(attemptNumber * scalingDuration);
          })
        );
      }),
      catchError((err) => of(err))
    );
  };
}
