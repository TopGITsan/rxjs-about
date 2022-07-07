import { fromEvent } from "rxjs";

import { fakeAjaxTypeahead } from "./operators";

export const typeahead = document.getElementById("typeahead");

const input$ = fromEvent(typeahead, "input");

export const typeahead$ = input$.pipe(
  // functions that apear in the pipe method accept an observable and return a new observable
  // will have our function return a function which accepts the source observable
  fakeAjaxTypeahead()
);
