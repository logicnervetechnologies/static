// server to serve static files
import { Application, send } from "https://deno.land/x/oak/mod.ts";

const port = 80;

const app = new Application();

// Serve static files
// /*
app.use(async (ctx, next) => {
 await send(ctx, ctx.request.url.pathname,{
  root: `${Deno.cwd()}/static`,
  index: "index.html"
   });
   next();
});
// */
console.log(`Server running on port ${port}`);

//with ssl
//await app.listen({ port, secure: true, certFile: "./ssl/server.csr", keyFile:"./ssl/server.key" });

//no ssl
await app.listen({ port });