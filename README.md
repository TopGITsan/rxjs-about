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
    - are used with operators and subscriptions in order to influence how and when your code is executed ( when to emit or subscribe ) :
        - observeOn, subscribeOn
    - are used for time based operations and operators
    - are user in testing