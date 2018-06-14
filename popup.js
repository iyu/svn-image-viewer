'use strict';

function execute(code) {
  chrome.tabs.executeScript(null, { code });
}

function list() {
  execute(`
  {
    const list = document.getElementsByTagName('li');
    for (let i = 0; i < list.length; i++) {
      const li = list[i];
      const href = li.getElementsByTagName('a')[0].getAttribute('href');
      if (/(\.png|\.jpg)$/.test(href)) {
        const img = document.createElement('img');
        img.setAttribute('src', href);
        li.append(img);
      } else if (/(\.mp3|\.wav|\.aac|\.ogg)$/.test(href)) {
        const audio = document.createElement('audio');
        audio.setAttribute('src', href);
        audio.setAttribute('controls', 'controls');
        audio.setAttribute('preload', 'none');
        li.append(audio);
      }
    }
  }
  `);
}

chrome.storage.local.get({
  immediate: false,
  mode: null,
}, ({ immediate, mode }) => {
  if (immediate) {
    if (mode === 'list') {
      list();
    } else if (mode === 'mouse') {
    }
    window.close();
  }
});

document.getElementById('list').addEventListener('click', list);

document.getElementById('mouse-over').addEventListener('click', () => {
  execute('');
});
