import { from, of } from "rxjs";
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  pluck,
  switchMap,
} from "rxjs/operators/index.js";

export const fakeAjaxTypeahead =
  (param = "rxjs") =>
  (sourceObservable) => {
    return sourceObservable.pipe(
      debounceTime(200),
      pluck("target", "value"),
      distinctUntilChanged(),
      switchMap((searchTerm) =>
        from([
          "input",
          "top",
          "google",
          "goggle",
          "index",
          "indian",
          "do",
          "dit",
          "done",
          "test",
          "first",
          "second",
          param,
        ]).pipe(
          delay(300), // fake server request
          filter((s) => s.includes(searchTerm)),
          catchError(() => EMPTY)
        )
      ),
      catchError((err) => of(err))
    );
  };
