import React from 'react'
import styles from './styles.scss'

const getChange = (data) => {
  const isUp = (data.close - data.open) > 0;
  return {
    percent: `${isUp?"+":""}` + ((data.close - data.open)/data.open*100).toFixed(2),
    change: `${isUp?"+":""}` + ((data.close - data.open)/data.open).toFixed(2),
    isUp: isUp
  };
}
const BarChartController = ({data}) => {
  return (
    <div className={styles.metaDataGroup}>
        <div className={styles.symbolData}>
          <div className={styles.priceDetails}>
            <span className={getChange(data).isUp?styles.up:styles.down}><span>{getChange(data).change}</span></span>
            <span className={getChange(data).isUp?styles.percentup:styles.percentdown}><span>{getChange(data).percent}%</span></span>
            <span className={styles.price}><small>Open</small><span>{data.open.toFixed(2)}</span></span>
            <span className={styles.price}><small>Close</small><span>{data.close.toFixed(2)}</span></span>
            <span className={styles.price}><small>High</small><span>{data.high.toFixed(2)}</span></span>
            <span className={styles.price}><small>Low</small><span>{data.low.toFixed(2)}</span></span>
          </div>
          <h3 className={styles.symbol}>{data.symbol}</h3>
        </div>
        <div className={styles.details}>
          <p className={styles.subText}>
            <span>Last refreshed</span>
            <span>{new Date(data.last_refreshed).toLocaleTimeString()} • {new Date(data.last_refreshed).toLocaleDateString()}</span>
          </p>
          <p className={styles.subText}>
            <span>Interval</span>
            <span>{data.interval}</span>
          </p>
          <p className={styles.subText}>
            <span>Timezone</span>
            <span>{data.time_zone}</span>
          </p>
        </div>
      </div>
  )
}

export default BarChartController;