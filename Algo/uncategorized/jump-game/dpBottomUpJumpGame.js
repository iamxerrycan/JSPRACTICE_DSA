export default function dpBottomUpJumpGame(numbers) {
  // Init cells goodness table.
  const cellsGoodness = Array(numbers.length).fill(undefined);
  // Mark the last cell as "good" one since it is where we ultimately want to get.
  cellsGoodness[cellsGoodness.length - 1] = true;

  // Go throw all cells starting from the one before the last
  // one (since the last one is "good" already) and fill cellsGoodness table.
  for (let cellIndex = numbers.length - 2; cellIndex >= 0; cellIndex -= 1) {
    const maxJumpLength = Math.min(
      numbers[cellIndex],
      numbers.length - 1 - cellIndex,
    );

    for (let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1) {
      const nextIndex = cellIndex + jumpLength;
      if (cellsGoodness[nextIndex] === true) {
        cellsGoodness[cellIndex] = true;
        // Once we detected that current cell is good one we don't need to
        // do further cells checking.
        break;
      }
    }
  }

  // Now, if the zero's cell is good one then we can jump from it to the end of the array.
  return cellsGoodness[0] === true;
}
