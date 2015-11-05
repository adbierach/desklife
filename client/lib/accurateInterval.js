// Provides an accurate interval
// 
// reference:
// * https://gist.github.com/Squeegy/1d99b3cd81d610ac7351

accurateInterval = function(fn, time) {
  var cancel, nextAt, timeout, wrapper, _ref;

  timeout = null;
  
  nextAt = new Date().getTime() + time;
  wrapper = function() {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
     fn();
  };
  cancel = function() {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};
