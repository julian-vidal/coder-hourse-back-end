// Promise.resolve(10)
Promise.reject(30)
    .then(x => x+1)
    .then(x2 => x2*2)
    .then(x3 => {
        if (x3===22) throw 'Error'
        else return 80
    })
    .then(x4 => 30)
    .then( x5=> x5/2)
    .then(console.log) // same as: .then(x => console.log(x))
    .catch(console)