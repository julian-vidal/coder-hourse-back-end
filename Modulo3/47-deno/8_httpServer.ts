import { serve } from "https://deno.land/std@0.170.0/http/mod.ts";

const PORT = 8080

function handler(request: Request):Response {
  // console.log(Object.keys(request));
  // console.log(request);

  
  
  
  const body = "Hello!"
  return new Response(body, {status: 200})
}

await serve(handler, {port: PORT})


// deno run --allow-net 8_httpServer.ts