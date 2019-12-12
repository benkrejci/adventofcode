const fs = require('fs')

const INPUT_FILE = __dirname + '/08.input'
const input = fs.readFileSync(INPUT_FILE, 'utf8').replace('\n', '').split('')
const WIDTH = 25, HEIGHT = 6

function getMinZerosProduct() {
  let layerPixels = WIDTH * HEIGHT
  let minZeros = layerPixels
  let minZerosProduct = null
  for (let layer = 0; layer < input.length / layerPixels; layer++) {
    let numZeros = 0
    let numOnes = 0
    let numTwos = 0
    for (let _i = 0; _i < layerPixels; _i++) {
      const value = input[layerPixels * layer + _i]
      if (value === '0') {
        numZeros++
        if (numZeros >= minZeros) {
          break
        }
      } else if (value === '1') {
        numOnes++
      } else if (value === '2') {
        numTwos++
      }
    }
    if (numZeros < minZeros) {
      minZeros = numZeros
      minZerosProduct = numOnes * numTwos
      if (numZeros === 0) break
    }
  }
  return minZerosProduct
}

console.log(`product: ${getMinZerosProduct()}`)