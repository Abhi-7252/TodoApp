import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {v4 as uuidv4} from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
    
  },[])

  const saveToLS =(params)=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd=()=>{
    setTodos([...todos, {id : uuidv4() , todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }

  const handleDelete=(e,id)=>{
    let newTodos= todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox =(e) => {
    let id = e.target.name
    //console.log(`id is ${id}`);
    let index= todos.findIndex(item=>{
      return item.id===id;
    })
    //console.log(index)
    let newTodos= [...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    //console.log(newTodos)
    setTodos(newTodos)
    saveToLS()
    
  }
  

  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo);
    let newTodos= todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()

  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleChange=(e)=>{
    setTodo(e.target.value);

  }
  

  return (
    <>
    <Navbar/>
      <div className=" container md:mx-auto my-5 rounded-xl p-5  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white min-h-[80vh] lg:w-[40%]">
        <h1 className='font-bold text-center text-3xl'>e-TODO-Planner</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add To-DO</h2>
          <div className='flex'>
          <input placeholder='Enter your Tasks' className='w-[80%] rounded-full placeholder:text-black border-2 p-1 px-1 bg-gradient-to-r from-pink-0 hover:to-yellow-500' type='text' onChange={handleChange} value={todo}></input>
          <button className=' shadow-lg shadow-pink-500/50 bg-indigo-500 hover:bg-indigo-800 p-2 text-sm font-bold py-1 disabled:bg-indigo-200 text-white rounded-md mx-6' disabled={todo.length<=4} onClick={handleAdd}>Add</button>
          </div>
          
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Task</h2>
        <div className="todos ">
          {todos.length ===0 && <div className='m-5'>No Work to Do</div>}
          {todos.map(item=>{

          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex justify-between my-3 "}>
            <div className='flex gap-5 list'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through": "" } >{item.todo}</div>
            </div> 
            
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-indigo-500 hover:bg-indigo-800 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-indigo-500 hover:bg-indigo-800 p-2 text-sm font-bold py-1  text-white rounded-md mx-1'><AiFillDelete /></button>
            </div>
          </div>
          })}
        </div>
      
    </div>
    </>
  )
}

export default App
