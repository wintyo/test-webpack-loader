# webpackのローダー自作のテスト
## ローダーのテスト
+ [ミニマムなwebpack loader](https://naoty.dev/posts/80.html)
+ https://webpack.js.org/contribute/writing-a-loader/

## pugファイル内のrequire文を先に差し替えてからビルドする方法について
requireコードだけ先に差し替えてからビルドする方法はinclude周りなどの依存ファイルがあると実現不可能。対象ファイルの差し替えは可能だが、関連するファイルまでは変更できない。  

## pugでrequireすることについて
pugでrequireする方法は存在せず、dataにrequireメソッドを渡して回避する方法しかない。  
+ https://github.com/pugjs/pug/issues/2604#issuecomment-264128999

## CSS Modulesをどうやってやるか 
結論から言うと、postcss-modulesから出力されたJSONファイルをimportして使うやり方しかなさそう。  
そもそもJSでcssをimportしたものがオブジェクト形式で使える時点で特殊で、これをそのまま使う方法はなさそう。  
データの同期が心配になるが、現状JSONファイルだと比較的簡単にrequireできるため、実現可能レベルではある。  

+ https://github.com/css-modules/postcss-modules

## pug-loaderについて
pug-html-loaderはhtmlを返すが、pug-loaderはtemplateを返す。JS側でコンパイルするため、requireコードもそのまま残しているためモジュールの解決が可能。**ただし、JS側の実行が必要になる。**  
fs.writeSyncで出力することも考えたが、それだとブラウザスクリプトにそのコードが残ってしまう。別タスクでの実行はそもそもwebpackを通す意味がなくなり、pug単体で実行した方がよくなるが、その場合はrequireが使えなくなる。  
したがってpug-loaderを使ってhtmlを出力するのは不可能だと思われる。  

extract-loaderがmodule.exportsを取り去って中身を出力するloaderだと思うため、extract-loader, apply-loader, pug-loaderの順でやれば動きそうだが、以下のエラーが出て動かない。（JS側だとapply-loaderまでは動いているので、このエラーが出る理由も分からないが・・・）  

```
(req.default || req).apply is not a function
```

バグっぽい。これが解決するとpugの中でrequireが可能になり、CSS Modulesが簡単にできる。  

+ https://github.com/peerigon/extract-loader/issues/10


## html-loaderについて
html-loaderのinterpolationはrequireコードに書き換えているだけで、実行はextract-loaderで行っている。  

## this.loadModule
this.loadModuleでloader経由でモジュールを読み込むことができる。  
css-loaderでmodulesをtrueにすればオブジェクトが手に入る。  
しかし、非同期でモジュールを読み込むのでpugにデータを渡すことができない。
  
