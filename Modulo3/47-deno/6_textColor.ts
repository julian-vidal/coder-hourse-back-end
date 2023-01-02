import * as colors from "https://deno.land/std@0.170.0/fmt/colors.ts";

const red = colors.red("This is red")
console.log(red);


const bgGreen = colors.bgBrightGreen(`This is green and ${colors.bold("this is bold")}`)
console.log(bgGreen);