
export default {
    data() {
        return {
            count:0,
            ok:false,
            //文字列関数が思う通りに行かない
            message:'https:  ja.vuejs.org guide essentials template-syntax',
            //url:'https://ja.vuejs.org/guide/essentials/template-syntax',
            clsNo:1,
            //arrow funcはだめ
            bindFunc() {
                return '関数でもOK'
            },
        }
    },
}

