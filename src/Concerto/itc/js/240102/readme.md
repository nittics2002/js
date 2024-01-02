# クライアントサイドquery

非同期処理を念頭に検討する

--------------------------------------------------------------------------------
## 231230

再整理

- WebStorage
    - infra
    - キャッシュに該当
        - unittest作成テスト中
- Communicator
    - infra
- WebClient
    - domain
    - URLをもつ
- Repository
    - domain
        - 出庫 leaving() 入庫 stock() 補充 supply()
    - WebStorage に無ければ WebClient から取得 & WebStorage に保存
    - メモリにデータを持つ
- Picker
    - domain
    - SQLでRepositoryよりデータを取得する



--------------------------------------------------------------------------------
## 231228

- WebStoragePromise
    - localStorageとsessionStorage objectを一つのWebStorageとしてあつかう

### モジュール化について

[モジュールについて](https://jp-seemore.com/web/4222/?PageSpeed=noscript)
[quita](https://qiita.com/chuck0523/items/1868a4c04ab4d8cdfb23)

- モジュール化
    - 要デバッグ

- test
    - StorageManagerテスト中

- testRepository
    - 上記テスト後作成

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



