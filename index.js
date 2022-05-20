import { of } from "rxjs";

import { cacheSubject } from "./rx-observable/subject";
import { observer } from "./rx-observer/observer";

import { loadingOverlay } from "./overlay/loadingOverlay";

import { ObservableStore } from "./store/store";
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
  .subscribe(isLoading =>
    isLoading ? loadingOverlay.classList.add("open") : loadingOverlay.classList.remove("open")
  );

store.updateState({ user: "Joe" });

store.updateState({ loading: true });

setTimeout(()=>{
  console.log("not loading")
  store.updateState({ loading: false });
},5000)

cacheSubject.next('helll lllow');
cacheSubject.subscribe(observer);