import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import logoIcon from '../../images/planet-3.png'

export default class Navbar extends Component {
  render() {
    return (
      <div className={styles.vsNavbar}>
        <Link to="/" className={styles.logo}>
          {/* <img src={logoIcon} width="30px" height="30px" className={styles.icon}/> */}
          <span className={styles.appname}>UTH</span>
        </Link>
        <div className="links-cont">
          <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link to="/visualboard" className={styles.navLink}>Visual Board</Link>
          <Link to="/articles" className={styles.navLink}>Articles</Link>
        </div>
      </div>
    )
  }
}
