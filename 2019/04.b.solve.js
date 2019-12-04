const min = 145852, max = 616942

let pass = min
const digits = String(pass).length
let count = 0
while (true) {
  const passArr = String(pass).split('').map(s => parseInt(s))

  let lastDigit = passArr[0]
  let repeats = 0
  let hasDoubleRepeat = false
  for (let i = 1; i <= digits; i++) {
    const currentDigit = passArr[i]
    if (currentDigit <= lastDigit) {
      passArr[i] = lastDigit
      repeats++
    } else {
      lastDigit = currentDigit
      if (repeats === 1) hasDoubleRepeat = true
      repeats = 0
    }
  }
  pass = parseInt(passArr.join(''))

  if (pass > max) break

  if (hasDoubleRepeat) {
    count++
    console.log(pass)
  }
  pass++
}

console.log(count)