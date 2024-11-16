import { Trash } from "phosphor-react"

import styles from "./Task.module.css";

export function Task() {
    return (
        <div className={styles.container}>
            <input type="checkbox" className={styles.checkbox} />
            <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
            <Trash />
        </div>
    )
}