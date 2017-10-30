SVN-IMAGE-VIEWER
====

## Description
SVNListParentPathで一覧表示されている画像をプレビュー表示するChromeExtension

下記のDOM構造ならばsvnに限らず動く
```html
<li>
  <a href="image1.png">image1.png</a>
</li>
<li>
  <a href="image2.png">image2.png</a>
</li>
```

## Installation
chromeでしか動きません

1. 最新のcrxファイルをダウンロードする [releases](https://github.com/iyu/svn-image-viewer/releases)
2. Chrome - 拡張機能ページにアクセス [chrome://extensions](chrome://extensions)
  - 右上のオプション > 「その他のツール」 > 「拡張機能」
3. 「デベロッパーモード」をチェック
4. crxファイルをこのページにD&D
5. 「追加」をクリック

git cloneしてきてdistディレクトリを読み込むことでも追加できます

## Usage
初期設定しないと動きません

1. Chrome - 拡張機能ページにアクセス [chrome://extensions](chrome://extensions)
2. 「SVN Image Viewer」の「オプション」をクリック
3. Viewerを適用するSVNのURLを入力する
4. 対象のURLにアクセスするとブラウザ右上にSアイコンが表示されるのでクリック
5. LISTモードとMouseOverモード(未実装)のどちらかを選択

### Options

- svn\_url Viewerを適用するurlを設定する 最低1つ以上登録しないと何も動きません
- always 通常はボタンクリックで発動するが対象ページに来たら常時実行する (必読:注意事項)
  - LISTモード ファイルパスと同時に画像も一覧表示される
  - MouseOverモード ファイルパスにマウスオーバーすると画像が表示される(未実装)

## Cautions
このツールを使用して発生したトラブルに対して一切責任を追いません

自己責任で利用してください

考えられる注意点
- 1ディレクトリのファイル数が多すぎて
 - JSの処理が重くなりChromeが固まる
  - 重い処理はしてないですが限度はあります
 - imgタグによって大量にhttpリクエストが飛びsvnサーバーやApache等に負荷がかかる
  - svn checkoutできる容量であれば問題ないと思う 負荷限界テストはしてないので自己責任

## Development
下記のようなDOM構造から
```html
<li>
  <a href="image1.png">image1.png</a>
</li>
<li>
  <a href="image2.png">image2.png</a>
</li>
```
下記のようなDOM構造に書き換えている
```html
<li>
  <a href="image1.png">image1.png</a>
  <img src="image1.png">
</li>
<li>
  <a href="image2.png">image2.png</a>
  <img src="image2.png">
</li>
```

optionページにてlocalStorageにSVNのURLを登録、対象URLにアクセスしたときにページアクションを表示
