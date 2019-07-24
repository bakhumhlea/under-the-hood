import React, { Component } from 'react'
import styles from './styles.scss'

class LoadingCircle extends Component {

  constructor(props) {
    super(props);
    this.timer = null;
  }
  componentDidMount() {
    this.timer = setInterval(()=>{
      var circle = document.getElementById('circle-loading');
      var currentRadius = circle.getAttribute('r');
      circle.setAttribute('r', (parseInt(currentRadius, 10) + 2)%100);
      var currentOpac = circle.style.opacity;
      circle.style.opacity = currentOpac <= 0 ? 1 : currentOpac - 0.05;
    }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className={styles.loadingWrapper}>
        <svg className={styles.loading} width="100" height="100">
          <circle className={styles.loadingCir} cx="50" cy="50" r="10"/>
          <circle id="circle-loading" className={styles.loadingCir} cx="50" cy="50" r="10"/>
        </svg>
      </div>
    )
  }
}

export default LoadingCircle;
