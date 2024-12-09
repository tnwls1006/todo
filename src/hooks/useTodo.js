import { create } from "zustand";

const useTodo = create((set) => ({
    todos: [],

    // todos 업데이트
    addTodo : (todo) => set((state) => ({
        todos: [...state.todos, {num: state.todos.length + 1, todo, completed: false}]
    })),

    deleteTodo : (num) => set((state) => {
        const updateNum = state.todos.filter((todo) => todo.num !== num);
        return {
            todos: updateNum.map((todo, index) => ({
                ...todo, num: index + 1,
            })),
        }
    }),

    completeTodo: (num) => set((state) => ({
        todos: state.todos.map(todo => 
            todo.num === num ? {...todo, completed: !todo.completed} : todo
        )
    })),


}))

export default useTodo;