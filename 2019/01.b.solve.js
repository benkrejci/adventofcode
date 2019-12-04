let total = 0
const rl = require('readline').createInterface({ input: process.stdin })

const getFuel = n => Math.max(0, Math.floor(parseInt(n) / 3) - 2)

rl.on('line', n => {
    let moduleFuel = getFuel(n)
    let addFuel = moduleFuel
    while (true) {
        addFuel = getFuel(addFuel)
        if (!addFuel) break
        moduleFuel += addFuel
    }

    total += moduleFuel
})

rl.on('close', () => {
    console.log(String(total))
})
