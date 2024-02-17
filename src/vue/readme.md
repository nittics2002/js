# Vue3.js

まずはOptionsAPIで

--------------------------------------------------------------------------------
## 作業 240217


### https://ja.vuejs.org/guide/essentials/list.html

- key による状態管理から


- v-for of 式の使い方が不明

### https://ja.vuejs.org/guide/essentials/conditional.html

### https://ja.vuejs.org/guide/essentials/class-and-style.html

- "コンポーネントでの使用” の部分は後日

### https://ja.vuejs.org/guide/essentials/computed.html

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
- 算出プロパティはリアクティブなデータを用いる
    - computedで
- :styleではjavascriptに従いcss名はcamelCase
    - {backgroundColor:bgColor}
    - ハイフンを使いたい場合''で囲う ex) {'background-color':bgColor}
- 複数要素をまとめてif構文する場合、template要素で囲う
- v-ifは要素が消えるが、v-showはCSS display:none
    - DOCSに頻繁に切り替える場合v-showのほうが良いとの事


--------------------------------------------------------------------------------
## 資料

[Docs](https://ja.vuejs.org/guide/introduction)
[CDNでの例](https://qiita.com/aster-mnch/items/3e2cf8b77fe4eb9936e4)

