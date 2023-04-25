chrome.runtime.onInstalled.addListener(() =>
  chrome.storage.local.set({
    comments: null,
    user: null,
  })
);
