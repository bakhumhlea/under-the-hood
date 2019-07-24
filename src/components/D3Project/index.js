/* eslint-disable no-undef */
import React, { Component } from 'react'
import BarChart from './BarChart'
import styles from './styles.scss'
import WorldMap from './WorldMap';
import ProjectDesc from './ProjectDesc';

const InitChartW = Math.floor(window.innerWidth - (window.innerWidth * 0.1));
const range = 100;
const length = 200;
const randomData = Array
  .apply(null, { length: length })
  .map(el => Math.ceil(Math.random() * range));

class D3Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [3,16,5,10],
      width: 1000,
      height: 400
    }
  }
  componentDidMount() {
    this.setState({
      width: InitChartW,
      height: 400
    })
    window.onresize = () => {
      const chartW = Math.floor(window.innerWidth - (window.innerWidth * 0.1));
      this.setState({
        width: chartW,
        height: 400
      })
    }
  }
  render() {
    const { width, height } = this.state;
    return (
      <div className={styles.d3projectWrapper}>
        <div className={styles.projContainer}>
          <BarChart data={randomData} size={[width, height]} />
          {/* <ProjectDesc title={'Create bar chart with D3'}/> */}
        </div>
        <div className={styles.projContainer}>
          <WorldMap size={[width, 450]}/>
          <ProjectDesc title={'World map using D3'}/>
        </div>
      </div>
    )
  }
}
export default D3Project;