# クライアントサイドquery

非同期処理を念頭に検討する

--------------------------------------------------------------------------------
## 231228

- WebStoragePromise
    - localStorageとsessionStorage objectを一つのWebStorageとしてあつかう

### モジュール化について

[モジュールについて](https://jp-seemore.com/web/4222/?PageSpeed=noscript)
[quita](https://qiita.com/chuck0523/items/1868a4c04ab4d8cdfb23)

モジュール化開始

関数式?関数?

- StoragePromise済

--------------------------------------------------------------------------------

## 231227

- repository
	- UsecseModelよりDBデータを取得するデータを持つ
	- storageにデータが無い場合、webから取得&保存
	
- datastore
	- usecaseに合わせたsqlでrepositoryのデータからデータを作る
	- PDOの部分

- usecaseModel
	- usecaseに合わせたSQLを組み立て、datastoreよりデータを取得する

- usecaseService
	- 画面を管理する

- factory
	- object生成管理

## 作成済

- StoragePromise.js
	- web storagのPromise wrapper

- CommunicatorPromise.js
	- XHTTPRequestのPromise wrapper

- ClientPrimise.js
	- CommunicatorPromiseでConcertoにDBデータをrequestする
	- settings で URL設定値を渡す



