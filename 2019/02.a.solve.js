const rl = require('readline').createInterface({ input: process.stdin })

let input = '';
rl.on('line', l => input += l)
rl.on('close', () => {
    input = input.split(',')
    for (let i = 0; i <= input.length - 4; i += 4) {
        const operation = input[i]
        const input1 = parseInt(input[input[i + 1]])
        const input2 = parseInt(input[input[i + 2]])
        const outputIndex = input[i + 3]
        if (operation == 99) break
        else if (operation == 1) input[outputIndex] = input1 + input2
        else if (operation == 2) input[outputIndex] = input1 * input2
        else throw new Error('invalid input')
    }
    console.log(input.join(','))
})
