// ホーム画面に追加するための案内。
//
// なぜ要るか
//   むかしの Chrome は「ホーム画面に追加しますか」という帯を上から
//   下ろしていたが、いまは出さない。アドレス欄の小さな印か、
//   メニューの中に入っている。iPhone の Safari はもともと出さない。
//   気づけないので、こちらから小さなボタンを出す。
//
// 遊びの邪魔をしないよう、下の隅に小さく置き、一度消したら出さない。
(function () {
  var KEY = 'anohi_install_hint_closed';
  var deferred = null;

  function closed() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function remember() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
  }
  // すでにホーム画面から開いているなら、案内は要らない。
  function installed() {
    return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
  }
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function show(text, onTap) {
    if (closed() || installed() || document.getElementById('inst')) return;
    var box = document.createElement('div');
    box.id = 'inst';
    box.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;'
      + 'background:#1f4d33;color:#e8e6d9;border:2px solid #a8784d;border-radius:10px;'
      + 'padding:10px 12px;font:13px/1.5 -apple-system,system-ui,sans-serif;'
      + 'display:flex;gap:10px;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,.35)';
    var msg = document.createElement('div');
    msg.style.cssText = 'flex:1';
    msg.textContent = text;
    var act = document.createElement('button');
    act.textContent = onTap ? '追加' : 'とじる';
    act.style.cssText = 'background:#e8e6d9;color:#1f4d33;border:0;border-radius:6px;'
      + 'padding:8px 12px;font:bold 13px -apple-system,system-ui,sans-serif';
    var no = document.createElement('button');
    no.textContent = '×';
    no.setAttribute('aria-label', 'とじる');
    no.style.cssText = 'background:transparent;color:#cfd8cd;border:0;'
      + 'font:16px -apple-system,system-ui,sans-serif;padding:6px 4px';
    function hide() { remember(); if (box.parentNode) box.parentNode.removeChild(box); }
    no.addEventListener('click', hide);
    act.addEventListener('click', function () {
      if (onTap) { onTap(); } else { hide(); }
    });
    box.appendChild(msg);
    box.appendChild(act);
    box.appendChild(no);
    document.body.appendChild(box);
  }

  // Android / パソコンの Chrome。ここが呼ばれたら本物の追加ができる。
  window.addEventListener('beforeinstallprompt', function (ev) {
    ev.preventDefault();
    deferred = ev;
    show('ホーム画面に追加すると、アイコンから開けます。', function () {
      var d = deferred;
      deferred = null;
      remember();
      var box = document.getElementById('inst');
      if (box && box.parentNode) box.parentNode.removeChild(box);
      if (d) d.prompt();
    });
  });

  window.addEventListener('appinstalled', remember);

  // iPhone は自動で出す仕組みが無いので、やり方だけ伝える。
  // 読み込みが終わって落ち着いてから出す。
  if (isIOS()) {
    setTimeout(function () {
      show('共有ボタン →「ホーム画面に追加」で、アイコンから開けます。', null);
    }, 8000);
  }
})();
