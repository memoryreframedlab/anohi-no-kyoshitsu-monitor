# 『あの日の教室』モニター版 配布ページ

友人・知人にモニターとして遊んでもらうための案内ページです。

- 案内ページ: https://memoryreframedlab.github.io/anohi-no-kyoshitsu-monitor/
- 遊ぶ: https://memoryreframedlab.github.io/anohi-no-kyoshitsu-monitor/play/

ブラウザで遊ぶWeb版のみを案内しています。インストールは要りません。
iPhone・Android・パソコンのいずれも同じURLです。

## このリポジトリに入っているもの

| ファイル | 中身 |
|---|---|
| `index.html` | 案内ページ |
| `play/` | Web版のゲーム本体（Godot の Web 書き出し） |
| `qr/qr-screen.png` | 画面共有用のQRコード |
| `qr/qr-print.png` | 印刷用の高解像度QRコード |
| `qr/qr-plain.png` | QRコードだけ |
| `qr/qr-card.png` | 「『あの日の教室』モニター版はこちら」の文字を添えた案内画像 |

QRコードは案内ページのURLを指しています。中身を更新しても作り直す必要はありません。

## 公開を止めるとき

`play/` を消してプッシュすれば、その時点で遊べなくなります。
ただし一度読み込んだ端末は、ブラウザに残った分でしばらく遊べることがあります。

## 入っていないもの

ゲームのソースコード、署名鍵、パスワード、セーブデータ、
テストコード、検証用ファイルは含みません。
`play/` に入るのは書き出し済みの実行物だけです。

## 動作条件

- iPhone は iOS 15 以前では動きません（Safari が対応していないため）
- Android・パソコンは新しめのブラウザであれば動きます
