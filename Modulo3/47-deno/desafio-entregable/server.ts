import express, {Request, Response} from "npm:express"

const PORT = 8080


const app = express()

const form = `
<form action="/" method="post">
  <input type="text" name="color" placeholder="Color"><br><br>
  <input type="submit" value="Submit">
</form> 
`

const list: string[] =[]

const html = () => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>Hello</h1>
    ${form}
    <hr>
    <ul>
    ${list.map(color => `<li style="color:${color}">${color}</li>`).join("")}
    </ul>
  </body>
  </html>`
} 

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (_req: Request,res:Response) => {
  return res.send(html())
})

app.post("/", (req: Request,res: Response)=> {
  list.push(req.body.color)
  res.redirect("/")

})

app.listen(PORT, ()=>{
  console.log(`Server listening in port ${PORT}`);
})