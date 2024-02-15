import { nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

//importできない
//Uncaught SyntaxError: ambiguous indirect export: lodash
//import { lodash } from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm'

export default {
    data() {
        return {
            count: 1,
            list:{
                items:[],
            },
            sync:'',
        }
    },
    methods:{
        //vueがthisをbindするので、allow関数を使わない
        increment() {
            this.count++
            this.list.items.push(`カウントに${this.count}を追加`)
            nextTick(()=> {
                this.sync=`同期更新:${this.count}`
            })
        },
        clear() {
            this.count=0
        },
    },
    mounted() {
        this.count++
        this.increment()
    },
    created() {
        //ステートフルなメソッド 
        //lodashがimportできない
        //this.clearClick = _.debounce(this.clear(), 1000)
        //よくわからない
        this.clearClick =　setTimeout(this.clear(), 2000)
    },
    unmounted() {
        //lodashがimportできないので、_.debounceのcancel()は使えない
        //this.clearClick.cancel()
    },
}

