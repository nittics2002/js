import { nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

//importできない
//Uncaught SyntaxError: ambiguous indirect export: lodash
//import { lodash } from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm'

export default {
    data() {
        return {
            messages:[
                'first',
                'second',
                'therd',
            ],
            methodProp:'データあり',
            first_name:'青木',
            last_name:'太郎',
            names:[
                '伊藤 次郎',
                '鵜島 三郎',
            ],
        }
    },
    computed:{
        //methodと違い、更新されたときのみ再評価
        computedMessage() {
            return this.messages.length > 0 ? 'メッセージあり':'メッセージなし'
            /*
                例えば return Date.now() としても、リアクティブでないため更新しない
            */
        },

        settableProp :{
            get() {
                return this.last_name + this.first_name
            },
            set(full_name) {
                [this.first_name, this.last_name] =
                    full_name.split(' ')
            },
        },
    },
    methods:{
        removeMessage() {
            this.messages.pop()
            this.methodProp = this.messages.length > 0 ?
                'データあり':'データなし'
        },
        changeProp() {
            this.settableProp = this.names.shift() ?? '   '
        },
    },
}

