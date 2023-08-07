const accumulatorBestTimeToBuySellStocks = (prices, visit = () => {}) => {
  visit();
  let profit = 0;
  for (let day = 1; day < prices.length; day += 1) {
    visit();
    // Add the increase of the price from yesterday till today (if there was any) to the profit.
    profit += Math.max(prices[day] - prices[day - 1], 0);
  }
  return profit;
};

export default accumulatorBestTimeToBuySellStocks;
