const fs = require('fs')

const INPUT_FILE = __dirname + '/06.input'
const input = fs.readFileSync(INPUT_FILE, 'utf8').split('\n');

const centersByBody = {}

input.forEach(l => {
  const [p1, p2] = l.split(')')
  centersByBody[p2] = p1
})

const youAncestors = [], sanAncestors = []
let youRef = 'YOU', sanRef = 'SAN'

function getTransfers() {
  while (true) {
    if (youRef) {
      const youParent = centersByBody[youRef]
      if (youParent) {
        const sanIndex = sanAncestors.indexOf(youParent)
        if (sanIndex > -1) {
          return sanIndex + youAncestors.length
        }
        youAncestors.push(youParent)
      }
      youRef = youParent
    }
    if (sanRef) {
      const sanParent = centersByBody[sanRef]
      if (sanParent) {
        const youIndex = youAncestors.indexOf(sanParent)
        if (youIndex > -1) {
          return youIndex + sanAncestors.length
        }
        sanAncestors.push(sanParent)
      }
      sanRef = sanParent
    }
  }
}

console.log(`Transfers: ${getTransfers()}`)