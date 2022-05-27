import { fromEvent } from "rxjs";

export const click$ = fromEvent(document, 'click');