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

export const typeahead$ = input$.pipe(
  debounceTime(200),
  pluck("target", "value"),
  distinctUntilChanged(),
  switchMap((searchTerm) =>
    from(["input", "top", "google", "goggle", "index", "indian", "do", "dit", "done"]).pipe(
      filter((s) => s.includes(searchTerm)),
      catchError(()=> EMPTY)
    )
  ),
  catchError((err) => of(err))
);
