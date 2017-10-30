'use strict';

function execute(code) {
  chrome.tabs.executeScript(null, { code });
}

document.getElementById('list').addEventListener('click', () => {
  execute(`
  {
    const list = document.getElementsByTagName('li');
    for (let i = 0; i < list.length; i++) {
      const li = list[i];
      const href = li.getElementsByTagName('a')[0].getAttribute('href');
      if (!/(\.png|\.jpg)$/.test(href)) {
        continue;
      }

      const img = document.createElement('img');
      img.setAttribute('src', href);
      li.append(img);
    }
  }
  `);
});

document.getElementById('mouse-over').addEventListener('click', () => {
  execute('');
});
