const fs = require('fs')

const INPUT_FILE = __dirname + '/07.input'
const instructions = fs.readFileSync(INPUT_FILE, 'utf8').replace('\n', '').split(',');

const AMP_INPUTS = [5,6,7,8,9]

// invoked at end
function go() {
  let maxOutput = null
  heapPermutation(AMP_INPUTS, AMP_INPUTS.length, AMP_INPUTS.length, phaseSettings => {
    const ampOutput = tryAmps(phaseSettings)
    if (maxOutput === null || ampOutput > maxOutput) maxOutput = ampOutput
  })
  console.log(`Max output: ${maxOutput}`)
}

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
  const programs = []
  const numAmps = AMP_INPUTS.length
  let ampOutput = 0
  let ampIndex = 0
  while (true) {
    let program = programs[ampIndex]
    if (!program) {
      program = programs[ampIndex] = new Program(instructions.slice(), ampIndex)
      program.input(phaseSettings[ampIndex])
    } else if (!program.isDone) {
      program.input(ampOutput)
      const output = program.start()
      if (!program.isDone) ampOutput = output
      else if (ampIndex === numAmps - 1) return ampOutput
    }
    ampIndex = (ampIndex + 1) % numAmps
  }
}

class Program {
  constructor(instructions, ampIndex) {
    this.instructions = instructions
    this.ampIndex = ampIndex
    this.isDone = false

    this.inputs = []
    this.programIndex = 0
  }

  input(value) {
    this.inputs.unshift(value)
  }

  getParam(paramModes, paramIndex) {
    const inputValue = this.instructions[this.programIndex++]
    const paramMode = paramModes[paramIndex]
    return parseInt(paramMode === '1' ? inputValue : this.instructions[inputValue])
  }
  
  setNextParam(value) {
    this.instructions[this.instructions[this.programIndex++]] = String(value)
  }

  start() {
    while (true) {
      const first = this.instructions[this.programIndex++]
      const operation = parseInt(first.slice(-2))
      const paramModes = first.slice(0, -2).split('').reverse()
      let paramIndex = 0
      const getNextParam = () => parseInt(this.getParam(paramModes, paramIndex++))
      
      switch (operation) {
        case 99:
          this.isDone = true
          return
        
        case 1:
          this.setNextParam(getNextParam() + getNextParam())
          break

        case 2:
          this.setNextParam(getNextParam() * getNextParam())
          break
        
        case 3:
          this.setNextParam(this.inputs.pop())
          break

        case 4:
          return getNextParam()

        case 5: {
          const p1 = getNextParam(), p2 = getNextParam()
          if (p1 !== 0) this.programIndex = p2
        } break

        case 6: {
          const p1 = getNextParam(), p2 = getNextParam()
          if (p1 === 0) this.programIndex = p2
        } break

        case 7:
          this.setNextParam(getNextParam() < getNextParam() ? 1 : 0)
          break
          
        case 8:
          this.setNextParam(getNextParam() === getNextParam() ? 1 : 0)
          break
        
        default:
          throw new Error(`invalid input: ${operation}`)
      }
      if (this.programIndex > this.instructions.length) return;
    }
  }
}

go()