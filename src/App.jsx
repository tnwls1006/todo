import { useState } from 'react';
import Header from './components/Header'
import Input from './components/Input'
import Lists from './components/Lists'

import './index.css'

// 상태 관리, 컴포넌트 연결

function App() {
  // todos 배열로 초기화
  const [todos, setTodos] = useState([]);

  // 새로운 todo 추가
  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  // 완료 함수
  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // 삭제 함수
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  return (
    <>
    <div>
      <Header />
      <Input addTodo={addTodo}/>
      <Lists todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
    </div>
    </>
  )
}

export default App
