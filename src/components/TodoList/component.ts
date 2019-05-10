import {Component, Prop, Vue} from 'vue-property-decorator';
import {Todo} from '@/store/modules/todo/types';
import {Action} from 'vuex-class';
// @ts-ignore
import Template from './template.vue';

@Component({
    mixins: [Template]
})
export default class TodoList extends Vue {
    @Prop({
        type: Array,
        required: true
    }) todos!: Todo[];
    @Action('updateTodoStatus', {namespace: 'todoModule'}) updateTodoStatus!: Function;
    @Action('deleteTodo', {namespace: 'todoModule'}) deleteTodo!: Function;

    public fields: Array<{key: string, label: string, sortable?: boolean}> = [
        { key: 'text', label: 'Todo', sortable: true },
        { key: 'done', label: 'Estado' },
        { key: 'actions', label: 'Actions' }
    ];
}