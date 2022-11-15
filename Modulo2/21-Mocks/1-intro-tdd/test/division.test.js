const {division} = require("../division");

test('Division de 2 números', () => { 
    const a = 6
    const b = 12
    
    if (a >= b ) {
        expect(division(a,b)).toBeGreaterThan(1)
    } else {
        expect(division(a,b)).toBeLessThan(1)
    }
 })


 test("Division por cero", () => {
    const a = 10;
    const b = 0;

    if (b===0) {
        expect(division(a,b)).toBeNull()
    }
 })