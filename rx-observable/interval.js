import { interval, Subject } from "rxjs";
import {share, tap } from 'rxjs/operators';

export const interval$ = interval(2000).pipe(
    tap((val) => console.log("new interval : ", val))
  );

export const multicastedInterval$ =  interval$.pipe(
  share()
)