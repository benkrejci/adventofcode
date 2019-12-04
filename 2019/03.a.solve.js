const rl = require('readline').createInterface({ input: process.stdin })

let input = [];
rl.on('line', l => input.push(l.split(',')))
rl.on('close', () => {
    const firstGrid = {}
    let loc = [0,0]
    input[0].forEach(ins => {
        const dir = ins[0]
        const dist = parseInt(ins.slice(1))
        let x = loc[0]
        let y = loc[1]
        if (dir === 'U') {
            let col = firstGrid[x] = firstGrid[x] || {}
            while (true) {
                col[y++] = 1
                if (y === loc[1] + dist) {
                    loc[1] = y
                    break
                }
            }
        } else if (dir === 'D') {
            let col = firstGrid[x] = firstGrid[x] || {}
            while (true) {
                col[y--] = 1
                if (y === loc[1] - dist) {
                    loc[1] = y
                    break
                }
            }
        } else if (dir === 'R') {
            while (true) {
                let col = firstGrid[x] = firstGrid[x++] || {}
                col[y] = 1
                if (x === loc[0] + dist) {
                    loc[0] = x
                    break
                }
            }
        } else if (dir === 'L') {
            while (true) {
                let col = firstGrid[x] = firstGrid[x--] || {}
                col[y] = 1
                if (x === loc[0] - dist) {
                    loc[0] = x
                    break
                }
            }
        } else throw 'Invalid direction'
    })
    console.log(firstGrid)

    function getCell(x, y) {
        return firstGrid[x] && firstGrid[x][y]
    }

    function mDist(x, y) {
        return Math.abs(x) + Math.abs(y)
    }

    let intersection
    let shortestMDist
    function intersect(x, y) {
        const md = mDist(x, y)
        if (!intersection || (md < mDist(intersection[0], intersection[1]))) {
            intersection = [x, y]
            shortestMDist = md
            if (shortestMDist === 1) return true
        }
    }
    let x = 0, y = 0
    input[1].forEach(ins => {
        const dir = ins[0]
        const dist = parseInt(ins.slice(1))
        const startX = x, startY = y
        while (true) {
            console.log(x, y)
            if (( x || y ) && getCell(x, y) && intersect(x, y)) return
            if (dir === 'U') {
                if (++y === startY + dist) break
            } else if (dir === 'D') {
                if (--y === startY - dist) break
            } else if (dir === 'R') {
                if (++x === startX + dist) break
            } else if (dir === 'L') {
                if (--x === startX - dist) break
            } else throw 'Invalid direction'
        }
    })

    console.log(intersection)
    console.log(shortestMDist)
})
