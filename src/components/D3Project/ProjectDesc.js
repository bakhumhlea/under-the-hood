import React from 'react'
import styles from './styles.scss'

export default function ProjectDesc(props) {
  return (
    <h3 className={styles.projTitle}>
      <svg width={30} height={20} className={styles.arrow}>
          <path d="M22 19 L5 19 L5 5 L0 10"/>
      </svg>
      <span>{props.title}</span>
    </h3>
  )
}
