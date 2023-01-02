import { parse } from "https://deno.land/std@0.170.0/datetime/mod.ts";

const date = parse("2020-11-10", "yyyy-MM-dd")
console.log(date);


const date1 = new Date("2020/11/10")
console.log(date1);
