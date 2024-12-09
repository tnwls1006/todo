import { useState } from "react"

/* eslint-disable react/prop-types */

// 사용자 입력 -> 부모 컴포넌트에 전달

function Input({ addTodo }) { 
  // 입력 값 저장
  const [todo, setTodo] = useState("");

  const todoSubmit = (e) =>{
    e.preventDefault();
    if (todo.trim()) {
      addTodo(todo);
      setTodo(""); 
    }
  }
    
  return (
    <form
      className="flex items-center justify-center gap-4 my-6"
      onSubmit={todoSubmit}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Todo 입력"
        className="border border-gray-300 rounded px-4 py-2 w-2/3"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-6 py-2 hover:bg-blue-600"
      >
        확인
      </button>
    </form>
  )
}

export default Input;