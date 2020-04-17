export function tranNumber(num) {
  num = num / 1000000
  let point = 2
  let numStr = num.toString()
  if (numStr.length < 5) {
    return numStr
  } else {
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
  }
}
