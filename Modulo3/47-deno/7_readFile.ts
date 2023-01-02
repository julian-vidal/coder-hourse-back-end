const file = await Deno.open("./hello.txt", {read: true})

const str = await Deno.copy(file, Deno.stdout)
// str
// console.log(str);

// console.log(typeof str);

// const encoder = new TextEncoder()
// const data = encoder.encode(`${file} Nuevo texto`)

// await Deno.writeFile("hello.txt", data)


file.close()

// --allow-write