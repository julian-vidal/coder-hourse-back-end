const division = (a,b) => {
    if(b===0) {
        return null
    } else {
        return (a/b)
    }
    
}


// a > b -> a/b > 1
// a>b -> a/b < 1
// b = 0 -> a/b no está definida

module.exports = { division}