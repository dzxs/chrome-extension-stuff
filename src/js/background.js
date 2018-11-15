chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  sendResponse("this is background");
  switch (message.cmd) {
    case "cmdValue":
      // do something
      break;
  }
});

// 鼠标指向小图标时显示的文字
chrome.browserAction.setTitle({title: message.title});

// 小图标上的小字
chrome.browserAction.setBadgeText({text: "" + message.badge});


// 系统通知（系统通知有系统的声音（win10 | macos 其他不知道））
chrome.notifications.create(null, message.notifications)
/* 一些有趣的函数 */

// chrome 有个 Asynchronous Clipboard API 可以直接复制内容到剪切板，但需要https
// https://googlechrome.github.io/samples/async-clipboard/

// 复制内容到剪切板
function toCli(text) {
  let input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

// 发声
let alarm = new Audio('res/alarm.mp3');
alarm.play();