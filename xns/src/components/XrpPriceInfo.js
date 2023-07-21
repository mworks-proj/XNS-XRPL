import React, { useEffect, useState } from 'react';
import axios from 'axios';

const XrpPriceInfo = () => {
  const [xrpData, setXrpData] = useState(null);

  useEffect(() => {
    const fetchXrpData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'ripple',
            vs_currencies: 'usd',
            include_24hr_change: true,
            include_24hr_vol: true, // Include 24-hour trading volume
          },
        });
        setXrpData(response.data.ripple);
      } catch (error) {
        console.error('Error fetching XRP data:', error);
      }
    };

    fetchXrpData();
    // Fetch data every 1 minute (adjust as needed)
    const interval = setInterval(fetchXrpData, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!xrpData) {
    return null;
  }

  const { usd, usd_24h_change, usd_24h_vol } = xrpData;
  const isPriceUp = usd_24h_change > 0;

  const priceStyle = {
    color: isPriceUp ? 'green' : 'red',
    fontWeight: 'bold',
  };

  // Format the numbers to have 4 decimal places
  const formattedPrice = Number(usd).toFixed(4);
  const formattedHigh = (usd + usd_24h_change / 100).toFixed(4);
  const formattedChange = Number(usd_24h_change).toFixed(4);
  const formattedVolume = new Intl.NumberFormat('en-US').format(Number(usd_24h_vol));

  return (
    <div className="xrp-price-info">
      <span><b>XRP Market Price:</b> <span style={priceStyle}>${formattedPrice}</span> </span>
      <span><b>24h High:</b> <span style={priceStyle}>${formattedHigh}</span> </span>
      <span><b>24h % Change:</b> <span style={priceStyle}>{formattedChange}% </span></span>
      <span><b>Total Volume:</b> <span style={priceStyle}>{formattedVolume}</span></span>
    </div>
  );
};

export default XrpPriceInfo;
