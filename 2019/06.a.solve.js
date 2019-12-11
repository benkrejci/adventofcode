const fs = require('fs')

const INPUT_FILE = __dirname + '/06.input'
const input = fs.readFileSync(INPUT_FILE, 'utf8').split('\n');

const bodiesByCenter = {}

input.forEach(l => {
  const [p1, p2] = l.split(')')
  const bodies = bodiesByCenter[p1] = bodiesByCenter[p1] || []
  bodies.push(p2)
})

let numOrbits = 0

function processChildren(bodies, indirectOffset) {
  indirectOffset++
  bodies.forEach(o => {
    const childOrbits = bodiesByCenter[o];
    numOrbits += indirectOffset
    if (childOrbits) {
      processChildren(childOrbits, indirectOffset)
    }
  })
}

processChildren(bodiesByCenter['COM'], 0);

console.log(`Orbits: ${numOrbits}`)