const koaRouter = require("koa-router");
const router = new koaRouter();

router
  .get("/getData", (ctx) => {
    ctx.body = { name: "koa" };
  })
  .get("/setName/:name", (ctx) => {
    const name = ctx.params.name;
    ctx.body = {
      name,
    };
  });

module.exports = router;
