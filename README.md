# RxJS Basics

## What is a Subject ?
- it's an observable, so it has :
    - pipe method to add operators
    - subscribe method to receive emitted values
- it's an observer, so it has: 
    - next
    - error
    - complete
- it can multicast
- when you want to share state between multiple layers of your application
### Types of Subject
- BehaviorSubject - has an initial value
- ReplaySubject - replays values to late subscribers
- AsyncSubject - emits the last value before completion
### Multicast operators
- share
- shareReplay
- multicast

## Schedulers

![schedulers](/image/schedulers/schedulers.png)
    

- are used with operators and subscriptions in order to influence how and when your code is executed ( when to emit or subscribe ) :
    - observeOn, subscribeOn
- are used for time based operations and operators
- are user in testing

- each scheduler accepts 3 arguments:
    - work (the function to invoke)
    - delay (the time to wait before performing the work)
    - state (which is provided to the work function)
    - provinding the delay argument to others schedulers exept asyncScheduler will simply cause a scheduler to default to asyncScheduler behind the scenes
```
asyncScheduler.schedule(()=> console.log('async'),200);
// or
asyncScheduler.schedule(console.log, 200, 'async');

asapScheduler.schedule(console.log, null, 'microtask');

animationFramScheduler.schedule(console.log, null, 'aframe');

queueScheduler.schedule(()=> { // usefull when you need to schedule tasks inside other tasks })
```

### How to use schedulers with observables
- the majority of static creation operators accept an optional scheduler
- schedule the emission of values in the middle of the operator chain by using the **obserbeOn** operator
- schedule when a subscription itself will occur by using the **subscribeOn** operator
```
// the majority of static creation operators accept an optional scheduler
of(1,2,3, asyncScheduler).subscribe(observer);

// or in the middle of the operator chain
interval(20).pipe(
  observeOn(animationFrameScheduler)
).subscribe(observer);

of(1,2,3).pipe(
  subscribeOn(asyncScheduler)
).subscribe(observer)
```

