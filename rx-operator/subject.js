import { Subject } from "rxjs";

export const subject = new Subject();

const loading$ = new Subject();

export const loadingService = {
  showLoading: () => loading$.next(true),
  hideLoading: () => loading$.next(false),
  loadingStatus$: loading$.asObservable(),
};
