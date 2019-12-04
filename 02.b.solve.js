const rl = require('readline').createInterface({ input: process.stdin })

const solution = 19690720

let input = '';
rl.on('line', l => input += l)

function run(arr) {
    for (let i = 0; i <= arr.length - 4; i += 4) {
        const operation = arr[i]
        const arr1 = parseInt(arr[arr[i + 1]])
        const arr2 = parseInt(arr[arr[i + 2]])
        const outputIndex = arr[i + 3]
        if (operation == 99) break
        else if (operation == 1) arr[outputIndex] = arr1 + arr2
        else if (operation == 2) arr[outputIndex] = arr1 * arr2
        else throw new Error('invalid arr')
    }
}

rl.on('close', () => {
    input = input.split(',')
    for (let n = 0; n < 100; n++) {
        for (let v = 0; v < 100; v++) {
            let copy = input.slice()
            copy[1] = n
            copy[2] = v
            run(copy)
            if (copy[0] == solution) return console.log(100 * n + v)
            console.log('.')
        }
    }
    console.log('no solution :(')
})
