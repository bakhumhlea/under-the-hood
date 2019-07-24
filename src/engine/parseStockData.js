function toArray (data) {
  const meta_data = {
    information: data['Meta Data']['1. Information'],
    symbol: data['Meta Data']['2. Symbol'],
    last_refreshed: data['Meta Data']['3. Last Refreshed'],
    interval: data['Meta Data']['4. Interval'],
    output_size: data['Meta Data']['5. Output Size'],
    time_zone: data['Meta Data']['6. Time Zone']
  };
  const price_series = Object
    .keys(data["Time Series (5min)"])
    .reverse()
    .map((el,i) => {
      return {
        index: i,
        open: parseFloat(data["Time Series (5min)"][el]["1. open"]),
        high: parseFloat(data["Time Series (5min)"][el]["2. high"]),
        low: parseFloat(data["Time Series (5min)"][el]["3. low"]),
        close: parseFloat(data["Time Series (5min)"][el]["4. close"]),
        volume: parseFloat(data["Time Series (5min)"][el]["5. volume"]),
        timestamp: el,
      };
  });
  return {
    meta_data: meta_data,
    price_series: price_series
  }
}

const parseStockData = {
  toArray: toArray
}

export default parseStockData;