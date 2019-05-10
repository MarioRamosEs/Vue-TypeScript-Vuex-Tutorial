import {Component, Inject, Vue} from 'vue-property-decorator';
import {Action} from 'vuex-class';
// @ts-ignore
import Template from './template.vue';
import {Validator} from 'vee-validate';

@Component({
    mixins: [Template]
})
export default class TodoForm extends Vue {
    public todo!: string;
    @Action('addTodo', {namespace: 'todoModule'}) addTodo!: Function;
    @Inject('$validator') $validator!: Validator;

    constructor(){
        super();
        this.todo = "";
    }

    async validate(){
        const validator = await this.$validator.validateAll();
        if(validator){
            this.addTodo();
        }
    }

    async submitTodo(){
        await this.addTodo(this.todo);
        this.todo = '';
    }
}