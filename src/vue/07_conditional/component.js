
export default {
    data() {
        return {
            no:1,
            showMultiElement:true,
            show:true,
       }
    },
    methods:{
        onChangeNo() {
            this.no++
        },
        onChangeMultiElement() {
            this.showMultiElement =
                this.showMultiElement? false:true
        },
        onChangeShow() {
            this.show =
                this.show? false:true
        },
    },
}
