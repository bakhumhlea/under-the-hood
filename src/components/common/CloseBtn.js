import React from 'react'

export default function CloseBtn({
  classname,
  width,
  height,
  stroke,
  strokeWidth,
  fill,
  onclick
}) {
  return (
    <svg 
      className={classname?classname:'def-close-btn'} 
      fill={fill?fill:'black'} 
      strokeWidth={strokeWidth?strokeWidth:1} 
      stroke={stroke?stroke:'black'} 
      width={width?width:16} 
      height={height?height:16}
      onClick={onclick}
    >
      <path d={`M0 0 L${width} ${height}`}/>
      <path d={`M0 ${height} L${width} 0`}/>
    </svg>
  )
}
