const loggingMiddleware = (store) => (next) => (action) => {
    // Our middleware

    // call the next function
    next(action);
  }
  
  export default loggingMiddleware;