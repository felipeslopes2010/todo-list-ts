import { Trash, CheckCircle } from "phosphor-react";

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
                <button
                    className={styles.checkContainer}
                    onClick={() => onComplete(task.id)}
                >
                    {task.completed ? <CheckCircle size={22} /> : <div /> }
                </button>
            {task.completed ? (
                <p className={styles.taskCompleted}>{task.content}</p>
            ) : (
                <p className={styles.taskIncompleted}>{task.content}</p>
            )}
            <Trash onClick={() => onRemove(task.id)} />
        </div>
    );
}
