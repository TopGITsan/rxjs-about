import { interval } from "rxjs";
import { tap } from 'rxjs/operators';

export const interval$ = interval(2000).pipe(
    tap((val) => console.log("new interval : ", val))
  );
