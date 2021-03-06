import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  interval,
  of,
  queueScheduler,
} from "rxjs";

import { cacheSubject } from "./rx-observable/subject";
import { observer } from "./rx-observer/observer";

import { loadingOverlay } from "./overlay/loadingOverlay";

import { ObservableStore } from "./store/store";

import { ball } from "./ball/ball";
import { clickError$ } from "./click-document/click-document";

import { typeahead$ } from "./input/input";

import {
  takeWhile,
} from "rxjs/operators";
/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
of("Hello", "RxJS").subscribe(console.log);

// practice subject
// const subscription = subject.subscribe(observer);

// subject.next("Practice makes perfect");

// const subscriptionTwo = subject.subscribe(observer);

// subject.next("Calling next again");

// unicast
// interval$.subscribe(observer);
// interval$.subscribe(observer);

// multicast
// ex: socket
// interval$.subscribe(subject);

// handle status change
// loadingService.loadingStatus$.subscribe((isLoading) =>
//   isLoading ? loadingOverlay.classList.add("open") : loadingOverlay.classList.remove("open")
// );

// const subOne = multicastedInterval$
//   .pipe(map((val) => val % 5 === 0))
//   .subscribe((status) => (status ? loadingService.showLoading() : loadingService.hideLoading()));

// const subTwo = multicastedInterval$.subscribe(observer);
// const subThree = multicastedInterval$.subscribe(observer);

// setTimeout(() => {
//   console.log("unsubscribe the connected observable");
//   subOne.unsubscribe();
//   subTwo.unsubscribe();
//   subThree.unsubscribe();
// }, 15000);

// store
const initialState = {
  user: "Top",
  loading: false,
  isAuthenticated: "false",
};

const store = new ObservableStore(initialState);

store.selectState("user").subscribe(console.log);
store
  .selectState("loading")
  .subscribe((isLoading) =>
    isLoading ? loadingOverlay.classList.add("open") : loadingOverlay.classList.remove("open")
  );

store.updateState({ user: "Joe" });

// store.updateState({ loading: true });

// setTimeout(() => {
//   console.log("not loading");
//   store.updateState({ loading: false });
// }, 5000);

cacheSubject.next("helll lllow");
cacheSubject.subscribe(observer);

// schedulers

// async
const subAsync = asyncScheduler.schedule(console.log, 0, "Hello ASYNC scheduler");
// subAsync.unsubscribe();

// deprecated
// of(4,5,6, asyncScheduler).subscribe(observer);
// use scheduled
// scheduled([4,5,6], asyncScheduler).subscribe(observer);
// or
// of(4,5,6).pipe(
//   tap(val => console.log('from tap: ',val)),
//   subscribeOn(asyncScheduler,3000) // introduce schedulers at any point in the operator chain
// ).subscribe(observer);
//
// of(1,2,3).subscribe(observer);
// console.log("synchronous log");
// next val:  1
// next val:  2
// next val:  3
// index.js:86 synchronous log
// next val:  4
// next val:  5
// next val:  6

// asap

asapScheduler.schedule(() => console.log("asapScheduler"));

// microtask
queueMicrotask(() => console.log("From microtask"));
// promise handlers utilise the microtask queue which runs after currently executed synchronous code
// Promise.resolve("From promise").then(console.log);

// creation operator
// range(1,5, asapScheduler).subscribe(observer);

// locks the browser,
// it is waiting for the microtasks to finish
// range(1, 100000, asapScheduler).subscribe((val) => {
//   counter.innerHTML = val;
// });

//the browser has the same behavior synchrnously
// range(1, 100000).subscribe((val) => {
//   counter.innerHTML = val;
// });

// using asap to not block the render of the counter inner HTML
// range(1, 100000, asyncScheduler).subscribe((val) => {
//   counter.innerHTML = val;
// });

// synchronous
// console.log("Synchronous log");

// animationFrame

// recursively schedule a task
// animationFrameScheduler.schedule(function(pos){
//   ball.style.transform = `translate3d(0, ${pos}px, 0`;
//   pos <= 300 ? this.schedule(pos +1): null
// },0,0)

// refactor using rxjs
interval(0, animationFrameScheduler)
  .pipe(
    takeWhile((val) => val <= 300)
    // tap(val=> console.log("From animationFrame", val))
  )
  .subscribe((val) => {
    ball.style.transform = `translate3d(0, ${val}px, 0`;
  });

// queueScheduler
queueScheduler.schedule(() => {
  queueScheduler.schedule(() => {
    queueScheduler.schedule(() => {
      console.log(">> second inner Queue");
    });
    console.log(">> inner Queue");
  });
  console.log(">> first Queue");
});

// synchronous
console.log("Synchronous log");

// begin document click instructions

// retry strategy, generally on POST
clickError$.subscribe(console.log);

// input typeahead
typeahead$.subscribe(console.log);
