function injectMe() {
  let js = 'js/injectedScript.js';
  let tmp = document.createElement('script');
  tmp.setAttribute('type', 'text/javascript');
  tmp.src = chrome.extension.getURL(js);
  tmp.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(tmp);
}

injectMe();


// from injected
window.addEventListener("message", function (e) {
  if (e.source !== window) {
    return;
  }
  console.log(e.data);
  window.postMessage("this is content(window listener)", "*");
  switch (e.data.cmd) {
    case "cmdValue":
      // do something
      break;
  }
}, false);


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  sendResponse("this is content");
  switch (message.cmd) {
    case "cmdValue":
      // do something
      break;
  }
});

/* To background

docs url: https://developer.chrome.com/apps/runtime#method-sendMessage

 */
// send to self background
// chrome.runtime.sendMessage({cmd: "status"});
chrome.runtime.sendMessage({cmd: "cmdValue"}, function (response) {
  console.log(response)
});


/* 一些有趣的函数 */

// function eval_func() {
//
// }
