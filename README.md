# RxJS Basics

## What's a Subject ?
    - it's an observable, so it has :
        - pipe method to add operators
        - subscribe method to receive emitted values
    - it's an observer, so it has: 
        - next
        - error
        - complete
    - is multicast
    - when you what to share state between multiple layers of your application
### Types of Subject
    - BehaviorSubject - have an initial value
    - ReplaySubject - replays values to late subscribers
    - AsyncSubject - emits the last value before completion
### Multicast operators
    - share
    - shareReplay
    - multicast