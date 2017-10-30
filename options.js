'use strict';

function getLocalStorageUrls() {
  const urls = localStorage.getItem('svn_urls') || '';
  return urls ? urls.split(',') : [];
}

function reloadByUrls() {
  const list = getLocalStorageUrls();
  const urls = document.getElementById('urls');
  urls.textContent = null;
  for (let i = 0; i < list.length; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const button = document.createElement('button');

    a.setAttribute('href', list[i]);
    a.append(list[i]);
    button.classList = ['remove'];
    button.append('remove');
    button.addEventListener('click', () => {
      const _list = getLocalStorageUrls()
      const index = _list.indexOf(list[i]);
      if (index >= 0) {
        _list.splice(index, 1);
        localStorage.setItem('svn_urls', _list);
        reloadByUrls();
      }
    });

    li.append(a);
    li.append(button);
    urls.append(li);
  }
}

function reloadByAlways() {
  const always = localStorage.getItem('always') === 'true';
  if (always) {
    document.getElementById('always').checked = true;
    document.getElementById('list').disabled = false;
    document.getElementById('mouse').disabled = false;
  } else {
    document.getElementById('always').checked = false;
    document.getElementById('list').disabled = true;
    document.getElementById('mouse').disabled = true;
  }
  const mode = localStorage.getItem('mode');
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
}

document.getElementById('save').addEventListener('click', () => {
  const value = document.getElementById('url').value;
  const urls = getLocalStorageUrls();
  if (value && urls.indexOf(value) >= 0) {
    urls.push(value);
    localStorage.setItem('svn_urls', urls);
    reloadByUrls();
  }
});

document.getElementById('always').addEventListener('click', () => {
  const checked = document.getElementById('always').checked;
  localStorage.setItem('always', checked);
  reloadByAlways();
});
document.getElementById('list').addEventListener('click', () => {
  const checked = document.getElementById('list').checked;
  localStorage.setItem('mode', 'list');
  reloadByAlways();
});
document.getElementById('mouse').addEventListener('click', () => {
  const checked = document.getElementById('list').checked;
  localStorage.setItem('mode', 'mouse');
  reloadByAlways();
});

reloadByUrls();
reloadByAlways();
