# redux-thunk-functional

Yet, one more of those pretentious projects that are offering to solve the very few incovenients that can be found with redux-thunk.

## Redux-thunk issues

1. Higly repetitive


2. Tightly coupled to redux store

When it comes to test

## Redux-thunk-functional, a simple solution for most case

1. Most action creator can be modelised

```
{
  const initialAction = getInitialActionSynchronous(...someArguments);
  dispatch(initialAction)

  let resultAction;
  try {
    resultAction = await getSuccessActionAsynchronous(...successArgs);
  } catch(e) {
    resultAction = getFailureActionSynchronous();
  }

  dispatch()
}
```

for more details I invite you to dive into the source code or my blog post ! enjoy !

2. Use
```
  npm install --save redux-thunk-functional
```
```
  import asyncActionCreator from 'redux-thunk-functional'
```

1. asyncActionCreator
```
({ asyncTask, actionCreators: { initial, success, failure }, extra }) => (dispatch, getState, customArg) => any
```

2. asyncTask: the asynchronous tash generating data
```
({ intialState: Object, getState: function, extra: any }) => Data: Object
```


3. actionCreators: an object with three fields whose values are action creators

a. initial
```
({ intialState: Object, extra: any }) => Action
```

b. success
```
({ intialState: Object, getState: function, data: any, extra: any }) => Action
```

c. failure
```
({ intialState: Object, getState: function, error: any, extra: any }) => Action
```


Prototype:
{}

3.
