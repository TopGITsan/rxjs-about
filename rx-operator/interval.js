import { interval, Subject } from "rxjs";
import { multicast, refCount, tap } from 'rxjs/operators';

export const interval$ = interval(2000).pipe(
    tap((val) => console.log("new interval : ", val))
  );

export const multicastedInterval$ =  interval$.pipe(
  multicast(()=> new Subject()),
  refCount()
)