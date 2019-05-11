import Vue from "vue";
import { ActionContext, ActionTree } from "vuex";
import { TodoState, Todo } from "@/store/modules/todo/types";
import { RootState } from "@/store/types";
import { AxiosResponse } from "axios";

type TodoActionContext = ActionContext<TodoState, RootState>;
type TodoActionTree = ActionTree<TodoState, RootState>;

export const actions: TodoActionTree = {
  async fetchData(context: TodoActionContext) {
    try {
      // @ts-ignore
      const response: AxiosResponse = await Vue.axios({
        url: "/todos"
      });
      const payload: Todo[] = response && response.data;
      context.commit("todosLoaded", payload);
    } catch (error) {
      context.commit("todosError", error.message);
    } finally {
      console.log("petición para obtener todos finalizada");
    }
  },
  async addTodo(context: TodoActionContext, todoText: string) {
    try {
      // @ts-ignore
      const response: AxiosResponse = await Vue.axios({
        method: "POST",
        url: "/todos",
        data: {
          id: Date.now(),
          text: todoText,
          done: false
        }
      });
      if (response && response.data) {
        context.dispatch("fetchData");
      }
    } catch (error) {
      context.commit("todosError", error.message);
    } finally {
      console.log("petición para insertar todos finalizada");
    }
  },
  async updateTodoStatus(context: TodoActionContext, todo: Todo) {
    try {
      // @ts-ignore
      const response: AxiosResponse = await Vue.axios({
        method: "PUT",
        url: "/todos/" + todo.id,
        data: {
          id: todo.id,
          text: todo.text,
          done: !todo.done
        }
      });
      if (response && response.data) {
        context.dispatch("fetchData");
      }
    } catch (error) {
      context.commit("todosError", error.message);
    } finally {
      console.log("petición para updateTodoStatus finalizada");
    }
  },
  async deleteTodo(context: TodoActionContext, todo: Todo) {
    try {
      // @ts-ignore
      const { data } = await Vue.axios({
        //Es igual que hacer un response=... y luego response.data
        method: "DELETE",
        url: "/todos/" + todo.id
      });
      if (data) {
        context.dispatch("fetchData");
      }
    } catch (error) {
      context.commit("todosError", error.message);
    } finally {
      console.log("petición para deleteTodoStatus finalizada");
    }
  }
};
