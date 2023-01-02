import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp()

app.handle("/", async(req)=>{
  await req.respond({
    status:200,
    body: "Hey, we're using servest and deno"
  }
  )
})

app.listen({port:8080})