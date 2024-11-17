import { Trash } from "phosphor-react";

import styles from "./Task.module.css";
import { ITask } from "../App";

interface TaskProps {
    task: ITask;
    onComplete: (id: string) => void;
    onRemove: (id: string) => void;
}

export function Task({ task, onComplete, onRemove }: TaskProps) {
    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.completed}
                onChange={() => onComplete(task.id)}
            />
            {task.completed ? (
                <p className={styles.taskCompleted}>{task.content}</p>
            ) : (
                <p className={styles.taskIncompleted}>{task.content}</p>
            )}
            <Trash onClick={() => onRemove(task.id)} />
        </div>
    );
}
