let total = 0
const rl = require('readline').createInterface({ input: process.stdin })
rl.on('line', n => {
    total += Math.floor(parseInt(n) / 3) - 2
})
rl.on('close', () => {
    console.log(String(total))
})
