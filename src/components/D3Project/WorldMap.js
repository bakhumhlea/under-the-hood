/* eslint-disable no-undef */
import React, { Component } from 'react'
import worlddata from './datum/world'
import { geoMercator, geoPath } from 'd3-geo'

import styles from './styles.scss'

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'hover the country to teveal its name'
    }
    this.offsetX = 20;
    this.offsetY = 70;
    this.onClickCountry = this.onClickCountry.bind(this);
    this.onMouseLeaveCountry = this.onMouseLeaveCountry.bind(this);
    this.timer = null;
  }
  onClickCountry(country) {
    this.setState({
      country: country
    });
    clearTimeout(this.timer);
  }
  onMouseLeaveCountry() {
    this.timer = setTimeout(() => {
      this.setState({country: 'Hover the country to reveal its name'});
      clearTimeout(this.timer);
    }, 5000)
  }
  render() {
    const { size } = this.props;
    const { country } = this.state;
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const countries = worlddata.features.map((d,i) => (
      <path 
        onMouseEnter={()=>this.onClickCountry(d.properties.name)}
        onMouseLeave={()=>this.onMouseLeaveCountry()}
        key={'path'+i}
        d={pathGenerator(d)}
        className={styles.countries}
      />
    ))
    return (
      <div className={styles.vizWrapper}>
        <div className={styles.mapWraper} style={{width: size[0] - this.offsetX}}>
          <svg 
            width={size[0] - this.offsetX} 
            height={size[1]}
            className={styles.vizWorldmap}
          >
            {countries}
          </svg>
          { !!country && <div className={styles.countryName}>{country}</div>}
        </div>
      </div>
    )
  }
}
export default WorldMap;