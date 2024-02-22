
export default {
    data() {
        return {
            count:0,
            domId:'',
            message:'',
            submitCounter:0,
            enterKey:'まだ',
            ctrlClickCount:0
       }
    },
    methods:{
        counterUp() {
            this.count++
        },
        getDomId(message, event) {
            this.message = message
            this.domId = event.target.id
        },
        submitCountUp() {
            this.submitCounter++
        },
        enterKeyUp() {
            this.enterKey = this.enterKey === 'まだ'?
                '押した':'まだ'
        },
        ctrlClickCountUp() {
            this.ctrlClickCount++
        },
    },
}
