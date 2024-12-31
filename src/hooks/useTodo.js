import { create } from "zustand";

const useTodo = create((set) => ({
    todos: [],
    filter: "all",

    // todos 추가
    addTodo : (todo) => set((state) => ({
        todos: [...state.todos, 
            {num: state.todos.length + 1, todo, completed: false, details: ""}
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

    // 필터
    setFilter: (filter) => set(() => ({filter})),

    // 완료 항목 일괄 삭제
    completedAllDelete:  () => set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
    })),

    // 상세 내용
    updateDetails: (num, newDetails) => set((state) =>({
        todos: state.todos.map((todo) =>
        todo.num === num ? {...todo, details: newDetails} : todo),
    })),
}))

export default useTodo;