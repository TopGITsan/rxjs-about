import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";

export const subject = new Subject();

const loading$ = new BehaviorSubject(false);

export const loadingService = {
  showLoading: () => loading$.next(true),
  hideLoading: () => loading$.next(false),
  loadingStatus$: loading$.asObservable(),
};


export const cacheSubject = new ReplaySubject();