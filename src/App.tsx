import { Header } from './components/Header'
import { Task } from './components/Task'
import { PlusCircle } from "phosphor-react"

import styles from './App.module.css';
import './global.css';


function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
          />
          <button
            type="button"
          >
            Criar
            <PlusCircle size={16} />
          </button>
        </div>

        <div className={styles.taskListHeader}>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>0</span>
          </div>
          <div className={styles.doneTasks}>
            <strong>Concluídas</strong>
            <span>0</span>
          </div>
        </div>

        <div className={styles.taskList}>
          <Task />
          <Task />
          <Task />
        </div>
      </div>
    </>
  )
}

export default App
