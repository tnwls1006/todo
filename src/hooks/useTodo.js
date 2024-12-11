import { create } from "zustand";

const useTodo = create((set) => ({
    todos: [],
    filter: "all",

    // todos 추가
    addTodo : (todo) => set((state) => ({
        todos: [...state.todos, 
            {num: state.todos.length + 1, todo, completed: false}
        ]
    })),

    // todos 삭제
    deleteTodo : (num) => set((state) => {
        const updateNum = state.todos.filter((todo) => todo.num !== num);
        return {
            todos: updateNum.map((todo, index) => ({
                ...todo, num: index + 1,
            })),
        }
    }),

    // todos 완료
    completeTodo: (num) => set((state) => ({
        todos: state.todos.map(todo => 
            todo.num === num ? {...todo, completed: !todo.completed} : todo
        )
    })),

    // todos 수정
    updateTodo: (num, updatedText) => set((state) =>({
        todos: state.todos.map((todo) => todo.num === num ? 
        {...todo, todo:updatedText}: todo),
    })),

    setFilter: (filter) => set(() => ({filter})),

}))

export default useTodo;