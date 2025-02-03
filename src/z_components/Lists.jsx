import { useState } from "react";
import useTodo from "../hooks/useTodo"

function Lists() {
    const todos = useTodo((state) => state.todos);
    const completeTodo = useTodo((state) => state.completeTodo);
    const deleteTodo = useTodo((state) => state.deleteTodo);
    const updateTodo = useTodo((state) => state.updateTodo);
    const updateDetails = useTodo((state) => state.updateDetails);
    const filter = useTodo((state) => state.filter);

    // edit 수정중
    const [editNum, setEditNum] = useState(null);
    const [editTodo, setEditTodo] = useState("");

    // 상세 내용
    const [detailsInput, setDetailsInput] = useState({});
    const [detailsNum, setDetailsNum] = useState(null);

    // 수정 버튼 클릭 시
    const handleEdit = (num, currentText) => {
        setEditNum(num);
        setEditTodo(currentText);
    };

    // 수정 -> 저장 버튼 클릭 시
    const handleUpdate = (num) => {
        if(editTodo.trim()) {
            updateTodo(num, editTodo);
            setEditNum(null);
        }
    }

    // 상세 내용 저장
    const handleDetailsSave = (num) => {
        if(detailsInput[num]?.trim()) {
            updateDetails(num, detailsInput[num]);
            setDetailsNum(null);
        }
    }

    // 삭제 후 상세 내용 유지
    const handleDelete = (num) => {
        deleteTodo(num); // Todo 삭제
        if (detailsNum === num) {
            setDetailsNum(null); 
        }
        // 삭제 시 상세 내용 초기화 방지
        setDetailsInput((prev) => {
            const updated = { ...prev };
            delete updated[num]; // 삭제된 Todo의 상세 내용 제거
            return updated;
        })
    }

    // 상세 내용 변경
    const handleDetailsChange = (num, value) => {
        // 각 Todo별 상세 내용 저장
        setDetailsInput((prev) => ({ ...prev, [num]: value })); 
    };

    // todos 필터
    const filterTodos = todos.filter((todo)=> {
        if(filter === "all")
            return true;
        if(filter === "completed")
            return todo.completed;
        if(filter === "notCompleted")
            return !todo.completed;
    })


    return (
        <div className="w-2/3 mx-auto">
            {filterTodos.length === 0 ? (
            <p className="text-center text-gray-500">Todo가 없습니다</p>) : 
            ( filterTodos.map((todo) => (
                <div
                    key={todo.num}
                    className="border-b py-2"
                    // 클릭 시 상세 내용 토글
                    onClick={(e) => {
                        if(e.target.tagName.toLowerCase() === "textarea" || e. target.tagName.toLowerCase() === "button"){
                            return;
                        }
                        // 상세 내용 토글
                        if (detailsNum === todo.num) {
                            setDetailsNum(null);
                            // 해당 상세 내용 비우기
                            setDetailsInput((prev) => ({ ...prev, [todo.num]: "" }));
                        } else{
                            setDetailsNum(todo.num);
                            // 기존 내용
                            setDetailsInput((prev) => ({ ...prev, [todo.num]: todo.details || "" }));
                        }
                    }}
                >
                    <div className="flex items-center justify-between border-b py-2 cursor-pointer">
                        {editNum === todo.num ? (
                            // 수정 모드에서 텍스트 입력
                            <input 
                                type="text" 
                                value={editTodo}
                                onChange={(e) => setEditTodo(e.target.value)}
                                className="flex-1 border rounded px-2 py-1"/> ) :
                            ( // 완료된 Todo 취소선
                            <span 
                                className={`flex-1 ${
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
                                    onClick={() => 
                                    handleDelete(todo.num) }
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

                    {/* 상세 내용 */}
                    {detailsNum === todo.num ? (
                        <div className="mt-2">
                            <textarea
                                // 각 Todo에 상세 내용 유지
                                value={detailsInput[todo.num] || ""} 
                                // 상세 내용 변경 시 업뎃
                                onChange={(e) => handleDetailsChange(todo.num, e.target.value)}
                                placeholder="상세 내용 입력"
                                className="w-full border-gray-400 rounded px-4 py-2" />
                                <button
                                    // 저장 시 해당 Todo의 상세 내용 업뎃
                                    onClick={() => handleDetailsSave(todo.num)}
                                    className="mt-2 bg-blue-300 rounded text-white px-4 py-2 hover:bg-blue-500">
                                    저장
                                </button> 
                        </div>
                    ) : (
                        // 완료되지 않은 Todo에 기존 상세 내용 출력
                        todo.details && (
                            <p className={`mt-2 text-gray-600 text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.num} 상세 내용 : {todo.details}
                            </p>
                        )
                    )}
                </div>
                ))
            )}
        </div>
    )
}

export default Lists
