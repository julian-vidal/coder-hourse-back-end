function randomInt(min,max) {
    return Math.floor(Math.random() * (max-min+1) + min )
}


const myObject = {}

for (let i=0; i<10000;i++) {
    let randNum = randomInt(1,20)
    // console.log(randNum)
    if (!myObject.hasOwnProperty(`${randNum}`)) {
        myObject[randNum] = 1;
    } else {
        myObject[randNum]++
    }
}

console.log(myObject)