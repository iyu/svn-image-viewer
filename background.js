'use strict';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let urls = localStorage.getItem('svn_urls') || '';
  urls = urls.split(',');
  for (let i = 0; i < urls.length; i++) {
    if (tab.url.indexOf(urls[i]) >= 0) {
      chrome.pageAction.show(tabId);
      break;
    }
  }
});
