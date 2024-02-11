
//OpthionsAPI形式
export default {
    data() {
        return {
            count:0,
            ok:false,
            //文字列関数が思う通りに行かない
            message:'https:  ja.vuejs.org guide essentials template-syntax',
            //url:'https://ja.vuejs.org/guide/essentials/template-syntax',
            clsNo:1,
            //arrow function形式はだめ
            bindFunc() {
                return '関数でもOK'
            },
            fullSpel:'',
            onClickFullSpel() {
                this.fullSpel="v-on:clicl式"
            },
            simpleSpel:'',
            onClickSimpleSpel() {
                this.simpleSpel="@click式"
            },
            retActiveArg:'上の文字列をclickすると変わる',
            //この動的引数のプロパティ名は全て小文字の制約がある
            activearg:'click',
            onActiveArg() {
                this.retActiveArg='propがclickなので、clickになる'
            },
        }
    },
}

