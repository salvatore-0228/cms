export const splitTextByHeight = (
  text: string,
  height: number | undefined,
  width: number | undefined,
  measureNode: HTMLDivElement
): [string, string] => {
  if (!measureNode) return [text, ''];
  if (!height) height = 100;
  if (!width) width = 500;

  const words = text.split(' ');

  const fitWords = (wordList: string[]) => {
    let low = 0;
    let high = wordList.length;
    let bestFit = 0;
    let cur_scroll_height = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const testStr = wordList.slice(0, mid).join(' ');
      measureNode.textContent = testStr;

      if (measureNode.scrollHeight <= height) {
        // bestFit = mid;
        if(cur_scroll_height <= measureNode.scrollHeight) {
          bestFit = mid;
          cur_scroll_height = measureNode.scrollHeight;
        } 
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const fit = wordList.slice(0, bestFit).join(' ');
    const rest = wordList.slice(bestFit).join(' ');
    return [fit, rest];
  };

  const [first, remaining] = fitWords(words);
  measureNode.textContent = ""
  // const [second, _] = fitWords(remaining.split(' '));
  return [first, remaining];
};
