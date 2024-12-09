/* eslint-disable react/prop-types */

// 리스트 보여주기

function Lists({ todos, completeTodo, deleteTodo }) {

  return (
    <div className="w-2/3 mx-auto">
      {todos.length === 0 ? ( 
        <p className="text-center text-gray-500">Todo가 없습니다</p>
      ) : (
        todos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {index + 1}. {todo.text}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => completeTodo(index)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                완료
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Lists;