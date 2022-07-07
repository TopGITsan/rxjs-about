import { EMPTY, from, fromEvent, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  pluck,
  switchMap,
} from "rxjs/operators";

export const typeahead = document.getElementById("typeahead");

const input$ = fromEvent(typeahead, "input");

const fakeAjaxTypeahead = (param = 'rxjs') => (sourceObservable) => {
  return sourceObservable.pipe(
    debounceTime(200),
    pluck("target", "value"),
    distinctUntilChanged(),
    switchMap((searchTerm) =>
      from(["input", "top", "google", "goggle", "index", "indian", "do", "dit", "done", param]).pipe(
        filter((s) => s.includes(searchTerm)),
        catchError(() => EMPTY)
      )
    ),
    catchError((err) => of(err))
  );
};

export const typeahead$ = input$.pipe(
  // functions that apear in the pipe method accept an observable and return a new observable
  // will have our function return a function which accepts the source observable
  fakeAjaxTypeahead()
);
