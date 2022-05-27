import { of, throwError, timer } from "rxjs";
import { catchError, mergeMap, retryWhen } from "rxjs/operators";

export const customRetry =
  ({ retryAttempts = 3, scalingDuration = 1500, excludedStatusCodes = [] } = {}) =>
  (source) =>
    source.pipe(
      retryWhen((attempts) => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (
              attemptNumber > retryAttempts ||
              excludedStatusCodes.find((e) => e == error.status)
            ) {
              console.log("Giving up");
              return throwError(error);
            }
            console.log(
              `Attempt ${attemptNumber}: retrying in ${attemptNumber * scalingDuration}ms`
            );
            return timer(attemptNumber * scalingDuration);
          })
        );
      }),
      catchError((err) => of(err))
    );
