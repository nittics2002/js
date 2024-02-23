
export default {
    data() {
        return {
            message:'',
            ime_message:'',
            change_message:'',
            multilines:'',
            chk:false,
            chk_list:[],
            chk_single:[],
            chk_string:'',
            chk_poop:'',
            chk_poop_true:'trueです',
            chk_poop_false:'falseです',
            radio_val:'',
            radio_attr:'',
            radio_attr1:'ラジオ1',
            radio_attr2:'ラジオ2',
            radio_attr3:'ラジオ3',
            sel_val:'',
            disabled_sel_val:'',
            multi_sel_val:[],
            selected_list:'',
            sel_list:[
                {val:'aoki', text:'青木'},
                {val:'ito', text:'伊藤'},
                {val:'ukai', text:'鵜飼'},
            ],
       }
    },
    computed:{
    },
    methods:{
        connectIme(event) {
            this.ime_message = event.target.value
        },
    },
}
