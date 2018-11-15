window.addEventListener("message", function (e) {
  if (e.source !== window) {
    return;
  }
  console.log(e.data);
  window.postMessage("this is injected(window listener)", "*");
  switch (e.data.cmd) {
    case "cmdValue":
      // do something
      break;
  }
}, false);