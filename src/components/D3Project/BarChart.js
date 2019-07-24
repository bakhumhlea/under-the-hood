import React, { Component } from 'react'
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale'
import { max, min, extent } from 'd3-array'
import { select, mouse } from 'd3-selection'
import { axisLeft, axisRight, axisBottom } from 'd3-axis'
import { format, formatPrefix, precisionPrefix } from 'd3-format'
import { line } from 'd3-shape'
import Axios from 'axios';
import styles from './styles.scss'
import parseStockData from '../../engine/parseStockData';
import LoadingCircle from '../Loading/LoadingCircle';
import BarChartController from './BarChartController';
import RequestQuoteForm from './RequestQuoteForm';
import Loading from '../Loading';

const ALPHA_VANTAGE_API_KEY = 'QJ7W70A37A8YLE8';
const barColor = '#5bcbff';
const barColorDark = '#227094';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: null,
      priceseries: null,
      showdata: null,
      quote: 'AAPL'
    }
    this.offsetX = 70;
    this.offsetY = 20;
  }
  componentDidMount() {
    this.getQuoteData();
    this.createBarChart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.priceseries) {
      this.createBarChart();
      this.createVolChart();
      this.createLineChart();
    }
  }
  getQuoteData() {
    const { quote } = this.state;
    const TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY';
    const TIME_SERIES_DAILY = 'TIME_SERIES_DAILY';
    const outputsize = 'compact';
    const interval = '5min';

    Axios.get(`https://www.alphavantage.co/query?function=${TIME_SERIES_INTRADAY}&symbol=${quote}&interval=${interval}&outputsize=${outputsize}&apikey=${ALPHA_VANTAGE_API_KEY}`)
      .then(res => {
        const data = parseStockData.toArray(res.data);
        const length = data.price_series.length;
        const composeMetadata = {
          ...data.meta_data,
          close: data.price_series[length - 1].close,
          open: data.price_series[22].open,
          high: max(data.price_series.map(p=>p.high)),
          low: min(data.price_series.map(p=>p.low)),
        }
        console.log(composeMetadata);
        this.setState({
          metadata: composeMetadata,
          priceseries: data.price_series
        });
      })
      .catch(err => {if (err.response) console.log(err.response.data)});
  }
  onChange(e) {
    if (e) e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  onClearValue(key, value, e) {
    if (e) e.preventDefault();
    this.setState({[key]: value});
  }
  onSubmitQuote(e) {
    if (e) e.preventDefault();
    this.getQuoteData()
  }
  createBarChart() {
    const { size } = this.props;
    const { priceseries, metadata } = this.state;
    const node = this.node;
    
    if (priceseries) {
      var width = size[0] - this.offsetX;
      var height = size[1] - this.offsetY;
      var maxVal = max(priceseries.map(p => p.high ));
      var minVal = min(priceseries.map(p => p.low ));
      var offVal = (maxVal - minVal)/10;
      const yScale = scaleLinear()
        .domain([
          maxVal + offVal,
          minVal - offVal
        ])
        .range([0, height]);

      const xBandScale = scaleBand()
        .domain(priceseries.map(time => time.timestamp))
        .range([0, width])
        .paddingInner(0.5)
        .paddingOuter(0.5)
      var barHeight = priceseries.map(p => {
          if (p.open - p.close < 0) {
            // console.log((yScale(p.open) - yScale(p.close)));
            let h1 = yScale(p.open) - yScale(p.close) < 2 ? 2 : yScale(p.open) - yScale(p.close);
            return Math.ceil(h1);
          } else {
            let h2 = yScale(p.close) - yScale(p.open) < 2 ? 2 : yScale(p.close) - yScale(p.open);
            return Math.ceil(h2);
          }
        });
      var g = select(node)
        .append('g')
        .attr('id', 'bar-chart-group')
        .attr('width', size[0])
        .attr('style', `transform: translate(${this.offsetX/2}px,${this.offsetY/2}px)`)
        .selectAll('rect')
        .data(priceseries)
        .enter()
        .append('rect');
      
      var tickNum = function() {
        var range = (max(priceseries.map(p => p.high))) - (min(priceseries.map(p => p.low)));
      }
      tickNum();
      const leftAxis = axisLeft(yScale)
        .ticks(10)
        .tickSize(4)
        .tickFormat(d => d, ",.0f")

      const rightAxis = axisRight(yScale)
        .ticks(10)
        .tickSize(4)
        .tickFormat(d => d, ",.0f")

      select(node).select('g#l-bar-axis').remove();
      select(node).select('g#r-bar-axis').remove()
      
      select(node)
        .append('g')
        .attr('id','l-bar-axis')
        .attr('style', `transform: translate(${this.offsetX/2}px,${this.offsetY/2}px)`)
        .attr('class', styles.vertAxis)
        .call(leftAxis)

      select(node)
        .append('g')
        .attr('id','r-bar-axis')
        .attr('style', `transform: translate(${width + this.offsetX/2}px,${this.offsetY/2}px)`)
        .attr('class', styles.vertAxis)
        .call(rightAxis)
      
      select(node).select('line#close-price-line').remove();

      var tooltip = select(node)
        .append('line')
        .attr('id', 'close-price-line')
        .attr('class', styles.closePriceLine)
        .attr('x1', 0 + xBandScale.bandwidth())
        .attr('x2', width - xBandScale.bandwidth())
        .attr('style', `transform: translate(${this.offsetX/2}px,${this.offsetY/2}px)`)
        .style('display', 'none')
      
      select(node)
        .select('g#bar-chart-group')
        .selectAll('rect')
        .data(priceseries)
        .attr('class', styles.barStick)
        .attr('x', (d,i) => xBandScale(d.timestamp))
        .attr('y', d => {
          if (d.close > d.open) {
            return yScale(d.open) - barHeight[d.index]
          } else {
            return yScale(d.close) - barHeight[d.index]
          }
        })
        .attr('height', d => barHeight[d.index])
        .attr('width', xBandScale.bandwidth())
        .on('mouseover', d => mouseoverBar(d) )
        .on('mouseout', () => tooltip.style('display', 'none'))
    

      const mouseoverBar = (data) => {
        const yPos = yScale(data.close);
        select(node)
          .select('line#close-price-line')
          .attr('y1', yPos)
          .attr('y2', yPos);

        tooltip.style('display','inherit')
      }
    }
  }
  createVolChart() {
    const { size } = this.props;
    const { priceseries } = this.state;
    const vol = this.vol;
    const node = this.node;

    var width = size[0] - this.offsetX;
    var height = 100 - this.offsetY;

    select(vol)
      .append('g')
      .attr('width', width)
      .attr('height', height)
      .attr('style',`transform: translate(${this.offsetX/2}px,${this.offsetY/2}px)`)
      .selectAll('rect')
      .data(priceseries)
      .enter()
      .append('rect');

    const maxVolume = max(priceseries.map(p => p.volume));
    const volScale = scaleLinear()
      .domain([
        maxVolume, 0
      ])
      .range([0, height])

    const xBandScale = scaleBand()
      .domain(priceseries.map(time => time.timestamp))
      .range([0, width])
      .paddingInner(0.5)
      .paddingOuter(0.5)

    var pm = precisionPrefix(1e6, 1.2e6),
        M = formatPrefix("." + pm, 1.2e6);
    var pk = precisionPrefix(1e3, 100e3),
        K = formatPrefix("." + pk, 100e3);
    
    const leftAxis = axisLeft(volScale)
      .ticks(3)
      .tickSize(4)
      .tickFormat(d => d < 1000000 ? K(d) : M(d))

    const rightAxis = axisRight(volScale)
      .ticks(3)
      .tickSize(4)
      .tickFormat(d => d < 1000000 ? K(d) : M(d))
    
    select(vol).select('g#l-vol-axis').remove();
    select(vol).select('g#r-vol-axis').remove();

    select(vol)
      .append('g')
      .attr('id', 'l-vol-axis')
      .attr('class', styles.vertAxis)
      .attr('style', `transform: translate(${this.offsetX/2}px,${this.offsetY/2}px)`)
      .call(leftAxis)

    select(vol)
      .append('g')
      .attr('id', 'r-vol-axis')
      .attr('class', styles.vertAxis)
      .attr('style', `transform: translate(${width + this.offsetX/2}px,${this.offsetY/2}px)`)
      .call(rightAxis)
    
    select(vol)
      .selectAll('rect')
      .data(priceseries)
      .attr('class', styles.volStick)
      .attr('x', (d,i) => xBandScale(d.timestamp))
      .attr('y', d => height - volScale(maxVolume - d.volume))
      .attr('height', d => volScale(maxVolume - d.volume))
      .attr('width', xBandScale.bandwidth())
  }
  createLineChart() {
    var node = this.node;
    const { size } = this.props;
    const { priceseries } = this.state;

    const width = size[0] - this.offsetX;
    const height = size[1] - this.offsetY;
    var maxVal = max(priceseries.map(p => p.high ));
    var minVal = min(priceseries.map(p => p.low ));
    var offVal = (maxVal - minVal)/10;

    var yScale = scaleLinear()
      .domain([
        maxVal + offVal,
        minVal - offVal
      ])
      .range([height, 0])

    var xScale = scaleBand()
      .domain(priceseries.map(p => p.timestamp))
      .range([0, width])
      .paddingInner(0.5)
      .paddingOuter(0.5)
    
    var lineChart = line()
      .y(d => height - yScale(d.close))
      .x(d => xScale(d.timestamp))   
    
    select(node).select('path#line-chart-1').remove();
    select(node)
      .append('path')
      .attr('id', 'line-chart-1')
      .attr('style', `transform: translate(${this.offsetX/2 + xScale.bandwidth()/2}px,${this.offsetY/2}px)`)
      .attr('class', styles.lineChart)
      .attr('d', lineChart(priceseries))
    
    select(node)
      .select('g#overlay-obj')
      .attr('class', 'focus')
      .attr('style', `transform: translate(${0}px,${0}px)`)
    
    select(node).select('g#mouse-canvas').remove();

    var canvas = select(node)
      .append('g')
      .attr('id', 'mouse-canvas')
      .attr('class', styles.mouseCanvas)
      .attr('width', width - (xScale.step()))
      .attr('style', `transform: translate(${this.offsetX/2}px,${this.offsetY/2}px);display: none`)

    canvas.append('line')
      .attr('class', styles.crosshairLine)
      .attr('id', 'y-crosshair')
      .attr('y2', height)
      .attr('style', `transform: translate(${0}px,${0}px)`)

    canvas.append('line')
      .attr('class', styles.crosshairLine)
      .attr('id', 'x-crosshair')
      .attr('x1', 0 + (xScale.step())/2)
      .attr('x2', width - (xScale.step())/2)
      .attr('style', `transform: translate(${0}px,${0}px)`)
      

    canvas.append('circle')
      .attr('r', 4)
      .attr('cy', height - this.offsetY/2)
      .attr('cx', 0 + (xScale.step())/2)
      .attr('class', styles.focusPoint)
      .attr('style', `transform: translate(${0}px,${0}px)`)

    select(node)
      .select('rect#overlay-1')
      .attr('y', 0)
      .attr('width', width - (xScale.step()))
      .attr('height', height)
      .attr('class', styles.overlay)
      .attr('style', `transform: translate(${this.offsetX/2 + (xScale.step())/2}px,${this.offsetY/2}px)`)
      .on('mouseover', () => { canvas.style('display', 'inherit' )})
      .on('mouseout', () => { canvas.style('display', 'none' )})
      .on('mousemove', onMouseMove);

    function onMouseMove() {
      var x0 = xScale.step();
      var iX = Math.round(mouse(this)[0]/x0);
      var xVal = xScale.domain()[iX]
      var xPos = xScale(xVal) + xScale.bandwidth()/2;
      var yVal = priceseries[iX];
      var yPos = height - yScale(yVal.close);

      select(node)
        .select('circle')
        .attr('cx', xPos)
        .attr('cy', yPos)
      
      canvas
        .select('line#y-crosshair')
        .attr('y1', yPos)
        .attr('x1', xPos)
        .attr('x2', xPos)

      canvas
        .select('line#x-crosshair')
        .attr('x2', xPos)
        .attr('y1', yPos)
        .attr('y2', yPos)

    }

  }
  render() {
    const { size } = this.props;
    const { metadata, priceseries, quote } = this.state;
    const metaData = metadata ? (
        <BarChartController data={metadata} />
      ) : (<Loading/>);
    const requestQuoteForm = (
        <RequestQuoteForm 
          quote={quote} 
          onClearValue={(key,value,e)=>this.onClearValue(key,value,e)}
          onSubmitQuote={(e)=>this.onSubmitQuote(e)}
          onChange={(e)=>this.onChange(e)}
        />
      );
    if (priceseries) {
      return (
        <div className={styles.vizWrapper}>
          <h1 className={styles.superTitle}>Visualized Intraday Stock Prices</h1>
          <div className={styles.chartController}>
            {metaData}
            {requestQuoteForm}
          </div>
          <svg 
            ref={node => this.node = node}
            className={styles.vizBarchart}
            width={size[0]} height={size[1]}
          >
            <g id="overlay-obj">
              <rect id='overlay-1' fill='none'></rect>
            </g>
          </svg>
          <svg 
            ref={vol => this.vol = vol}
            className={styles.vizVolchart}
            width={size[0]} height={100}
          >
          </svg>
        </div>
      )
    } else {
      return (
        <div className={styles.vizLoading}>
          <LoadingCircle />
        </div>
      )
    }
    
  }
}
export default BarChart;