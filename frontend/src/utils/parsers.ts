export const isEqual = (a: number[], b: number[]): boolean => {
  return a[0] === b[0] && a[1] === b[1]
}

export const parsePosition = (originalPosition: number[]): string => {
  const [row, col] = originalPosition
  const rowInitial = String.fromCharCode(65 + col)
  const colInitial = 8 - row // TODO: 8 should be a constant (board size)

  return `${rowInitial}${colInitial}`
}
