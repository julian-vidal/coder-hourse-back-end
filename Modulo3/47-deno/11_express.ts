import express from "npm:express"

const app = express()

app.get("/", (req, res) => {
  res.send("Hey, it's express and Deno!")
})


app.listen(8080, () => {
  console.log("Server running in port 8080");
  
} )

// deno run --allow-net --allow-read --allow-env 11_express.ts 