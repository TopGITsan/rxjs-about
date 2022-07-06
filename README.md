# ![rxjs](/image/rxjs.svg) RxJS Basics :star_struck:

## What is a Subject ?

![subject](/image/multicasting/subject_multicast.png)

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

![behaviorSubject](/image/multicasting/behaviorSubject.png)

- BehaviorSubject - has an initial value
- ReplaySubject - replays values to late subscribers
- AsyncSubject - emits the last value before completion

### Multicast operators
- share
![share](/image/multicasting/share_operator.png)
- shareReplay
![shareReplay](/image/multicasting/shareReplay_operator.png)
- multicast

### Extract commom operator logic into standalone functions
- 

## Schedulers :timer_clock:

![schedulers](/image/schedulers/schedulers.png)
    

- are used with operators and subscriptions in order to influence how and when your code is executed ( when to emit or subscribe ) :
    - observeOn, subscribeOn
- are used for time based operations and operators
- are used in testing

- each scheduler accepts 3 arguments:
    - work (the function to invoke)
    - delay(*optional*) (the time to wait before performing the work)
        - provinding the delay argument to others schedulers except asyncScheduler will simply cause a scheduler to default to asyncScheduler behind the scenes
    - state(*optional*) (which is provided to the work function)
    
```
asyncScheduler.schedule(()=> console.log('async'),200);
// or
asyncScheduler.schedule(console.log, 200, 'async');

asapScheduler.schedule(console.log, null, 'microtask');

animationFrameScheduler.schedule(console.log, null, 'aframe');

queueScheduler.schedule(()=> { // usefull when you need to schedule tasks inside other tasks })
```

### How to use schedulers with observables

- ~~the majority of static creation operators accept an optional scheduler~~ (*deprecated*)
    - use **scheduled** operator instead:
    ``` scheduled([4,5,6], asyncScheduler).subscribe(observer); ```
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

## Types of schedulers :clock1230:

- **asyncScheduler**: schedule task asynchronously with an optional delay (similar to setTimeout)
    - if your goal is to delay operations, the **delay** operator is prefered:
        - air notification will continue to be emitted imediatly


- **asapScheduler**: 
    - lets you schedule work on the microtask queue, executing tasks as soon as posibile
    - similar to *queueMicrotask* or *Promise.resolve*
    - should not treat it as asynchronous but faster and default to is use
    - do not use microtasks for long running operations
    - microtasks in JS run after currently executing code but will **block** *the UI like synchronous task* until they complete (queue is cleared), this also counts for microtasks that are added while others are running
    - is not a silver bullet for asynchronous activity.

- **animationFrameScheduler**: let's you schedule tasks before browser repaint to help create smooth animations

- **queueScheduler**: lets you execute tasks synchronously, executing the next when the previous completes
    - if you need to control the order of tasks


# Testing RxJS
- marble testing
- subscribe and assert pattern

## Marble Testing

> The most effective and most expressive way to test your streams

> Marble testing is derived from the idea of marble diagrams

- we can write marble diagrams in ASCII that represent observables and their expected outcomes
- to represent the passing of time we can use a dash `-`:
> each dash represents aframe of virtual time
- alfanumeric `[a-z0-9]` values represent the emitted values:
> represents emitted values, ex -a--b-
- errors are represented by the `#` sign:
> represents errors, ex -a--b-#
- groupings of sinchronous values can be written within parentheses `()`
> represents synchronous groupings, ex. -(abc)--
- complete notifications can be written line in the diagrams with the vertical bar `|`
> represents completion, ex. (abc|)