import { Trash } from "phosphor-react"

import styles from "./Task.module.css";
import { TaskInterface } from "../App";

export function Task({ id, content, completed = false, onComplete, onRemove }: TaskInterface & { onComplete: (id: string) => void, onRemove: (id: string) => void }) {
    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={completed}
                onChange={() => onComplete(id)}
            />
            { completed ? <p className={styles.taskCompleted}>{content}</p> : <p className={styles.taskIncompleted}>{content}</p>}
            <Trash onClick={() => onRemove(id)} />
        </div>
    )
}