import React from 'react'
import styles from './styles.scss'

const Landing = () => (
  <div className={styles.landing}>
    {/* <div className={styles.landingImage}></div> */}
    <h1 className={styles.appName}>
      <span className={styles.left}>UNDER</span>
      <span className={styles.mid}>THE</span>
      <span className={styles.right}>HOOD</span>
    </h1>
  </div>
)

export default Landing;
