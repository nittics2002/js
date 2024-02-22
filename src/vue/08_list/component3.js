
export default {
    data() {
        return {
            users:[
                {id:8, name:'青木', age:20},
                {id:3, name:'伊藤', age:18},
                {id:6, name:'鵜島', age:23},
            ],
            numbers:[9,4,5,1,8,0,3,6,7,2],
            toggleNumberAsc:true,
       }
    },
    computed:{
        sortNumbers() {
            return [...this.numbers].sort((a,b)=>{
                return this.toggleNumberAsc?
                    a - b:
                    b - a
            })
        },
    },
    methods:{
        toggleNumber() {
            this.toggleNumberAsc = !this.toggleNumberAsc
        },
            
    },
}
