# APIデータ形式検討

## 240126

### 検討事項

- 現Concertoベースではrequestは画面のqueryパラメータで処理
    - requestのsortはクライアント側で処理なので不要


### request parser





### テーブル表定義

- numberはphp number_formatに従う
- printfで桁区切りできるならformatType不要
    - CDNやnodeでのsprintfでは桁区切りできない

```json

[
    {
        name:データ名,
        label:表示列名,
        headerAlign:ヘッダ表示位置(left,right,center),
        align:データ表示位置(left,right,center),
        formatType:表示形式(printf,number),
        format:{} 表示形式の定義値(numberならscale数や区切り文字,printfなら%sなど)
    },...
]

```

### API送信データ

- APIから送信するデータ案
- 複数データをまとめて送信
- RESTでの単一テーブと限定せず、複数テーブル分まとめ、labelで分類
    - または name で分類

```json

{
    label:{
        name:データ名,
        fields:[
            {
                name:データ名,
                type:データ型(int,float,string,date),
                description:説明,
            },...
        ],
        dataType:データ形式(object,array),
        data:[
            {},...
        ],
    },...
}

```

### API受信データ

- リクエストは複数許可
- パラメータも複数許可

```json

{
    label:{
        name:名前,
        parameter:{}パラメータ,(あるいはfilter?)
    },...
}

```

