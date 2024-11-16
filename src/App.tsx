import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

import { Header } from './components/Header';
import { Task } from './components/Task';
import { PlusCircle } from "phosphor-react";

import styles from './App.module.css';
import './global.css';

export interface TaskInterface {
  id: string;
  content: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [newTaskContent, setNewTaskContent] = useState('');

  const createTasksCount = tasks.length;
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
    const storedTasks = localStorage.getItem("@todo-list:tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
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
            <span>{createTasksCount}</span>
          </div>
          <div className={styles.doneTasks}>
            <strong>Concluídas</strong>
            <span>{completedTasksCount}</span>
          </div>
        </div>

        <div className={styles.taskList}>
          {tasks.map((task: TaskInterface) => (
            <Task
              key={task.id}
              id={task.id}
              content={task.content}
              completed={task.completed}
              onComplete={handleCompleteTask}
              onRemove={handleRemoveTask}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
