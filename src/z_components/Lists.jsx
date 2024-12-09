import useTodo from "../hooks/useTodo"

function Lists() {
    const todos = useTodo((state) => state.todos);
    const completeTodo = useTodo((state) => state.completeTodo);
    const deleteTodo = useTodo((state) => state.deleteTodo);

    return (
        <div className="w-2/3 mx-auto">
            {todos.length === 0 ? (
            <p className="text-center text-gray-500">Todo가 없습니다</p>
            ) : (
                todos.map((todo) => (
                <div
                    key={todo.num}
                    className="flex items-center justify-between border-b py-2">
                    <span className={`flex-1 ${
                        todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.num}. {todo.todo}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => completeTodo(todo.num)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                완료
                        </button>
                        <button
                            onClick={() => deleteTodo(todo.num)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                삭제
                        </button>
                    </div>
                </div>
                ))
                )}
        </div>
    )
}

export default Lists
