function sumItems(arr: Array<number>): number {
  return arr.reduce((curr: number, next: number) => curr + next, 0)
}

function findMax(arr: Array<Array<number>>, apply: (a: Array<number>) => number) : Array<number> {
  let best = sumItems(arr[0])
  let res = arr[0]

  for (const el of arr) {
    const curr = apply(el)
    if (curr > best) {
      res = el
    }
  }

  return res
}

function getRandomNumberBetween(start: number, end: number): number {
  return Math.floor(Math.random() * (end + 1)) + start
}

function splitArrayIntoTwo(arr: Array<number>, splitIndex: number): [Array<number>, Array<number>] {
  const firstPart = arr.slice(0, splitIndex)
  const secondPart = arr.slice(splitIndex)
  return [firstPart, secondPart]
}

function shuffleArray<T>(arr: Array<T>): Array<T> {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

export {
  sumItems,
  findMax,
  getRandomNumberBetween,
  splitArrayIntoTwo,
  shuffleArray,
}