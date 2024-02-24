
export default {
    data() {
        return {
            mounted_time:'',
       }
    },
    computed:{
    },
    methods:{
    },
    mounted() {
        this.mounted_time = (new Date()).toISOString()
    },
}
