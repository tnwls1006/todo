import { useState } from "react";
import useTodo from "../hooks/useTodo"

function Lists() {
    const todos = useTodo((state) => state.todos);
    const completeTodo = useTodo((state) => state.completeTodo);
    const deleteTodo = useTodo((state) => state.deleteTodo);
    const updateTodo = useTodo((state) => state.updateTodo);

    const [editNum, setEditNum] = useState(null);
    const [editTodo, setEditTodo] = useState("");

    const handleEdit = (num, currentText) => {
        setEditNum(num);
        setEditTodo(currentText);
    };

    const handleUpdate = (num) => {
        if(editTodo.trim()) {
            updateTodo(num, editTodo);
            setEditNum(null);
        }
    };

    return (
        <div className="w-2/3 mx-auto">
            {todos.length === 0 ? (
            <p className="text-center text-gray-500">Todo가 없습니다</p>) : 
            ( todos.map((todo) => (
                <div
                    key={todo.num}
                    className="flex items-center justify-between border-b py-2">
                        {editNum === todo.num ? (
                            // 수정
                            <input type="text" value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="flex-1 border rounded px-2 py-1"/> ) :
                            ( // 평상시
                            <span className={`flex-1 ${
                            todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.num}. {todo.todo}
                            </span>
                        )}

                        <div className="flex gap-2">
                            {editNum === todo.num ? (
                            <>
                                <button
                                    onClick={() => handleUpdate(todo.num)}
                                    className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    저장
                                </button>
                                <button
                                    onClick={() => setEditNum(null)}
                                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
                                    취소
                                </button>
                            </>
                            ): (
                            <>
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
                                <button
                                    onClick={()=>handleEdit(todo.num, todo.todo)}
                                    className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    수정
                                </button>
                            </>    
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Lists
