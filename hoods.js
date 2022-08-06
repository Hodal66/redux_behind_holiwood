function createStore(reducer, preloadedState) {
    let state = preloadedState; 
  //   {value:0}
    const listeners = [];
  
    function getState() {
      return state;
    }
  
    function subscribe(listener) {
      listeners.push(listener);
      listener = [render];
      return function unsubscribe() {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    }
  
    function dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    }
  
    dispatch({ type: "@@redux/INIT" });
  
    return { dispatch, subscribe, getState };
  }