
export default {
    data() {
        return {
            anser:'',
            question:'',
       }
    },
    watch:{
        question(newData, oldData) {
            this.aaa = 'AAA'
            this.change_watch_data(`変更前:${oldData} 変更後:${newData}`)
        },
    },
    methods:{
        change_watch_data(text) {
            this.anser = text
        },
    },
}
