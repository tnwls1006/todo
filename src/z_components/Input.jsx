import useTodo from "../hooks/useTodo"
import { useState } from "react"

function Input() {
    const [input, setInput] = useState("");
    const addTodo = useTodo((state) => state.addTodo);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.trim()) {
            addTodo(input);
            setInput("")
        }
    }

    return (
        <div>
            <form
                className="flex items-center justify-center gap-4 my-6"
                onSubmit={handleSubmit}
            >
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Todo 입력"
            className="border border-gray-300 rounded px-4 py-2 w-2/3"
        />
        <button
            type="submit"
            className="bg-blue-500 text-white rounded px-6 py-2 hover:bg-blue-600"
        >
            추가
        </button>
            </form>
        </div>
    )
}

export default Input
