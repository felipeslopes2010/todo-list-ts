import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

import { Header } from './components/Header';
import { Task } from './components/Task';
import { PlusCircle, ClipboardText } from "phosphor-react";

import styles from './App.module.css';
import './global.css';

export interface ITask {
  id: string;
  content: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskContent, setNewTaskContent] = useState('');

  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  function handleNewTask() {
    const newTask = {
      id: uuidv4(),
      content: newTaskContent,
      completed: false,
    };

    if(newTask.content.length === 0) {
      return alert("Informar nome da nova tarefa!");
    }

    setTasks([...tasks, newTask]);
    setNewTaskContent('');
  }

  function handleCompleteTask(id: string) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  }

  function handleRemoveTask(taskToRemove: string) {
    setTasks(tasks.filter(task => task.id !== taskToRemove));
  }

  useEffect(() => {
    const savedTasksFromLocalStorage = localStorage.getItem("@todo-list:tasks");

    if (savedTasksFromLocalStorage) {
      setTasks(JSON.parse(savedTasksFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("@todo-list:tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={newTaskContent}
            onChange={e => setNewTaskContent(e.target.value)}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="button" onClick={handleNewTask}>
            Criar
            <PlusCircle size={22} />
          </button>
        </div>

        <div className={styles.taskListHeader}>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>{createdTasksCount}</span>
          </div>
          <div className={styles.doneTasks}>
            <strong>Concluídas</strong>
            <span>{completedTasksCount}</span>
          </div>
        </div>

        <div className={styles.taskList}>
          { 
            tasks.length > 0 ? (
              tasks.map((task: ITask) => (
                <Task
                  key={task.id}
                  task={task}
                  onComplete={handleCompleteTask}
                  onRemove={handleRemoveTask}
                />
              ))
            ) : (
              <div className={styles.emptytaskList}>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
