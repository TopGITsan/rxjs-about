import { of } from "rxjs";

import { subject, loading$ } from "./rx-operator/subject";
import { observer } from "./rx-observer/observer";
import { interval$ } from "./rx-operator/interval";

import { loadingOverlay } from "./overlay/loadingOverlay";
/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
of("Hello", "RxJS").subscribe(console.log);

// practice subject
const subscription = subject.subscribe(observer);

// subject.next("Practice makes perfect");

const subscriptionTwo = subject.subscribe(observer);

// subject.next("Calling next again");

// unicast
// interval$.subscribe(observer);
// interval$.subscribe(observer);

// multicast
// ex: socket
// interval$.subscribe(subject);

loading$.subscribe((isLoading) =>
  isLoading ? loadingOverlay.classList.add("open") : loadingOverlay.classList.remove("open")
);
