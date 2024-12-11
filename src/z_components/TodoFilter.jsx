import useTodo from "../hooks/useTodo"

function TodoFilter() {
  const filter = useTodo((state) => state.filter);
  const setFilter = useTodo((state) => state.setFilter);

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
    </div>
  )
}

export default TodoFilter
