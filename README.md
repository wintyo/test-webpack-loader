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
