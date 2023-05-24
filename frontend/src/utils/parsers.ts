export const isEqual = (a: number[], b: number[]): boolean => {
  return a[0] === b[0] && a[1] === b[1]
}

export const parsePosition = (originalPosition: number[]): string => {
  const [row, col] = originalPosition
  const rowInitial = String.fromCharCode(65 + row)
  const colInitial = col + 1

  return `${rowInitial}${colInitial}`
}
