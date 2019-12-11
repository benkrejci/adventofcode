const fs = require('fs')

const INPUT_FILE = __dirname + '/05.input'
const input = fs.readFileSync(INPUT_FILE, 'utf8').split(',');
const userInput = 1

function getParam(inputIndex, paramModes, paramIndex) {
  const inputValue = input[inputIndex]
  const paramMode = paramModes[paramIndex]
  return parseInt(paramMode === '1' ? inputValue : input[inputValue])
}

for (let i = 0; i <= input.length;) {
  const first = input[i++]
  const operation = parseInt(first.slice(-2))
  const paramModes = first.slice(0, -2).split('').reverse()
  let paramIndex = 0
  const getNextParam = () => parseInt(getParam(i++, paramModes, paramIndex++))
  const setNextParam = value => input[input[i++]] = String(value)
  switch (operation) {
    case 99:
      return
    
    case 1:
      setNextParam(getNextParam() + getNextParam())
      break

    case 2:
      setNextParam(getNextParam() * getNextParam())
      break
    
    case 3:
      setNextParam(userInput)
      break

    case 4:
      console.log(`test [i: ${i}]: ${getNextParam()}`);
      break
    
    default:
      throw new Error(`invalid input: ${operation}`)
  }
}