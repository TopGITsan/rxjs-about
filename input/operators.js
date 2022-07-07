import { from, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  pluck,
  switchMap,
} from "rxjs/operators/index.js";

export const fakeAjaxTypeahead = (param = 'rxjs') => (sourceObservable) => {
  return sourceObservable.pipe(
    debounceTime(200),
    pluck("target", "value"),
    distinctUntilChanged(),
    switchMap((searchTerm) =>
      from(["input", "top", "google", "goggle", "index", "indian", "do", "dit", "done", "test", param]).pipe(
        filter((s) => s.includes(searchTerm)),
        catchError(() => EMPTY)
      )
    ),
    catchError((err) => of(err))
  );
};