const fs = require('fs')

const INPUT_FILE = __dirname + '/07.input'
const program = fs.readFileSync(INPUT_FILE, 'utf8').split(',');

const AMP_INPUTS = [5,6,7,8,9]

let maxOutput = null
heapPermutation(AMP_INPUTS, AMP_INPUTS.length, AMP_INPUTS.length, phaseSettings => {
  const ampOutput = tryAmps(phaseSettings)
  if (maxOutput === null || ampOutput > maxOutput) maxOutput = ampOutput
})
console.log(`Max output: ${maxOutput}`)

function heapPermutation(a, size, n, callback) {
  if (size === 1) callback(a)
  for (let i = 0; i < size; i++) {
    heapPermutation(a, size - 1, n, callback)
    const j = size % 2 ? 0 : i
    const temp = a[j]
    a[j] = a[size - 1]
    a[size - 1] = temp
  }
}

function tryAmps(phaseSettings) {
  let ampOutput = 0
  for (let ampIndex = 0; ampIndex < 5; ampIndex++) {
    ampOutput = run(program.slice(), [phaseSettings[ampIndex], ampOutput])
  }
  return ampOutput
}

function getParam(program, programIndex, paramModes, paramIndex) {
  const inputValue = program[programIndex]
  const paramMode = paramModes[paramIndex]
  console.log(parseInt(paramMode === '1' ? inputValue : program[inputValue]))
  return parseInt(paramMode === '1' ? inputValue : program[inputValue])
}

function run(program, input) {
  let inputIndex = 0
  let programIndex = 0
  const setNextParam = value => program[program[programIndex++]] = String(value)

  while (true) {
    const first = program[programIndex++]
    const operation = parseInt(first.slice(-2))
    const paramModes = first.slice(0, -2).split('').reverse()
    let paramIndex = 0
    const getNextParam = () => parseInt(getParam(program, programIndex++, paramModes, paramIndex++))
    
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
        setNextParam(input[inputIndex++])
        break

      case 4:
        return getNextParam()

      case 5: {
        const p1 = getNextParam(), p2 = getNextParam()
        if (p1 !== 0) programIndex = p2
      } break

      case 6: {
        const p1 = getNextParam(), p2 = getNextParam()
        if (p1 === 0) programIndex = p2
      } break

      case 7:
        setNextParam(getNextParam() < getNextParam() ? 1 : 0)
        break
        
      case 8:
        setNextParam(getNextParam() === getNextParam() ? 1 : 0)
        break
      
      default:
        throw new Error(`invalid input: ${operation}`)
    }
    if (programIndex > program.length) return;
  }
}