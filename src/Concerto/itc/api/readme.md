# APIデータ形式検討

## 240126

### テーブル表定義

- printfで桁区切りできるならformatType不要

```json

[
    {
        name:データ名,
        label:表示列名,
        headerAlign:ヘッダ表示位置(left,right,center),
        align:データ表示位置(left,right,center),
        formatType:表示形式(printf,number),
        format:表示形式の定義値(numberならscale数,printfなら%sなど)
    },...
]

```

### API送信データ

- APIから送信するデータ案
- 複数データをまとめて送信
- RESTでの単一テーブと限定せず、複数テーブル分まとめ、labelで分類

```json

{
    label:{
        columns:[
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
