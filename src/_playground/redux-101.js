import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({count}) => ({
  type: 'SET',
  count
})

const resetCount = () => ({
  type: 'RESET',
})

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }

}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch(incrementCount())

store.dispatch(incrementCount({incrementBy: 6}));

store.dispatch(decrementCount())

store.dispatch(decrementCount({decrementBy:54}));

// store.dispatch(setCount());

store.dispatch(setCount({count:34566}));

store.dispatch(resetCount());


unsubscribe();


