const min = 145852, max = 616942

let pass = min
const digits = String(pass).length
let count = 0
while (true) {
  const passArr = String(pass).split('').map(s => parseInt(s))

  let lastDigit = passArr[0]
  let hasRepeat = false
  for (let i = 1; i < digits; i++) {
    const currentDigit = passArr[i]
    if (currentDigit <= lastDigit) {
      passArr[i] = lastDigit
      hasRepeat = true
    } else {
      lastDigit = currentDigit
    }
  }
  pass = parseInt(passArr.join(''))

  if (pass > max) break

  if (hasRepeat) {
    count++
    console.log(pass)
  }
  pass++
}

console.log(count)