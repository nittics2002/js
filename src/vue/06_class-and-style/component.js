import { nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export default {
    data() {
        return {
            isActive:true,
            err:false,
            classObject:{
                active:true,
                err:true,
            },
            activeStr:'active',
            errStr:'warn',
       }
    },
    methods:{
        changeActive() {
            this.isActive = this.isActive? false:true
        }
    },
    computed:{
        computedClass() {
            return {
                bold:true,
                err:this.isActive,
            }
        },
    },
}

