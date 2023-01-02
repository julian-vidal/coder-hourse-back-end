const encoder = new TextEncoder()
const data: Uint8Array = encoder.encode("Hello world!")
await Deno.writeFile("hello.txt", data)

// To grant permissions automatically: deno run --allow-write 3_readfile.ts 