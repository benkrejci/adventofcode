const fs = require('fs')

const INPUT_FILE = __dirname + '/08.input'
const input = fs.readFileSync(INPUT_FILE, 'utf8').replace('\n', '').split('')
const WIDTH = 25, HEIGHT = 6

function getMinZerosProduct() {
  let layerPixels = WIDTH * HEIGHT
  let indexInLayer = 0
  let grid = ''
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let color = '2'
      let layer = 0
      while (color === '2') {
        color = input[layer++ * layerPixels + indexInLayer]
      }
      grid += color === '0' ? ' ' : '*'
      indexInLayer++
    }
    grid += '\n'
  }
  return grid
}

console.log(getMinZerosProduct())