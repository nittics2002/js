
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
            //retActiveArg:'',
            //activeArg:'click',
            //onActiveArg() {
                //this.retActiveArg="prop=clickなのでclickで"
            //},
        },
    }
}

