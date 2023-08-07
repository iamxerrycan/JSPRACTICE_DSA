const dpBestTimeToBuySellStocks = (prices, visit = () => {}) => {
  visit();
  let lastBuy = -prices[0];
  let lastSold = 0;

  for (let day = 1; day < prices.length; day += 1) {
    visit();
    const curBuy = Math.max(lastBuy, lastSold - prices[day]);
    const curSold = Math.max(lastSold, lastBuy + prices[day]);
    lastBuy = curBuy;
    lastSold = curSold;
  }

  return lastSold;
};

export default dpBestTimeToBuySellStocks;
