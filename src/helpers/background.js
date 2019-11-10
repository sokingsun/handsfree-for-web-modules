export function executeBackgroundAction(action, cb = () => {}) {
  window.chrome.extension.sendMessage(action, cb);
}
