import {Application, Router, Context, helpers } from "https://deno.land/x/oak/mod.ts";

const router = new Router()

router.get("/:phrase", (ctx: Context)=> {
  const {phrase } = helpers.getQuery(ctx, {mergeParams: true})
  console.log(phrase);
  const reverse = phrase.split(" ").reverse().join(" ")
  ctx.response.body = {
    reverse
  }
  
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())
app.listen({port: 8080})

// deno run --allow-net 10_desafioOak.ts
// http://localhost:8080/hola%20mundo -> mundo hola