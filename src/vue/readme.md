# Vue.js

まずはOptionsAPIで

--------------------------------------------------------------------------------
## 240216

### https://ja.vuejs.org/guide/essentials/reactivity-fundamentals

- まずはOptionsAPIで

- ステートフルなメソッド でlodashをimportしたいが、どうやる?

-04/component.js
    - lodash.jsを使いたいがエラー
        - Uncaught SyntaxError: ambiguous indirect export: lodash
    - ステートフルなメソッドの動作が不明
    
### https://ja.vuejs.org/guide/essentials/template-syntax

- 03/index2.htm
    - {{}}内で文字列関数処理がうまく行かない
        - 違う文字列が出てくる

--------------------------------------------------------------------------------
## KnowHow

- プロパティ名は短くシンプルに小文字のみが良さそう
    - ディレクティブの動的引数を指定するprop名は全て小文字の制限
        - DOMに展開されたとき、全て小文字になるため
    - 省略記法の為(例 v-bind:idが　:id )
        - ただし、複数必要な場合があるので、
- methodではvueがthisをbindするので、allow関数を使わない


--------------------------------------------------------------------------------
## 資料

[Docs](https://ja.vuejs.org/guide/introduction)
[CDNでの例](https://qiita.com/aster-mnch/items/3e2cf8b77fe4eb9936e4)

