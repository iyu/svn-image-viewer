'use strict';

function reloadByUrls() {
  chrome.storage.local.get({
    urls: [],
  }, ({ urls }) => {
    const ul = document.getElementById('urls');
    ul.textContent = null;
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const li = document.createElement('li');
      const a = document.createElement('a');
      const button = document.createElement('button');

      a.setAttribute('href', url);
      a.append(url);
      button.classList = ['remove'];
      button.append('remove');
      button.addEventListener('click', () => {
        chrome.storage.local.get({
          urls: [],
        }, ({ urls: _urls }) => {
          const index = _urls.indexOf(url);
          if (index >= 0) {
            _urls.splice(index, 1);
            chrome.storage.local.set({ urls: _urls }, reloadByUrls);
          }
        });
      });

      li.append(a);
      li.append(button);
      ul.append(li);
    }
  });
}

function reloadByImmediate() {
  chrome.storage.local.get({
    immediate: false,
    mode: null,
  }, ({ immediate, mode }) => {
    if (immediate) {
      document.getElementById('immediate').checked = true;
      document.getElementById('list').disabled = false;
      document.getElementById('mouse').disabled = false;
    } else {
      document.getElementById('immediate').checked = false;
      document.getElementById('list').disabled = true;
      document.getElementById('mouse').disabled = true;
    }

    if (mode === 'list') {
      document.getElementById('list').checked = true;
      document.getElementById('mouse').checked = false;
    } else if (mode === 'mouse') {
      document.getElementById('mouse').checked = true;
      document.getElementById('list').checked = false;
    } else {
      document.getElementById('list').checked = false;
      document.getElementById('mouse').checked = false;
    }
  });
}

document.getElementById('save').addEventListener('click', () => {
  const value = document.getElementById('url').value;
  chrome.storage.local.get({
    urls: [],
  }, ({ urls }) => {
    if (value && urls.indexOf(value) === -1) {
      urls.push(value);
      chrome.storage.local.set({ urls }, () => {
        reloadByUrls();
      });
    }
  });
});

document.getElementById('immediate').addEventListener('click', () => {
  const checked = document.getElementById('immediate').checked;
  chrome.storage.local.set({ immediate: checked }, reloadByImmediate);
});
document.getElementById('list').addEventListener('click', () => {
  const checked = document.getElementById('list').checked;
  chrome.storage.local.set({ mode: 'list' }, reloadByImmediate);
});
document.getElementById('mouse').addEventListener('click', () => {
  const checked = document.getElementById('list').checked;
  chrome.storage.local.set({ mode: 'mouse' }, reloadByImmediate);
});

document.addEventListener('DOMContentLoaded', () => {
  reloadByUrls();
  reloadByImmediate();
});
