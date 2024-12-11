import useTodo from "../hooks/useTodo"

function TodoFilter() {
  const filter = useTodo((state) => state.filter);
  const setFilter = useTodo((state) => state.setFilter);
  const completedAllDelete = useTodo((state) => state.completedAllDelete);

  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        onClick={()=> setFilter("all")}
        className={`px-4 py-2 rounded ${filter === "all" ? 
          "bg-blue-300 text-white" : "bg-slate-500"}`}>
        전체
      </button>

      <button
        onClick={()=> setFilter("completed")}
        className={`px-4 py-2 rounded ${filter === "completed" ? 
          "bg-blue-300 text-white" : "bg-slate-500"}`}>
        완료
      </button>

      <button
        onClick={()=> setFilter("notCompleted")}
        className={`px-4 py-2 rounded ${filter === "notCompleted" ? 
          "bg-blue-300 text-white" : "bg-slate-500"}`}>
        미완료
      </button>

      {/* 완료 필터때만 완료 일괄 삭제 표시 */}
      {filter === "completed" &&  (
        <button onClick={completedAllDelete}
        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600">
          전체 삭제
        </button>
      )}
    </div>
  )
}

export default TodoFilter
