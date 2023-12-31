export default function dpTopDownJumpGame(
  numbers,
  startIndex = 0,
  currentJumps = [],
  cellsGoodness = [],
) {
  if (startIndex === numbers.length - 1) {
    // We've jumped directly to last cell. This situation is a solution.
    return true;
  }

  // Init cell goodness table if it is empty.
  // This is DYNAMIC PROGRAMMING feature.
  const currentCellsGoodness = [...cellsGoodness];
  if (!currentCellsGoodness.length) {
    numbers.forEach(() => currentCellsGoodness.push(undefined));
    // Mark the last cell as "good" one since it is where we ultimately want to get.
    currentCellsGoodness[cellsGoodness.length - 1] = true;
  }

  // Check what the longest jump we could make from current position.
  // We don't need to jump beyond the array.
  const maxJumpLength = Math.min(
    numbers[startIndex], // Jump is within array.
    numbers.length - 1 - startIndex, // Jump goes beyond array.
  );

  // Let's start jumping from startIndex and see whether any
  // jump is successful and has reached the end of the array.
  for (let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1) {
    // Try next jump.
    const nextIndex = startIndex + jumpLength;

    // Jump only into "good" or "unknown" cells.
    // This is top-down dynamic programming optimisation of backtracking algorithm.
    if (currentCellsGoodness[nextIndex] !== false) {
      currentJumps.push(nextIndex);

      const isJumpSuccessful = dpTopDownJumpGame(
        numbers,
        nextIndex,
        currentJumps,
        currentCellsGoodness,
      );

      // Check if current jump was successful.
      if (isJumpSuccessful) {
        return true;
      }

      // BACKTRACKING.
      // If previous jump wasn't successful then retreat and try the next one.
      currentJumps.pop();

      // Mark current cell as "bad" to avoid its deep visiting later.
      currentCellsGoodness[nextIndex] = false;
    }
  }

  return false;
}
