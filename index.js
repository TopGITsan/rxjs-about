import { of } from "rxjs";

import { subject, observer } from "./subject";
/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
of("Hello", "RxJS").subscribe(console.log);

// practice subject 
const subscription = subject.subscribe(observer);

subject.next("Practice makes perfect");

const subscriptionTwo = subject.subscribe(observer);

subject.next("Calling next again");
