import React from 'react'
import styles from './styles.scss'
import LoadingCircle from './LoadingCircle';

const Loading = (props) => {
  if (props.error) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.errorTitle}>Error loading component</h3>
        <p>{props.error.message}</p>
        <p>{props.error.stack}</p>
        <div><button className={styles.reloadBtn} onClick={props.retry}>Reload</button></div>
      </div>
    )
  } else {
    return (
      <LoadingCircle/>
    )
  }
}
export default Loading