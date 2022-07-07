import { TestScheduler } from "rxjs/testing/index.js";
import { catchError, delay, map, take } from "rxjs/operators/index.js";
import { concat, from, of } from "rxjs/index.js";

import { fakeAjaxTypeahead } from "./input/operators.js";

describe("Marble testing in RxJS", () => {
  let testScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should convert ASCII diagrams into observables", () => {
    testScheduler.run((helpers) => {
      // all testing logic
      const { cold, expectObservable } = helpers;
      const source$ = cold("--a-b---c");
      const expected =     "--a-b---c";

      expectObservable(source$).toBe(expected);
    });
  });

  it("should allow configuration of emitted values", () => {
    testScheduler.run((helpers) => {
      // all testing logic
      const { cold, expectObservable } = helpers;
      const source$ = cold("--a-b---c", { a: 1, b: 2, c: 3 });
      const final$ = source$.pipe(map((val) => val * 10));
      const expected = "--a-b---c";

      expectObservable(final$).toBe(expected, { a: 10, b: 20, c: 30 });
    });
  });

  it("should let you identify subscription points", () => {
    testScheduler.run((helpers) => {
      // all testing logic
      const { cold, expectObservable, expectSubscriptions } = helpers;

      const source$ =        cold("-a---b-|");
      const sourceTwo$ =     cold("-c---d-|");
      const final$ = concat(source$, sourceTwo$);

      const expected =            "-a---b--c---d-|";

      const sourceOneExpectedSub= "^------!";
      const sourceTwoExpectedSub= "-------^------!";

      expectObservable(final$).toBe(expected);
      expectSubscriptions(source$.subscriptions).toBe(sourceOneExpectedSub);
      expectSubscriptions(sourceTwo$.subscriptions).toBe(sourceTwoExpectedSub);
    });
  });

  it("should let you test hot observables", () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers;

      const source$ = hot("--a-b-^-c");
      const final$ = source$.pipe(take(1)); // take operator completes the stream
      const expected =          "--(c|)"; // emission and completion are synchronous

      expectObservable(final$).toBe(expected);
    });
  });

  it("should let you test synchronous operations", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);

      // emissions that occur synchronously ca be modeled by surrounding the emitted values in parenthesis
      // when an observable completes either by using a creation operator or from a pipeable operator like take the complete notification should also appear in parentheses after the final emitted value
      const expected = "(abcde|)";

      expectObservable(source$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
    });
  });

  it("should let you test asynchronous operations", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source$ = from([1, 2, 3, 4, 5]);
      // all tests run within the testScheduler.run method will automatically use the testScheduler simulating the passing of time with virtual time frames
      // we can model asynchronous behaviour within our diagrams using dashes to simulate one frame of time or
      // for longer chunck of time using the time progression syntax with the value
      // delay 10 ms
      // const final$ = source$.pipe(delay(10));
      // const expected = "----------(abcde|)";
      // delay 200 ms
      // const final$ = source$.pipe(delay(200));
      // const expected = "200ms (abcde|)";
      // delay 1s
      const final$ = source$.pipe(delay(1000));
      const expected = "1s (abcde|)";

      expectObservable(final$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
    });
  });
});

describe("typeahead", () => {
  let testScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should debounce input by 200ms", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = "test";
      const source$ = cold("a", { a: { target: { value: searchTerm } } });
      const final$ = source$.pipe(fakeAjaxTypeahead());

      const expected = "500ms a";

      expectObservable(final$).toBe(expected, { a: searchTerm });
    });
  });

  it("should cancel active request if another value is emitted", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = "second";
      
      const source$ = cold("a 250ms b", {
        a: { target: { value: "first" } },
        b: { target: { value: "second" } },
      });
      const final$ = source$.pipe(fakeAjaxTypeahead());

      const expected = "751ms b";

      expectObservable(final$).toBe(expected, { b: searchTerm });
    });
  });

  it("should not emit duplicate values in a row", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const searchTerm = "first";
      
      const source$ = cold("a 250ms b", {
        a: { target: { value: "first" } },
        b: { target: { value: "first" } },
      });
      const final$ = source$.pipe(fakeAjaxTypeahead());

      const expected = "500ms b";

      expectObservable(final$).toBe(expected, { b: searchTerm });
    });
  });

  it("should let you test errors and error messages", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const source$ = of({ firstName: "Agent", lastName: "Smith" }, null).pipe(
        map((o) => `${o.firstName} ${o.lastName}`),
        catchError(() => {
          throw "Invalid User!";
        })
      );

      const expected = '(a#'; // use the # to represent an ERROR notification

      expectObservable(source$).toBe(expected, { a: "Agent Smith" }, "Invalid User!"); // confirm that the error is thrown by providing the error message as the third argument
    });
  });

  it("should let you test errors and error messages", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const source$ = of({ firstName: "Agent", lastName: "Smith" }, null).pipe(
        map((o) => `${o.firstName} ${o.lastName}`),
        catchError(() => {
          throw { message: "Invalid User!" };
        })
      );

      const expected = '(a#';

      expectObservable(source$).toBe(expected, { a: "Agent Smith" }, { message: "Invalid User!" });
    });
  });
});
